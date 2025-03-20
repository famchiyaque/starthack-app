
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layouts
import SidebarLayout from "./components/layout/AppSidebar";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Feed from "./pages/Feed";
import Collaborators from "./pages/Collaborators";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/auth/:action" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/projects" element={<SidebarLayout><Projects /></SidebarLayout>} />
            <Route path="/projects/:projectId" element={<SidebarLayout><ProjectDetail /></SidebarLayout>} />
            <Route path="/feed" element={<SidebarLayout><Feed /></SidebarLayout>} />
            <Route path="/collaborators" element={<SidebarLayout><Collaborators /></SidebarLayout>} />
            <Route path="/profile" element={<SidebarLayout><Profile /></SidebarLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
