import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">System Administration</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Admin account</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11</div>
              <p className="text-xs text-muted-foreground">Evening & Daytime</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">New registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Manage Users
              </Button>
              <Button className="w-full" variant="outline">
                Manage Programs
              </Button>
              <Button className="w-full" variant="outline">
                Assign Teachers
              </Button>
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>LMS platform status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Database</p>
                  <p className="text-xs text-muted-foreground">✓ Connected and operational</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Authentication</p>
                  <p className="text-xs text-muted-foreground">✓ Email verification enabled</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Programs</p>
                  <p className="text-xs text-muted-foreground">✓ 11 programs configured</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}