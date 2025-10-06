import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SuperAdminPanel } from "./pages/SuperAdminPanel";
import { StudentPanel } from "./pages/StudentPanel";
import CourseDetail from "./pages/CourseDetail";
import { Contact } from "./pages/Contact";
import SuperAdminUploadNew from "./pages/SuperAdminUploadNew";
import SuperAdminUploadCreate from "./pages/SuperAdminUploadCreate";
import SuperAdminUploadVideos from "./pages/SuperAdminUploadVideos";
import SuperAdminUsers from "./pages/SuperAdminUsers";
import SuperAdminCourseDetail from "./pages/SuperAdminCourseDetail";
import SuperAdminSettings from "./pages/SuperAdminSettings";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/superadmin" element={<SuperAdminPanel />} />
            <Route path="/superadmin/upload" element={<SuperAdminUploadNew />} />
            <Route path="/superadmin/upload/create" element={<SuperAdminUploadCreate />} />
            <Route path="/superadmin/upload/course/:courseId/videos" element={<SuperAdminUploadVideos />} />
            <Route path="/superadmin/users" element={<SuperAdminUsers />} />
            <Route path="/superadmin/course/:id" element={<SuperAdminCourseDetail />} />
            <Route path="/superadmin/settings" element={<SuperAdminSettings />} />
            <Route path="/student" element={<StudentPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
