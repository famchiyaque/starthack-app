import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Award, Bell, ChevronRight, HelpCircle, LogOut, Settings, Share, Star, User } from "lucide-react";
import { Calendar, CheckCircle, Clock, Users } from "lucide-react";

const UserSettings = () => {
  const user = {
    name: "Ian Hernández ",
    email: "ianhdez2020@gmail.com",
    level: "Bronze Activist",
    profileImage: "/ian.jpeg",
    points: 2450,
    joined: "April 2023",
    interests: ["Environment", "Reforestation", "Community"],
    stats: {
      projects: 4,
      streak: "3 weeks",
      badges: 5,
    },
  };

  return (
    <MobileLayout>
      <div className="page-container">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-white shadow-md">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
          <div className="inline-flex items-center gap-1 bg-[#DA0630]/10 text-[#DA0630] px-3 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3" /> {user.level}
          </div>
        </div>
        
        <h2 className="section-title">Account</h2>
          
        <div className="rounded-xl overflow-hidden border border-border bg-white">
          <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
            <div className="w-10 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-[#DA0630]" />
            </div>
            <div className="flex-1 text-left">Edit Profile</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="h-px bg-border" />
          
          <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
            <div className="w-10 flex items-center justify-center mr-3">
              <Bell className="h-5 w-5 text-[#DA0630]" />
            </div>
            <div className="flex-1 text-left">Notifications</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="h-px bg-border" />
          
          <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
            <div className="w-10 flex items-center justify-center mr-3">
              <Award className="h-5 w-5 text-[#DA0630]" />
            </div>
            <div className="flex-1 text-left">My Badges</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        
        <div className="space-y-4 mb-8">
          <h2 className="section-title">Preferences</h2>
          
          <div className="rounded-xl overflow-hidden border border-border bg-white">
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Settings className="h-5 w-5 text-[#DA0630]" />
              </div>
              <div className="flex-1 text-left">Settings</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Share className="h-5 w-5 text-[#DA0630]" />
              </div>
              <div className="flex-1 text-left">Invite Friends</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <HelpCircle className="h-5 w-5 text-[#DA0630]" />
              </div>
              <div className="flex-1 text-left">Help & Support</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <button className="flex items-center justify-center w-full p-4 rounded-xl border border-[#DA0630]/20 text-[#DA0630] hover:bg-[#DA0630]/5 transition-colors">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log Out</span>
        </button>
        
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>Member since {user.joined}</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default UserSettings;