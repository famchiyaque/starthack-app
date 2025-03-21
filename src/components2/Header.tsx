import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("sticky top-0 z-50 w-full px-6 py-4 backdrop-blur-md bg-white/80 border-b border-gray-100", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-virgin-dark animate-fade-in">
            Virgin Rewards
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-virgin-red flex items-center justify-center text-white animate-scale-in">
            <span className="font-medium text-sm">V</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
