import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calendar } from "lucide-react";

export default function MySubjects() {
  const { user } = useAuth();

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["my-assignments", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from("teacher_assignments")
        .select("*")
        .eq("teacher_id", user.id);

      if (assignmentsError) throw assignmentsError;

      // Get subjects
      const subjectIds = assignmentsData?.map((a) => a.subject_id) || [];
      if (subjectIds.length === 0) return [];

      const { data: subjects, error: subjectsError } = await supabase
        .from("subjects")
        .select("*, programs(name, type)")
        .in("id", subjectIds);

      if (subjectsError) throw subjectsError;

      return subjects;
    },
    enabled: !!user,
  });

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Subjects</h2>
          <p className="text-muted-foreground">Subjects assigned to you</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : assignments && assignments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((subject: any) => (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-primary uppercase">
                      {subject.programs?.type}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <CardDescription>{subject.programs?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subject.week_number && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Week {subject.week_number}
                      </div>
                    )}
                    {subject.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {subject.description}
                      </p>
                    )}
                    <Link to={`/dashboard/teacher/weeks?subject=${subject.id}`}>
                      <Button className="w-full mt-4" size="sm">
                        Manage Content
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Subjects Assigned</CardTitle>
              <CardDescription>
                You haven't been assigned to any subjects yet. Contact an administrator to get started.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}