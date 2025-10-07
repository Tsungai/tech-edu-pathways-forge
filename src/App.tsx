import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Setup from "./pages/Setup";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import MyCourse from "./pages/dashboard/student/MyCourse";
import WeeklyLessons from "./pages/dashboard/student/WeeklyLessons";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import MySubjects from "./pages/dashboard/teacher/MySubjects";
import WeeklyContent from "./pages/dashboard/teacher/WeeklyContent";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Programs from "./pages/dashboard/admin/Programs";
import Subjects from "./pages/dashboard/admin/Subjects";
import Users from "./pages/dashboard/admin/Users";
import TeacherAssignments from "./pages/dashboard/admin/TeacherAssignments";
import Enrollments from "./pages/dashboard/admin/Enrollments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <FloatingContactWidget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/dashboard/student" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/student/course" element={<ProtectedRoute requiredRole="student"><MyCourse /></ProtectedRoute>} />
            <Route path="/dashboard/student/lessons" element={<ProtectedRoute requiredRole="student"><WeeklyLessons /></ProtectedRoute>} />
            <Route path="/dashboard/teacher" element={<ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/teacher/subjects" element={<ProtectedRoute requiredRole="teacher"><MySubjects /></ProtectedRoute>} />
            <Route path="/dashboard/teacher/weeks" element={<ProtectedRoute requiredRole="teacher"><WeeklyContent /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin/programs" element={<ProtectedRoute requiredRole="admin"><Programs /></ProtectedRoute>} />
            <Route path="/dashboard/admin/subjects" element={<ProtectedRoute requiredRole="admin"><Subjects /></ProtectedRoute>} />
            <Route path="/dashboard/admin/users" element={<ProtectedRoute requiredRole="admin"><Users /></ProtectedRoute>} />
            <Route path="/dashboard/admin/assignments" element={<ProtectedRoute requiredRole="admin"><TeacherAssignments /></ProtectedRoute>} />
            <Route path="/dashboard/admin/enrollments" element={<ProtectedRoute requiredRole="admin"><Enrollments /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
