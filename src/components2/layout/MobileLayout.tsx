
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Award, Users, User } from "lucide-react";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Feed", path: "/user/feed" },
    { icon: Search, label: "Search", path: "/user/search" },
    { icon: Award, label: "Points", path: "/user/points" },
    { icon: Users, label: "Community", path: "/user/community" },
    { icon: User, label: "Profile", path: "/user/user/profile" },
  ];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <footer className="border-t bg-white">
        <nav className="flex justify-around">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};

export default MobileLayout;
