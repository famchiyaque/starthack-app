
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import SignIn from './pages/SignIn'

// User Routes
import Index2 from "./pages2/Index";
import Search2 from "./pages2/Search";
import Community2 from "./pages2/Community";
import Forum from "./pages2/CompanyForum";
import Profile2 from "./pages2/Profile";
import NotFound2 from "./pages2/NotFound";
import Points from "./pages2/Points";
import CouponDetail from "./components2/CouponDetail";
import "./styles/MobileContainer.css";

// Layouts
import SidebarLayout from "./components/layout/AppSidebar";

// Company Routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NewProject from "./pages/NewProject"; // Add import
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
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={ <SignIn /> } />
            <Route path="/auth/:action" element={<Auth />} />
            
            {/* Company routes */}
            <Route path="/company" element={ <Navigate to="/company/projects" replace /> } />
            <Route path="company/projects" element={<SidebarLayout><Projects /></SidebarLayout>} />
            <Route path="company/projects/new" element={<SidebarLayout><NewProject /></SidebarLayout>} /> {/* Add new route */}
            <Route path="company/projects/:projectId" element={<SidebarLayout><ProjectDetail /></SidebarLayout>} />
            <Route path="company/feed" element={<SidebarLayout><Feed /></SidebarLayout>} />
            <Route path="company/collaborators" element={<SidebarLayout><Collaborators /></SidebarLayout>} />
            <Route path="company/profile" element={<SidebarLayout><Profile /></SidebarLayout>} />
            {/* end company routes */}

            {/* User routes */}
            <Route path="/user" element={ <Navigate to="/user/feed" replace /> } />
            <Route path="user/feed" element={<MobileContainer><Index2 /></MobileContainer>} />
            <Route path="user/points" element={<Points/>} />
            <Route path="user/coupon/:id" element={<CouponDetail />} />
            <Route path="user/search" element={<MobileContainer><Search2 /></MobileContainer>} />
            <Route path="user/community" element={<MobileContainer><Community2 /></MobileContainer>} />
            <Route path="user/community/forum/:forumId" element={<MobileContainer><Forum /></MobileContainer>} />
            <Route path="user/user/profile" element={<MobileContainer><Profile2 /></MobileContainer>} />
            <Route path="user/user/*" element={<MobileContainer><NotFound2 /></MobileContainer>} />

            {/* End user routes */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
