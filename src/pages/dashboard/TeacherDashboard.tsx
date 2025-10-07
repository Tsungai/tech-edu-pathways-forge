import { useAuth } from "@/hooks/useAuth";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, FileCheck, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome, Teacher!</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Submissions to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">No active courses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common teaching tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/dashboard/teacher/weeks">
                <Button className="w-full" variant="outline">
                  Create Weekly Content
                </Button>
              </Link>
              <Link to="/dashboard/teacher/submissions">
                <Button className="w-full" variant="outline">
                  Review Submissions
                </Button>
              </Link>
              <Link to="/dashboard/teacher/subjects">
                <Button className="w-full" variant="outline">
                  View My Subjects
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Your teaching account setup</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once assigned to subjects, you can create weekly content with tasks, capstone projects, and learning resources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
}