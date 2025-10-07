import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function Enrollments() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    program_id: "",
    subject_id: "",
  });
  const queryClient = useQueryClient();

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");
      
      if (profilesError) throw profilesError;

      // Get student roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "student");
      
      if (rolesError) throw rolesError;

      // Filter profiles that have student role
      const studentIds = roles?.map((r) => r.user_id) || [];
      return profiles?.filter((p) => studentIds.includes(p.id));
    },
  });

  const { data: programs } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: subjects } = useQuery({
    queryKey: ["subjects", formData.program_id],
    queryFn: async () => {
      if (!formData.program_id) return [];
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("program_id", formData.program_id)
        .order("name");
      if (error) throw error;
      return data;
    },
    enabled: !!formData.program_id,
  });

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("*")
        .order("enrolled_at", { ascending: false });
      
      if (enrollmentsError) throw enrollmentsError;

      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");
      
      if (profilesError) throw profilesError;

      // Get programs
      const { data: programs, error: programsError } = await supabase
        .from("programs")
        .select("*");
      
      if (programsError) throw programsError;

      // Get subjects
      const { data: subjects, error: subjectsError } = await supabase
        .from("subjects")
        .select("*");
      
      if (subjectsError) throw subjectsError;

      // Combine data
      return enrollmentsData?.map((enrollment) => ({
        ...enrollment,
        profiles: profiles?.find((p) => p.id === enrollment.student_id),
        programs: programs?.find((p) => p.id === enrollment.program_id),
        subjects: subjects?.find((s) => s.id === enrollment.subject_id),
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("enrollments").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.success("Student enrolled successfully");
      setOpen(false);
      setFormData({ student_id: "", program_id: "", subject_id: "" });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const updateData: any = { status };
      if (status === "active" && !enrollments?.find((e) => e.id === id)?.activated_at) {
        updateData.activated_at = new Date().toISOString();
      }
      if (status === "completed") {
        updateData.completed_at = new Date().toISOString();
      }
      const { error } = await supabase.from("enrollments").update(updateData).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast.success("Enrollment status updated");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: "outline",
      active: "default",
      completed: "secondary",
      dropped: "destructive",
    };
    return variants[status] || "outline";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Enrollments</h2>
            <p className="text-muted-foreground">Manage student enrollments</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Enroll Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll Student</DialogTitle>
                <DialogDescription>Assign a student to a program and subject cohort</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select
                    value={formData.student_id}
                    onValueChange={(value) => setFormData({ ...formData, student_id: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students?.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.email} - {student.full_name || "No name"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Select
                    value={formData.program_id}
                    onValueChange={(value) => setFormData({ ...formData, program_id: value, subject_id: "" })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs?.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name} ({program.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject (Cohort)</Label>
                  <Select
                    value={formData.subject_id}
                    onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
                    required
                    disabled={!formData.program_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.program_id ? "Select subject cohort" : "Select program first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects?.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Enroll Student
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Enrollments</CardTitle>
            <CardDescription>View and manage student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Enrollment ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Subject (Cohort)</TableHead>
                    <TableHead>Week</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments?.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-mono text-sm">{enrollment.enrollment_id}</TableCell>
                      <TableCell>
                        {enrollment.profiles?.email}
                        <div className="text-xs text-muted-foreground">
                          {enrollment.profiles?.full_name}
                        </div>
                      </TableCell>
                      <TableCell>{enrollment.programs?.name}</TableCell>
                      <TableCell>{enrollment.subjects?.name || "—"}</TableCell>
                      <TableCell>{enrollment.current_week}/20</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(enrollment.status) as any}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(enrollment.enrolled_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={enrollment.status}
                          onValueChange={(status) =>
                            updateStatusMutation.mutate({ id: enrollment.id, status })
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="dropped">Dropped</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}