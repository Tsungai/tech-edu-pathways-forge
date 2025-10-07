import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    role: "student" as "student" | "teacher" | "student_admin",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-user-account", {
        body: formData,
      });

      if (error) throw error;

      toast.success(`${formData.role} account created successfully! Credentials sent via email.`);
      navigate("/dashboard/admin/users");
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Create User Account</h2>
          <p className="text-muted-foreground">Create teacher, student, or student admin accounts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student_admin">Student Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard/admin/users")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
