import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { UserPlus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Users() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (profilesError) throw profilesError;

      // Fetch roles separately
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");
      
      if (rolesError) throw rolesError;

      // Combine profiles with their roles
      return profiles?.map((profile) => ({
        ...profile,
        user_roles: roles?.filter((role) => role.user_id === profile.id) || [],
      }));
    },
  });

  const assignRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      // First, delete existing role if any
      await supabase.from("user_roles").delete().eq("user_id", userId);
      
      // Then insert new role
      const { error } = await supabase.from("user_roles").insert([{ user_id: userId, role: role as any }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role assigned successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId }
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
      setUserToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  const handleRoleChange = (userId: string, role: string) => {
    assignRoleMutation.mutate({ userId, role });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "teacher":
        return "default";
      case "student":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Users</h2>
            <p className="text-muted-foreground">Manage user accounts and roles</p>
          </div>
          <Button onClick={() => navigate("/dashboard/admin/create-user")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {users?.filter((u) => u.user_roles?.length > 0 && u.user_roles[0]?.role === "admin").length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {users?.filter((u) => u.user_roles?.length > 0 && u.user_roles[0]?.role === "teacher").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View and manage user roles</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Change Role</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => {
                    const userRole = user.user_roles && user.user_roles.length > 0 ? user.user_roles[0].role : "none";
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.full_name || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(userRole) as any}>
                            {userRole}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={userRole}
                            onValueChange={(role) => handleRoleChange(user.id, role)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setUserToDelete(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {user.email}? This action cannot be undone and will permanently remove all user data including enrollments and submissions.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setUserToDelete(null)}>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteUserMutation.mutate(user.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}