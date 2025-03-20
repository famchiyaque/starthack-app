
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index2 from "./pages2/Index";
import Points2 from "./pages2/Points";
import Search2 from "./pages2/Search";
import Community2 from "./pages2/Community";
import Profile2 from "./pages2/Profile";
import NotFound2 from "./pages2/NotFound";
import UserSettings from "./pages2/Settings.jsx";
import Community from "./pages2/Community";
import CompanyForum from "./pages2/CompanyForum";
import "./styles/MobileContainer.css";

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

// Mobile container for user routes
const MobileContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mobile">
    <div className="mobile-content">{children}</div>
  </div>
);

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
            
            {/* Company routes */}
            <Route path="projects" element={<SidebarLayout><Projects /></SidebarLayout>} />
            <Route path="projects/:projectId" element={<SidebarLayout><ProjectDetail /></SidebarLayout>} />
            <Route path="feed" element={<SidebarLayout><Feed /></SidebarLayout>} />
            <Route path="collaborators" element={<SidebarLayout><Collaborators /></SidebarLayout>} />
            <Route path="profile" element={<SidebarLayout><Profile /></SidebarLayout>} />
            {/* end company routes */}

            {/* User routes */}
            <Route path="client/user" element={<MobileContainer><Index2 /></MobileContainer>} />
            <Route path="client/points" element={<MobileContainer><Points2 /></MobileContainer>} />
            <Route path="client/search" element={<MobileContainer><Search2 /></MobileContainer>} />
            <Route path="client/community" element={<MobileContainer><Community2 /></MobileContainer>} />
            <Route path="client/user/profile" element={<MobileContainer><Profile2 /></MobileContainer>} />
            <Route path="client/settings" element={<MobileContainer>< UserSettings/></MobileContainer>} />
            <Route path="client/user/*" element={<MobileContainer><NotFound2 /></MobileContainer>} />
            <Route path="/community" element={<Community />} />
          <Route path="/community/forum/:forumId" element={<CompanyForum />} />
            {/* End user routes */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
