
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Award, Search, LayoutGrid, Users, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: "Points",
      path: "/client/points",
      icon: Award,
    },
    {
      name: "Search",
      path: "/client/search",
      icon: Search,
    },
    {
      name: "Feed",
      path: "/client/user",
      icon: LayoutGrid,
    },
    {
      name: "Community",
      path: "/client/community",
      icon: Users,
    },
    {
      name: "Profile",
      path: "/client/user/profile",
      icon: UserRound,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background w-full max-w-md mx-auto">
      <main className="flex-1 overflow-y-auto pb-16">{children}</main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs",
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1 transition-colors duration-200",
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                )} 
              />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
