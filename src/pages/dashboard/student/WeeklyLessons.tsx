import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { BookOpen, FileText, Github, CheckCircle, Clock } from "lucide-react";

export default function WeeklyLessons() {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState({ github_url: "", notes: "" });
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: enrollment } = useQuery({
    queryKey: ["student-enrollment", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("student_id", user.id)
        .eq("status", "active")
        .single();
      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  const { data: weekData, isLoading } = useQuery({
    queryKey: ["current-week-content", enrollment?.program_id, enrollment?.current_week],
    queryFn: async () => {
      if (!enrollment) return null;

      // Get subjects for this program
      const { data: subjects, error: subjectsError } = await supabase
        .from("subjects")
        .select("*")
        .eq("program_id", enrollment.program_id);

      if (subjectsError) throw subjectsError;
      if (!subjects || subjects.length === 0) return null;

      // Get current week content for all subjects
      const { data: weeks, error: weeksError } = await supabase
        .from("weeks")
        .select("*")
        .in("subject_id", subjects.map((s) => s.id))
        .eq("week_number", enrollment.current_week)
        .eq("is_published", true);

      if (weeksError) throw weeksError;

      // Get tasks for these weeks
      const weekIds = weeks?.map((w) => w.id) || [];
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .in("week_id", weekIds)
        .order("day_number");

      if (tasksError) throw tasksError;

      // Get capstones
      const { data: capstones, error: capstonesError } = await supabase
        .from("capstones")
        .select("*")
        .in("week_id", weekIds);

      if (capstonesError) throw capstonesError;

      // Get my submissions
      const taskIds = tasks?.map((t) => t.id) || [];
      const capstoneIds = capstones?.map((c) => c.id) || [];

      const { data: submissions, error: submissionsError } = await supabase
        .from("submissions")
        .select("*, grades(*)")
        .eq("student_id", user!.id)
        .or(`task_id.in.(${taskIds.join(",")}),capstone_id.in.(${capstoneIds.join(",")})`);

      if (submissionsError) throw submissionsError;

      return {
        weeks,
        subjects,
        tasks,
        capstones,
        submissions: submissions || [],
      };
    },
    enabled: !!enrollment && !!user,
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("submissions").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-week-content"] });
      toast.success("Submission successful!");
      setOpen(false);
      setSubmissionData({ github_url: "", notes: "" });
      setSelectedTask(null);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTask) return;

    const payload: any = {
      student_id: user.id,
      github_url: submissionData.github_url,
      notes: submissionData.notes,
    };

    if (selectedTask.type === "task") {
      payload.task_id = selectedTask.id;
    } else {
      payload.capstone_id = selectedTask.id;
    }

    submitMutation.mutate(payload);
  };

  const getSubmissionStatus = (itemId: string, type: "task" | "capstone") => {
    const submission = weekData?.submissions?.find((s) =>
      type === "task" ? s.task_id === itemId : s.capstone_id === itemId
    );
    return submission;
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Weekly Lessons</h2>
          <p className="text-muted-foreground">
            Week {enrollment?.current_week || 1} of 20
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : !enrollment ? (
          <Card>
            <CardHeader>
              <CardTitle>No Active Enrollment</CardTitle>
              <CardDescription>Please contact an administrator to get enrolled.</CardDescription>
            </CardHeader>
          </Card>
        ) : !weekData || weekData.weeks.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Content Available</CardTitle>
              <CardDescription>Content for this week hasn't been published yet.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            {weekData.weeks.map((week: any) => {
              const subject = weekData.subjects.find((s) => s.id === week.subject_id);
              const weekTasks = weekData.tasks?.filter((t) => t.week_id === week.id) || [];
              const weekCapstone = weekData.capstones?.find((c) => c.week_id === week.id);

              return (
                <Card key={week.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">{subject?.name}</span>
                    </div>
                    <CardTitle className="text-2xl">{week.title}</CardTitle>
                    {week.objectives && (
                      <CardDescription className="text-base mt-2">{week.objectives}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Daily Tasks */}
                    {weekTasks.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Daily Tasks
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {weekTasks.map((task: any) => {
                            const submission = getSubmissionStatus(task.id, "task");
                            return (
                              <AccordionItem key={task.id} value={task.id}>
                                <AccordionTrigger className="hover:no-underline">
                                  <div className="flex items-center justify-between w-full pr-4">
                                    <span>Day {task.day_number}: {task.title}</span>
                                    {submission ? (
                                      <Badge variant={submission.grades?.[0]?.status === "passed" ? "default" : "secondary"}>
                                        {submission.grades?.[0]?.status === "passed" ? (
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                        ) : (
                                          <Clock className="h-3 w-3 mr-1" />
                                        )}
                                        {submission.grades?.[0]?.status || "Submitted"}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline">Not Submitted</Badge>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <p className="text-muted-foreground">{task.description}</p>
                                  {task.instructions && (
                                    <div className="bg-muted p-4 rounded-lg">
                                      <p className="text-sm whitespace-pre-wrap">{task.instructions}</p>
                                    </div>
                                  )}
                                  {!submission && (
                                    <Button
                                      onClick={() => {
                                        setSelectedTask({ ...task, type: "task" });
                                        setOpen(true);
                                      }}
                                      className="w-full"
                                    >
                                      <Github className="h-4 w-4 mr-2" />
                                      Submit Task
                                    </Button>
                                  )}
                                  {submission && (
                                    <div className="space-y-2">
                                      <p className="text-sm"><strong>Your Submission:</strong></p>
                                      <a
                                        href={submission.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                      >
                                        <Github className="h-4 w-4" />
                                        {submission.github_url}
                                      </a>
                                      {submission.grades?.[0]?.feedback && (
                                        <div className="mt-2 p-3 bg-muted rounded-lg">
                                          <p className="text-sm font-medium mb-1">Teacher Feedback:</p>
                                          <p className="text-sm">{submission.grades[0].feedback}</p>
                                          {submission.grades[0].score && (
                                            <p className="text-sm mt-2">Score: {submission.grades[0].score}/100</p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </div>
                    )}

                    {/* Capstone Project */}
                    {weekCapstone && (
                      <div className="space-y-3 pt-4 border-t">
                        <h3 className="font-semibold text-lg text-primary">Capstone Project</h3>
                        <Card>
                          <CardHeader>
                            <CardTitle>{weekCapstone.title}</CardTitle>
                            <CardDescription>{weekCapstone.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {weekCapstone.instructions && (
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm whitespace-pre-wrap">{weekCapstone.instructions}</p>
                              </div>
                            )}
                            {(() => {
                              const submission = getSubmissionStatus(weekCapstone.id, "capstone");
                              return submission ? (
                                <div className="space-y-2">
                                  <Badge variant={submission.grades?.[0]?.status === "passed" ? "default" : "secondary"}>
                                    {submission.grades?.[0]?.status === "passed" ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <Clock className="h-3 w-3 mr-1" />
                                    )}
                                    {submission.grades?.[0]?.status || "Submitted"}
                                  </Badge>
                                  <a
                                    href={submission.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                  >
                                    <Github className="h-4 w-4" />
                                    {submission.github_url}
                                  </a>
                                  {submission.grades?.[0]?.feedback && (
                                    <div className="mt-2 p-3 bg-muted rounded-lg">
                                      <p className="text-sm font-medium mb-1">Teacher Feedback:</p>
                                      <p className="text-sm">{submission.grades[0].feedback}</p>
                                      {submission.grades[0].score && (
                                        <p className="text-sm mt-2">Score: {submission.grades[0].score}/100</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setSelectedTask({ ...weekCapstone, type: "capstone" });
                                    setOpen(true);
                                  }}
                                  className="w-full"
                                >
                                  <Github className="h-4 w-4 mr-2" />
                                  Submit Capstone
                                </Button>
                              );
                            })()}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit {selectedTask?.type === "task" ? "Task" : "Capstone"}</DialogTitle>
              <DialogDescription>
                Submit your GitHub repository URL for: {selectedTask?.title}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub Repository URL *</Label>
                <Input
                  id="github_url"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={submissionData.github_url}
                  onChange={(e) => setSubmissionData({ ...submissionData, github_url: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes or comments..."
                  value={submissionData.notes}
                  onChange={(e) => setSubmissionData({ ...submissionData, notes: e.target.value })}
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
}