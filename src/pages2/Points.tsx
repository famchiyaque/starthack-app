import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Award, ChevronRight, Ticket, Gift } from "lucide-react";

const Points = () => {
  return (
    <MobileLayout>
      <div className="page-container">
        <div className="rounded-2xl overflow-hidden mb-6 relative">
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
            <h1 className="text-lg font-bold mb-2">My Points</h1>
            <div className="flex items-center mb-2">
              <Award className="h-10 w-10 mr-3 text-red-300" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold">2,450</span>
                <span className="text-red-200 text-xs">Available Points</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-4 text-sm">
              <div>
                <p className="text-red-200">This Month</p>
                <p className="font-semibold">+350 pts</p>
              </div>
              <div>
                <p className="text-red-200">Accumulated</p>
                <p className="font-semibold">4,200 pts</p>
              </div>
              <div>
                <p className="text-red-200">Redeemed</p>
                <p className="font-semibold">1,750 pts</p>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full translate-x-16 -translate-y-8 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-400/10 rounded-full -translate-x-12 translate-y-6 blur-xl"></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="section-title">My Coupons</h2>
          <div className="space-y-3">
            <div className="flex bg-white rounded-xl overflow-hidden border border-border card-hover">
              <div className="w-24 bg-red-100 flex items-center justify-center p-4">
                <Ticket className="h-10 w-10 text-red-600" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="font-medium">15% Discount</h3>
                <p className="text-xs text-muted-foreground">EcoMundo Stores</p>
              </div>
              <div className="w-10 flex items-center justify-center text-muted-foreground">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="section-title">Available Rewards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-border card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-red-100 h-12 w-12 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-red-600" />
                </div>
                <div className="chip bg-red-100">500 pts</div>
              </div>
              <h3 className="font-medium mb-1">Movie Ticket</h3>
              <p className="text-xs text-muted-foreground mb-3">Valid for any screening</p>
              <button className="w-full bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium py-2 rounded-lg transition-colors">
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Points;
