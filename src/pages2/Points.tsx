import React from 'react';
import Header from '@/components2/Header';
import PointsCard from '@/components2/PointsCard';
import CouponCard from '@/components2/CouponCard';
import RewardCard from '@/components2/RewardCard';
import MobileLayout from "@/components2/layout/MobileLayout";
import InitiativeCard from '@/components2/InitiativeCard';
import TabBar from '@/components2/TabBar';
import { initiatives, coupons, rewards, userPoints } from '@/data/coupons';

// Sample progress data for coupons
const couponProgress = [
  { id: 1, progress: 75 }, // 3 out of 4 steps completed
  { id: 2, progress: 50 }, // 2 out of 4 steps completed
  { id: 3, progress: 25 }, // 1 out of 4 steps completed
];

const Index = () => {
  // Function to get progress for a coupon
  const getCouponProgress = (couponId: number) => {
    const progressData = couponProgress.find(item => item.id === couponId);
    return progressData ? progressData.progress : 0;
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50 pb-20">
        <main className="max-w-lg mx-auto px-4 py-6 space-y-8">


          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">My Coupons progress</h2>
            <div className="space-y-3">
              {coupons.slice(0, 3).map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  id={coupon.id}
                  title={coupon.title}
                  company={coupon.company}
                  discount={coupon.discount}
                  expiry={coupon.expiry}
                  progress={getCouponProgress(coupon.id)}
                  requiredSteps={4}
                />
              ))}
            </div>
          </section>


          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Available Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.slice(0, 2).map((reward) => (
                <RewardCard
                  key={reward.id}
                  id={reward.id}
                  title={reward.title}
                  description={reward.description}
                  points={reward.points}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </MobileLayout>
  );
};

export default Index;