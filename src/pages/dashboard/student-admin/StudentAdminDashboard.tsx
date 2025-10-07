import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentAdminLayout } from "@/components/student-admin/StudentAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, GraduationCap } from "lucide-react";

export default function StudentAdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["student-admin-stats"],
    queryFn: async () => {
      const [studentsResult, prospectiveResult, enrollmentsResult] = await Promise.all([
        supabase.from("user_roles").select("*").eq("role", "student"),
        supabase.from("prospective_users").select("*").eq("status", "pending"),
        supabase.from("enrollments").select("*"),
      ]);

      return {
        totalStudents: studentsResult.data?.length || 0,
        pendingApplications: prospectiveResult.data?.length || 0,
        activeEnrollments: enrollmentsResult.data?.filter(e => e.status === "active").length || 0,
      };
    },
  });

  return (
    <StudentAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Student Administration Dashboard</h2>
          <p className="text-muted-foreground">Manage student accounts and enrollments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingApplications || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeEnrollments || 0}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentAdminLayout>
  );
}
