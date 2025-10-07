import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Github, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Submissions() {
  const { user } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradeData, setGradeData] = useState({
    score: "",
    status: "pending",
    feedback: "",
  });
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["all-submissions", user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get teacher's assigned subjects
      const { data: assignments } = await supabase
        .from("teacher_assignments")
        .select("subject_id")
        .eq("teacher_id", user.id);

      const subjectIds = assignments?.map((a) => a.subject_id) || [];
      if (subjectIds.length === 0) return [];

      // Get weeks for these subjects
      const { data: weeks } = await supabase
        .from("weeks")
        .select("id")
        .in("subject_id", subjectIds);

      const weekIds = weeks?.map((w) => w.id) || [];
      if (weekIds.length === 0) return [];

      // Get tasks and capstones
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .in("week_id", weekIds);

      const { data: capstones } = await supabase
        .from("capstones")
        .select("*")
        .in("week_id", weekIds);

      const taskIds = tasks?.map((t) => t.id) || [];
      const capstoneIds = capstones?.map((c) => c.id) || [];

      // Get all submissions
      const { data: submissionsData, error } = await supabase
        .from("submissions")
        .select("*, grades(*)")
        .or(`task_id.in.(${taskIds.join(",")}),capstone_id.in.(${capstoneIds.join(",")})`)
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      // Get student profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*");

      // Enrich submissions with task/capstone info
      return submissionsData?.map((sub) => {
        const task = tasks?.find((t) => t.id === sub.task_id);
        const capstone = capstones?.find((c) => c.id === sub.capstone_id);
        const profile = profiles?.find((p) => p.id === sub.student_id);

        return {
          ...sub,
          task,
          capstone,
          student: profile,
          type: task ? "task" : "capstone",
        };
      });
    },
    enabled: !!user,
  });

  const gradeMutation = useMutation({
    mutationFn: async (data: any) => {
      const gradePayload = {
        submission_id: selectedSubmission.id,
        teacher_id: user!.id,
        score: data.score ? parseFloat(data.score) : null,
        status: data.status,
        feedback: data.feedback,
      };

      // Check if grade exists
      const hasGrades = selectedSubmission.grades && (Array.isArray(selectedSubmission.grades) ? selectedSubmission.grades.length > 0 : !!selectedSubmission.grades);
      if (hasGrades) {
        const gradeId = Array.isArray(selectedSubmission.grades) ? selectedSubmission.grades[0].id : selectedSubmission.grades.id;
        const { error } = await supabase
          .from("grades")
          .update(gradePayload)
          .eq("id", gradeId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("grades").insert(gradePayload);
        if (error) throw error;
      }

      // If capstone passed, unlock next week
      if (data.status === "passed" && selectedSubmission.type === "capstone") {
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("*")
          .eq("student_id", selectedSubmission.student_id)
          .single();

        if (enrollment && enrollment.current_week < 20) {
          await supabase
            .from("enrollments")
            .update({ current_week: enrollment.current_week + 1 })
            .eq("id", enrollment.id);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-submissions"] });
      toast.success("Grade submitted successfully");
      setOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setGradeData({ score: "", status: "pending", feedback: "" });
    setSelectedSubmission(null);
  };

  const handleGrade = (submission: any) => {
    setSelectedSubmission(submission);
    const hasGrades = submission.grades && (Array.isArray(submission.grades) ? submission.grades.length > 0 : !!submission.grades);
    if (hasGrades) {
      const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
      setGradeData({
        score: grade?.score?.toString() || "",
        status: grade?.status || "pending",
        feedback: grade?.feedback || "",
      });
    }
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gradeMutation.mutate(gradeData);
  };

  const getStatusBadge = (submission: any) => {
    const hasGrades = submission.grades && (Array.isArray(submission.grades) ? submission.grades.length > 0 : !!submission.grades);
    if (!hasGrades) {
      return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Pending Review</Badge>;
    }
    const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
    const status = grade?.status;
    switch (status) {
      case "passed":
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Passed</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case "needs_revision":
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Needs Revision</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingSubmissions = submissions?.filter(
    (s) => {
      const hasGrades = s.grades && (Array.isArray(s.grades) ? s.grades.length > 0 : !!s.grades);
      if (!hasGrades) return true;
      const grade = Array.isArray(s.grades) ? s.grades[0] : s.grades;
      return grade?.status === "pending";
    }
  );
  const gradedSubmissions = submissions?.filter(
    (s) => {
      const hasGrades = s.grades && (Array.isArray(s.grades) ? s.grades.length > 0 : !!s.grades);
      if (!hasGrades) return false;
      const grade = Array.isArray(s.grades) ? s.grades[0] : s.grades;
      return grade?.status !== "pending";
    }
  );

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Submissions</h2>
          <p className="text-muted-foreground">Review and grade student work</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Review ({pendingSubmissions?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({gradedSubmissions?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Submissions</CardTitle>
                <CardDescription>Review and grade pending student work</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : pendingSubmissions && pendingSubmissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingSubmissions.map((submission: any) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{submission.student?.email}</p>
                              <p className="text-xs text-muted-foreground">
                                {submission.student?.full_name}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {submission.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {submission.task?.title || submission.capstone?.title}
                          </TableCell>
                          <TableCell>
                            {new Date(submission.submitted_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(submission)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleGrade(submission)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Grade
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending submissions
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graded">
            <Card>
              <CardHeader>
                <CardTitle>Graded Submissions</CardTitle>
                <CardDescription>Previously graded student work</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : gradedSubmissions && gradedSubmissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Graded</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradedSubmissions.map((submission: any) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{submission.student?.email}</p>
                              <p className="text-xs text-muted-foreground">
                                {submission.student?.full_name}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {submission.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {submission.task?.title || submission.capstone?.title}
                          </TableCell>
                          <TableCell>
                            {(() => {
                              const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
                              return grade?.score ? `${grade.score}/100` : "N/A";
                            })()}
                          </TableCell>
                          <TableCell>{getStatusBadge(submission)}</TableCell>
                          <TableCell>
                            {(() => {
                              const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
                              return new Date(grade?.graded_at).toLocaleDateString();
                            })()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGrade(submission)}
                            >
                              Edit Grade
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No graded submissions yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Grade Submission</DialogTitle>
              <DialogDescription>
                {selectedSubmission?.task?.title || selectedSubmission?.capstone?.title}
              </DialogDescription>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Student:</span>
                    <span className="text-sm">{selectedSubmission.student?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Type:</span>
                    <Badge variant="outline" className="capitalize">{selectedSubmission.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Submitted:</span>
                    <span className="text-sm">
                      {new Date(selectedSubmission.submitted_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <a
                      href={selectedSubmission.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      View GitHub Repository
                    </a>
                  </div>
                  {selectedSubmission.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-1">Student Notes:</p>
                      <p className="text-sm text-muted-foreground">{selectedSubmission.notes}</p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="score">Score (0-100)</Label>
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={gradeData.score}
                        onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={gradeData.status}
                        onValueChange={(value) => setGradeData({ ...gradeData, status: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="passed">Passed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="needs_revision">Needs Revision</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={gradeData.feedback}
                      onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                      rows={6}
                      placeholder="Provide constructive feedback..."
                    />
                  </div>

                  {selectedSubmission.type === "capstone" && gradeData.status === "passed" && (
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm font-medium text-primary flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Passing this capstone will unlock the next week for the student
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    Submit Grade
                  </Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  );
}