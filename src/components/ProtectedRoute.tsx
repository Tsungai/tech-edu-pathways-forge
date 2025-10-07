import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "teacher" | "student" | "student_admin";
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  // Check if student needs to complete profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("first_login_completed")
        .eq("id", user.id)
        .single();
      return data;
    },
    enabled: !!user && userRole === "student",
  });

  if (loading || (userRole === "student" && profileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect students to complete profile if first login not completed
  if (
    userRole === "student" &&
    !profile?.first_login_completed &&
    location.pathname !== "/complete-profile"
  ) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Map roles to their dashboard routes
    const dashboardMap: Record<string, string> = {
      admin: "/dashboard/admin",
      teacher: "/dashboard/teacher",
      student: "/dashboard/student",
      student_admin: "/dashboard/student-admin",
    };
    return <Navigate to={dashboardMap[userRole || "student"]} replace />;
  }

  return <>{children}</>;
};