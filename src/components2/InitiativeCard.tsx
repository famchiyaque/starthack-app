import React, { useState } from 'react';
import { Users, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InitiativeCardProps {
  id: number;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  participants: number;
  deadline: string;
  rewards: string;
  category: string;
  className?: string;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({
  id,
  title,
  company,
  description,
  imageUrl,
  participants,
  deadline,
  rewards,
  category,
  className
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get company tag color
  const getCompanyTagColor = () => {
    switch (company) {
      case 'Virgin Atlantic':
        return 'bg-blue-100 text-blue-800';
      case 'Virgin Voyages':
        return 'bg-cyan-100 text-cyan-800';
      case 'Virgin Media O2':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  // Get category tag color
  const getCategoryTagColor = () => {
    switch (category) {
      case 'Environment':
        return 'bg-green-100 text-green-800';
      case 'Reforestation':
        return 'bg-emerald-100 text-emerald-800';
      case 'Community':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn(
      "w-full rounded-2xl bg-white border border-gray-100 overflow-hidden soft-shadow transition-all hover:shadow-lg animate-fade-up",
      className
    )}>
      <div className="relative h-48 w-full overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse",
          imageLoaded ? 'hidden' : 'block'
        )} />
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover lazy-image",
            imageLoaded ? 'loaded' : ''
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCompanyTagColor()}`}>
            {company}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryTagColor()}`}>
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{participants} participants</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Until {deadline}</span>
          </div>
          
          <div className="flex items-center text-sm text-virgin-red font-medium">
            <Award className="w-4 h-4 mr-1" />
            <span>{rewards}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeCard;