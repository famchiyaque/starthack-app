
import React from "react";
import { Bookmark, Calendar, Zap } from "lucide-react";
import MobileLayout from "@/components2/layout/MobileLayout";
import Hero from "@/components2/home/Hero";
import ProjectCard from "@/components2/common/ProjectCard";

const mockProjects = [
  {
    id: "1",
    title: "Ocean Cleanup Initiative",
    company: "EcoSolutions",
    description: "Join us in cleaning up beaches and protecting marine life from plastic pollution.",
    imageUrl: "https://images.unsplash.com/photo-1621451651659-fd337f8fed41",
    participants: 128,
    deadline: "7 days left",
    rewards: "250 points",
    category: "Environment"
  },
  {
    id: "2",
    title: "Digital Literacy Workshop",
    company: "TechEd Foundation",
    description: "Help teach basic computer skills to underserved communities.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    participants: 48,
    deadline: "15 days left",
    rewards: "200 points",
    category: "Education"
  },
  {
    id: "3",
    title: "Community Garden",
    company: "GreenSpaces",
    description: "Help create and maintain a community garden providing fresh produce.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    participants: 76,
    deadline: "3 days left",
    rewards: "300 points",
    category: "Community"
  }
];

const Index = () => {
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Feed</h1>
        
        {/* Hero section */}
        <Hero />
        
        {/* Quick links */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="flex flex-col items-center justify-center bg-[#DA0630]/5 rounded-lg p-3">
            <Bookmark className="text-[#DA0630] h-5 w-5 mb-1" />
            <span className="text-xs text-center">Saved</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#DA0630]/5 rounded-lg p-3">
            <Calendar className="text-[#DA0630] h-5 w-5 mb-1" />
            <span className="text-xs text-center">Upcoming</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#DA0630]/5 rounded-lg p-3">
            <Zap className="text-[#DA0630] h-5 w-5 mb-1" />
            <span className="text-xs text-center">For You</span>
          </div>
        </div>
        
        {/* Projects section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium">Popular Projects</h2>
            <button className="text-sm text-[#DA0630]">See all</button>
          </div>
          
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
