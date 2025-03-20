
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
      name: "Puntos",
      path: "/points",
      icon: Award,
    },
    {
      name: "Buscar",
      path: "/search",
      icon: Search,
    },
    {
      name: "Feed",
      path: "/",
      icon: LayoutGrid,
    },
    {
      name: "Comunidad",
      path: "/community",
      icon: Users,
    },
    {
      name: "Perfil",
      path: "/profile",
      icon: UserRound,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto pb-16">{children}</main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item w-full h-full pt-2",
                pathname === item.path && "active"
              )}
            >
              <item.icon 
                className={cn(
                  "nav-icon transition-colors duration-200",
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
