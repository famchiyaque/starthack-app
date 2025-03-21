
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Rss, Users, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
            <SidebarTrigger />
            <div className="ml-4 font-semibold">Volty</div>
          </div>
          <main className="container mx-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const menuItems = [
    {
      title: 'Projects',
      path: '/company/projects',
      icon: LayoutDashboard,
    },
    {
      title: 'Feed',
      path: '/company/feed',
      icon: Rss,
    },
    {
      title: 'Collaborators',
      path: '/company/collaborators',
      icon: Users,
    },
    {
      title: 'Profile',
      path: '/company/profile',
      icon: User,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex justify-start flex-row ">
        <img src={'/volty-icon-horiz.png'} width='100' />
        {/* <h1 className="text-xl font-bold text-primary">Volty</h1> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => navigate('/sign-in')}>
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarLayout;
