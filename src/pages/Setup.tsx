import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function Setup() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState<{ email: string; password: string } | null>(null);

  const createAdminAccount = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-admin");

      if (error) throw error;

      setAdminCredentials({
        email: data.email,
        password: data.password,
      });
      setCompleted(true);
      toast.success("Admin account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create admin account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Initial Setup</CardTitle>
          <CardDescription>
            Create the default administrator account for TechEdu Academy LMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!completed ? (
            <>
              <p className="text-sm text-muted-foreground">
                Click the button below to create the admin account with email: <strong>tsungaikatsuro@yahoo.com</strong>
              </p>
              <Button 
                onClick={createAdminAccount} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Admin Account...
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Setup Complete!</span>
              </div>
              
              {adminCredentials && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-medium">Admin Login Credentials:</p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {adminCredentials.email}</p>
                    <p><strong>Password:</strong> {adminCredentials.password}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Please save these credentials securely. You can change the password after logging in.
                  </p>
                </div>
              )}

              <Button 
                onClick={() => window.location.href = "/auth"}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}