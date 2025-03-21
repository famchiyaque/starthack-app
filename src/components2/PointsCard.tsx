import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointsCardProps {
  availablePoints: number;
  thisMonth: number;
  accumulated: number;
  redeemed: number;
  className?: string;
}

const PointsCard: React.FC<PointsCardProps> = ({
  availablePoints,
  thisMonth,
  accumulated,
  redeemed,
  className
}) => {
  return (
    <div className={cn(
      "w-full rounded-2xl bg-red-500 p-6 text-white relative overflow-hidden soft-shadow animate-fade-up", 
      className
    )}>
      {/* Background decorative elements */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      
      <h2 className="text-2xl font-medium mb-2">My Points</h2>
      
      <div className="flex items-center mt-2 mb-6">
        <Award className="w-12 h-12 mr-4 opacity-90" />
        <div>
          <p className="text-4xl font-bold tracking-tighter">
            {availablePoints.toLocaleString()}
          </p>
          <p className="text-sm text-white/80">Available Points</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-2 pt-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-sm text-white/80">This Month</p>
          <p className="text-lg font-semibold">+{thisMonth} pts</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-white/80">Accumulated</p>
          <p className="text-lg font-semibold">{accumulated.toLocaleString()} pts</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-white/80">Redeemed</p>
          <p className="text-lg font-semibold">{redeemed.toLocaleString()} pts</p>
        </div>
      </div>
    </div>
  );
};

export default PointsCard;