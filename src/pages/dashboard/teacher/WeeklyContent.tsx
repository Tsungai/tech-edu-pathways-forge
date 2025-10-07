import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, FileText, CheckCircle, XCircle } from "lucide-react";

export default function WeeklyContent() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedSubjectId = searchParams.get("subject");
  const [open, setOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<any>(null);
  const [formData, setFormData] = useState({
    subject_id: selectedSubjectId || "",
    week_number: "",
    title: "",
    objectives: "",
  });
  const queryClient = useQueryClient();

  const { data: mySubjects } = useQuery({
    queryKey: ["my-subjects", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data: assignments } = await supabase
        .from("teacher_assignments")
        .select("subject_id")
        .eq("teacher_id", user.id);

      const subjectIds = assignments?.map((a) => a.subject_id) || [];
      if (subjectIds.length === 0) return [];

      const { data, error } = await supabase
        .from("subjects")
        .select("*, programs(name)")
        .in("id", subjectIds);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: weeks, isLoading } = useQuery({
    queryKey: ["weeks", formData.subject_id],
    queryFn: async () => {
      if (!formData.subject_id) return [];
      const { data, error } = await supabase
        .from("weeks")
        .select("*")
        .eq("subject_id", formData.subject_id)
        .order("week_number");

      if (error) throw error;
      return data;
    },
    enabled: !!formData.subject_id,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("weeks").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weeks"] });
      toast.success("Week created successfully");
      setOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const publishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from("weeks")
        .update({ is_published })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weeks"] });
      toast.success("Week status updated");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      subject_id: selectedSubjectId || "",
      week_number: "",
      title: "",
      objectives: "",
    });
    setSelectedWeek(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      week_number: parseInt(formData.week_number),
    };
    createMutation.mutate(submitData);
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Weekly Content</h2>
            <p className="text-muted-foreground">Create and manage weekly lessons</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create Week
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Weekly Content</DialogTitle>
                <DialogDescription>Set up a new week of learning materials</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <SelectContent>
                      {mySubjects?.map((subject: any) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name} - {subject.programs?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="week_number">Week Number</Label>
                  <Input
                    id="week_number"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.week_number}
                    onChange={(e) => setFormData({ ...formData, week_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Week
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.subject_id}
              onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {mySubjects?.map((subject: any) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name} - {subject.programs?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {formData.subject_id && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full text-center py-8">Loading...</div>
            ) : weeks && weeks.length > 0 ? (
              weeks.map((week: any) => (
                <Card key={week.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Week {week.week_number}</CardTitle>
                        <CardDescription>{week.title}</CardDescription>
                      </div>
                      {week.is_published ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" />
                          Draft
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {week.objectives && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {week.objectives}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          /* TODO: Navigate to week detail */
                        }}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Edit Content
                      </Button>
                      <Button
                        size="sm"
                        variant={week.is_published ? "secondary" : "default"}
                        onClick={() =>
                          publishMutation.mutate({
                            id: week.id,
                            is_published: !week.is_published,
                          })
                        }
                      >
                        {week.is_published ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No weeks created yet. Click "Create Week" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}