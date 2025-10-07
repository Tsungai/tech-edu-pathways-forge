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
import { Plus, Trash2 } from "lucide-react";

export default function TeacherAssignments() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    teacher_id: "",
    subject_id: "",
  });
  const queryClient = useQueryClient();

  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "teacher");

      if (rolesError) throw rolesError;

      const teacherIds = roles?.map((r) => r.user_id) || [];
      return profiles?.filter((p) => teacherIds.includes(p.id));
    },
  });

  const { data: subjects, isError: subjectsError, error: subjectsErrorDetails } = useQuery({
    queryKey: ["subjects-with-programs"],
    queryFn: async () => {
      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("*")
        .order("name");

      if (subjectsError) {
        console.error("Error fetching subjects:", subjectsError);
        throw subjectsError;
      }

      const { data: programs, error: programsError } = await supabase
        .from("programs")
        .select("*");

      if (programsError) {
        console.error("Error fetching programs:", programsError);
        throw programsError;
      }

      const result = subjectsData?.map((subject) => ({
        ...subject,
        programs: programs?.find((p) => p.id === subject.program_id),
      }));
      
      console.log("Subjects loaded:", result);
      return result;
    },
  });

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["teacher-assignments"],
    queryFn: async () => {
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from("teacher_assignments")
        .select("*")
        .order("assigned_at", { ascending: false });

      if (assignmentsError) throw assignmentsError;

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("*");

      if (subjectsError) throw subjectsError;

      const { data: programs, error: programsError } = await supabase
        .from("programs")
        .select("*");

      if (programsError) throw programsError;

      return assignmentsData?.map((assignment) => {
        const subject = subjectsData?.find((s) => s.id === assignment.subject_id);
        return {
          ...assignment,
          profiles: profiles?.find((p) => p.id === assignment.teacher_id),
          subjects: {
            ...subject,
            programs: programs?.find((p) => p.id === subject?.program_id),
          },
        };
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("teacher_assignments").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-assignments"] });
      toast.success("Teacher assigned successfully");
      setOpen(false);
      setFormData({ teacher_id: "", subject_id: "" });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("teacher_assignments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-assignments"] });
      toast.success("Assignment removed");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Teacher Assignments</h2>
            <p className="text-muted-foreground">Assign teachers to subjects</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Teacher to Subject</DialogTitle>
                <DialogDescription>Select a teacher and subject to create an assignment</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    value={formData.teacher_id}
                    onValueChange={(value) => setFormData({ ...formData, teacher_id: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers?.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.email} - {teacher.full_name || "No name"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={formData.subject_id}
                    onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {subjectsError ? (
                        <div className="px-2 py-1 text-sm text-destructive">
                          Error loading subjects
                        </div>
                      ) : !subjects || subjects.length === 0 ? (
                        <div className="px-2 py-1 text-sm text-muted-foreground">
                          No subjects available. Create subjects first.
                        </div>
                      ) : (
                        subjects.map((subject: any) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name} - {subject.programs?.name || "No program"}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Assign Teacher
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>View and manage teacher assignments</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments?.map((assignment: any) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        {assignment.profiles?.email}
                        <div className="text-xs text-muted-foreground">
                          {assignment.profiles?.full_name}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{assignment.subjects?.name}</TableCell>
                      <TableCell>{assignment.subjects?.programs?.name}</TableCell>
                      <TableCell>{new Date(assignment.assigned_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(assignment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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