import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, Search, LayoutGrid, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({ className }) => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Points', icon: Award, path: '/' },
    { name: 'Search', icon: Search, path: '/search' },
    { name: 'Feed', icon: LayoutGrid, path: '/feed' },
    { name: 'Communities', icon: Users, path: '/communities' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4 glassmorphism backdrop-blur-lg z-50",
      className
    )}>
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-all",
                isActive 
                  ? "text-virgin-red" 
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1",
                  isActive && "animate-pulse-slow"
                )} 
              />
              <span className="text-xs font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;