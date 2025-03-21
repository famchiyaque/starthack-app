import React from 'react';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RewardCardProps {
  id: number;
  title: string;
  description: string;
  points: number;
  className?: string;
}

const RewardCard: React.FC<RewardCardProps> = ({
  id,
  title,
  description,
  points,
  className
}) => {
  return (
    <div className={cn(
      "w-full rounded-xl bg-white border border-gray-100 p-5 soft-shadow animate-fade-up transition-all hover:shadow-md card-hover",
      className
    )}>
      <div className="flex items-center mb-4">
        <div className="bg-red-50 p-3 rounded-full mr-4">
          <Gift className="w-6 h-6 text-virgin-red" />
        </div>
        <p className="text-lg font-medium text-virgin-red">{points} pts</p>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <button
        className="w-full py-3 bg-red-50 hover:bg-red-100 rounded-lg text-virgin-red font-medium transition-all"
      >
        Redeem
      </button>
    </div>
  );
};

export default RewardCard;