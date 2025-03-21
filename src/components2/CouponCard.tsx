import React from 'react';
import { Ticket, ChevronRight, Plane, Ship, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CouponCardProps {
  id: number;
  title: string;
  company: string;
  discount: string;
  expiry?: string;
  className?: string;
  progress?: number; // Current progress (0-100)
  requiredSteps?: number; // Total number of steps needed (default 4)
}

const CouponCard: React.FC<CouponCardProps> = ({
  id,
  title,
  company,
  discount,
  expiry,
  className,
  progress = 50, // Default value
  requiredSteps = 4 // Default to 4 mini bars
}) => {
  // Select icon based on company
  const getCompanyIcon = () => {
    switch (company) {
      case 'Virgin Atlantic':
        return <Plane className="w-6 h-6 text-virgin-atlantic" />;
      case 'Virgin Voyages':
        return <Ship className="w-6 h-6 text-virgin-voyages" />;
      case 'Virgin Media O2':
        return <Wifi className="w-6 h-6 text-virgin-media" />;
      default:
        return <Ticket className="w-6 h-6 text-virgin-red" />;
    }
  };

  // Get color based on company
  const getCompanyColor = () => {
    switch (company) {
      case 'Virgin Atlantic':
        return 'bg-blue-50 border-blue-100';
      case 'Virgin Voyages':
        return 'bg-cyan-50 border-cyan-100';
      case 'Virgin Media O2':
        return 'bg-purple-50 border-purple-100';
      default:
        return 'bg-red-50 border-red-100';
    }
  };

  // Get progress bar color based on company
  const getProgressColor = () => {
    switch (company) {
      case 'Virgin Atlantic':
        return 'bg-blue-500';
      case 'Virgin Voyages':
        return 'bg-cyan-500';
      case 'Virgin Media O2':
        return 'bg-purple-500';
      default:
        return 'bg-red-500';
    }
  };

  // Calculate completed steps based on progress
  const completedSteps = Math.ceil((progress / 100) * requiredSteps);

  return (
    <div
      className={cn(
        `flex flex-col w-full rounded-xl ${getCompanyColor()} border p-4 transition-all card-hover animate-fade-up`,
        className
      )}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 mr-4 bg-white p-3 rounded-lg soft-shadow">
          {getCompanyIcon()}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900">{discount}</h3>
          <p className="text-sm text-gray-600">{company}</p>
          {expiry && <p className="text-xs text-gray-500 mt-1">Valid until {expiry}</p>}
        </div>
        <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-400" />
      </div>
      
      {/* Progress bar section */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{completedSteps}/{requiredSteps}</span>
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: requiredSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`h-2 flex-1 rounded-full ${
                index < completedSteps ? getProgressColor() : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;