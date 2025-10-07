import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, Github, TrendingUp } from "lucide-react";

export default function MyGrades() {
  const { user } = useAuth();

  const { data: gradesData, isLoading } = useQuery({
    queryKey: ["my-grades", user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get all my submissions with grades
      const { data: submissions, error } = await supabase
        .from("submissions")
        .select("*, grades(*), tasks(*), capstones(*)")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      const gradedSubmissions = submissions?.filter((s) => s.grades && Array.isArray(s.grades) ? s.grades.length > 0 : !!s.grades) || [];
      const totalScore = gradedSubmissions.reduce((sum, s) => {
        const grade = Array.isArray(s.grades) ? s.grades[0] : s.grades;
        return sum + (grade?.score || 0);
      }, 0);
      const avgScore = gradedSubmissions.length > 0 ? totalScore / gradedSubmissions.length : 0;
      const passedCount = gradedSubmissions.filter((s) => {
        const grade = Array.isArray(s.grades) ? s.grades[0] : s.grades;
        return grade?.status === "passed";
      }).length;

      return {
        submissions: submissions || [],
        gradedSubmissions,
        avgScore: Math.round(avgScore * 10) / 10,
        passedCount,
        totalSubmissions: submissions?.length || 0,
      };
    },
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
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

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Grades</h2>
          <p className="text-muted-foreground">Track your performance and feedback</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : gradesData ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gradesData.avgScore}/100</div>
                  <Progress value={gradesData.avgScore} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on {gradesData.gradedSubmissions.length} graded submissions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gradesData.totalSubmissions}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {gradesData.gradedSubmissions.length} graded
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {gradesData.gradedSubmissions.length > 0
                      ? Math.round((gradesData.passedCount / gradesData.gradedSubmissions.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {gradesData.passedCount} passed out of {gradesData.gradedSubmissions.length}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>Your submission history and grades</CardDescription>
              </CardHeader>
              <CardContent>
                {gradesData.submissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesData.submissions.map((submission: any) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {submission.task_id ? "Task" : "Capstone"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {submission.tasks?.[0]?.title || submission.capstones?.[0]?.title || "N/A"}
                          </TableCell>
                          <TableCell>
                            {new Date(submission.submitted_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {submission.grades ? (
                              (() => {
                                const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
                                return grade?.score ? `${grade.score}/100` : "Not graded";
                              })()
                            ) : "Not graded"}
                          </TableCell>
                          <TableCell>
                            {submission.grades ? (
                              (() => {
                                const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
                                return getStatusBadge(grade?.status || "pending");
                              })()
                            ) : <Badge variant="outline">Pending</Badge>}
                          </TableCell>
                          <TableCell>
                            {submission.grades ? (
                              (() => {
                                const grade = Array.isArray(submission.grades) ? submission.grades[0] : submission.grades;
                                return grade?.feedback ? (
                                  <div className="max-w-xs">
                                    <p className="text-sm line-clamp-2">{grade.feedback}</p>
                                  </div>
                                ) : (
                                  <span className="text-sm text-muted-foreground">No feedback yet</span>
                                );
                              })()
                            ) : (
                              <span className="text-sm text-muted-foreground">No feedback yet</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No submissions yet. Complete weekly tasks to see your grades here.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Data Available</CardTitle>
              <CardDescription>Start submitting assignments to see your grades.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}