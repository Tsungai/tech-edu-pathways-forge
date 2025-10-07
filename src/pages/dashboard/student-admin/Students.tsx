import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentAdminLayout } from "@/components/student-admin/StudentAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function Students() {
  const queryClient = useQueryClient();
  const [editingStudent, setEditingStudent] = useState<any>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "student");

      if (!roles) return [];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("id", roles.map(r => r.user_id));

      return profiles || [];
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          address: data.address,
        })
        .eq("id", data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated successfully");
      setEditingStudent(null);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return (
    <StudentAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Students</h2>
          <p className="text-muted-foreground">View and manage student accounts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students?.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.full_name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone || "N/A"}</TableCell>
                      <TableCell>{student.address || "N/A"}</TableCell>
                      <TableCell>
                        <Dialog open={editingStudent?.id === student.id} onOpenChange={(open) => !open && setEditingStudent(null)}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingStudent(student)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                updateStudentMutation.mutate({
                                  id: editingStudent.id,
                                  fullName: formData.get("fullName"),
                                  phone: formData.get("phone"),
                                  address: formData.get("address"),
                                });
                              }}
                              className="space-y-4"
                            >
                              <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" name="fullName" defaultValue={editingStudent?.full_name} required />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" defaultValue={editingStudent?.phone} />
                              </div>
                              <div>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" defaultValue={editingStudent?.address} />
                              </div>
                              <Button type="submit">Save Changes</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentAdminLayout>
  );
}
