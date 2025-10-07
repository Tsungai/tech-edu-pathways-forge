import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Clock } from "lucide-react";

export default function MyCourse() {
  const { user } = useAuth();

  const { data: enrollment, isLoading } = useQuery({
    queryKey: ["my-enrollment", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("*")
        .eq("student_id", user.id)
        .eq("status", "active")
        .single();

      if (enrollmentsError) {
        if (enrollmentsError.code === "PGRST116") return null; // No rows
        throw enrollmentsError;
      }

      // Get program details
      const { data: program, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("id", enrollmentsData.program_id)
        .single();

      if (programError) throw programError;

      return {
        ...enrollmentsData,
        programs: program,
      };
    },
    enabled: !!user,
  });

  const progressPercentage = enrollment ? (enrollment.current_week / 20) * 100 : 0;

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Course</h2>
          <p className="text-muted-foreground">Your enrollment details and progress</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : enrollment ? (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{enrollment.programs?.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {enrollment.programs?.description}
                    </CardDescription>
                  </div>
                  <Badge variant={enrollment.status === "active" ? "default" : "secondary"} className="text-base px-4 py-2">
                    {enrollment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Program Type</p>
                      <p className="font-medium capitalize">{enrollment.programs?.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Enrolled On</p>
                      <p className="font-medium">{new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">20 Weeks</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Course Progress</span>
                    <span className="text-muted-foreground">Week {enrollment.current_week} of 20</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(progressPercentage)}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrollment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Enrollment ID</span>
                  <span className="font-mono font-medium">{enrollment.enrollment_id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Current Week</span>
                  <span className="font-medium">Week {enrollment.current_week}</span>
                </div>
                {enrollment.activated_at && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Activated On</span>
                    <span className="font-medium">{new Date(enrollment.activated_at).toLocaleDateString()}</span>
                  </div>
                )}
                {enrollment.programs?.type === "evening" && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">Mon-Fri, 1 hour daily</span>
                  </div>
                )}
                {enrollment.programs?.type === "daytime" && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">Mon-Fri, 1hr lecture + 8hr support</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Active Enrollment</CardTitle>
              <CardDescription>
                You are not currently enrolled in any program. Please contact an administrator to get enrolled.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}