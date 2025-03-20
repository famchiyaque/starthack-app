import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Calendar, CheckCircle, Clock, Users } from "lucide-react";

const Community = () => {
  const activeProjects = [
    {
      id: 1,
      title: "Better Connections Plan",
      company: "Virgin Media 02",
      imageUrl: "https://storyblok.cdn.vmo2digital.co.uk/f/253875/352x180/12631b061b/vmo_2_benefits_1_837883d8c6.png/m/3840x0/filters:quality(75)",
      progress: 70,
      tasksDone: 3,
      tasksTotal: 5,
      nextActivity: "Collection Sunday 9:00 AM",
      nextDate: "June 18",
    },
    {
      id: 2,
      title: "Planetary Guardians",
      company: "Virgin Unite",
      imageUrl: "https://images.ctfassets.net/jzw139d5dphm/17wvlvmJmKrtjaIPgdi5FM/d1316ca7451497b3590952564c6d1397/100-_Human_at_Work-1.jpg?q=75&w=2500&fm=avif",
      progress: 40,
      tasksDone: 2,
      tasksTotal: 4,
      nextActivity: "Distribution Wednesday 5:00 PM",
      nextDate: "June 21",
    }
  ];
  
  const completedProjects = [
    {
      id: 3,
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      imageUrl: "https://vaabrowse.virginatlantic.com//content/dam/vhols/hp/content-card-images/Lady-in-car-LA.jpg.vaa.75.avif",
      pointsEarned: 200,
      completionDate: "May 2023",
    },
    {
      id: 4,
      title: "Epic Sea Change For All",
      company: "Virgin Atlantic",
      imageUrl: "https://media.virginvoyages.com/https://www.virginvoyages.com/dam/jcr:44bfcae2-34ca-44f7-a27b-9e753bf16d8a/IMG-DEST-st-croix-Catamaran-Off-Coast-of-St-Croix-share-page-hero-v1-16x9.jpg",
      pointsEarned: 350,
      completionDate: "Apr 2023",
    },
  ];

  const communityStats = {
    totalProjects: 4,
    totalPoints: 750,
    totalImpact: "12 tons of CO₂ reduced",
  };
  const featuredProjects = [
    {
      id: 1,
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      description: "Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF -  marking a key milestone on the path to decarbonising aviation.",
      imageUrl: "https://vaabrowse.virginatlantic.com//content/dam/vhols/hp/content-card-images/Lady-in-car-LA.jpg.vaa.75.avif",
      participants: 48,
      deadline: "Jun 23",
      rewards: "200 pts",
      category: "Environment",
    },
    {
      id: 2,
      title: "Epic Sea Change For All",
      company: "Virgin Voyages",
      description: "Virgin Voyages have teamed up with Virgin’s Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.",
      imageUrl: "https://media.virginvoyages.com/https://www.virginvoyages.com/dam/jcr:44bfcae2-34ca-44f7-a27b-9e753bf16d8a/IMG-DEST-st-croix-Catamaran-Off-Coast-of-St-Croix-share-page-hero-v1-16x9.jpg",
      participants: 32,
      deadline: "Jul 15",
      rewards: "150 pts",
      category: "Reforestation",
    },
    {
      id: 3,
      title: "Better Connections Plan",
      company: "Virgin Media 02",
      description: "Community Calling is a pioneering initiative by Virgin Media O2 and environmental charity Hubbub to tackle digital exclusion. It has already rehomed more than 20,000 unused smartphones with people who need them across the country.",
      imageUrl: "https://storyblok.cdn.vmo2digital.co.uk/f/253875/352x180/12631b061b/vmo_2_benefits_1_837883d8c6.png/m/3840x0/filters:quality(75)",
      participants: 76,
      deadline: "Jun 30",
      rewards: "250 pts",
      category: "Community",
    },
  ];
  return (
    <MobileLayout>
      <div className="page-container">
        <h1 className="section-title text-xl mb-4">My Community</h1>
        
        <div className="bg-white rounded-xl border border-border p-4 mb-6">
          <h2 className="font-medium mb-3">My Impact</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2">
              <div className="text-2xl font-bold text-orange-500 animate-float">{communityStats.totalProjects}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="p-2 border-x border-border">
              <div className="text-2xl font-bold text-orange-500 animate-float">{communityStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div className="p-2">
              <div className="text-sm font-bold text-orange-500 animate-float">{communityStats.totalImpact}</div>
              <div className="text-xs text-muted-foreground">Impact</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="section-title">Active Projects</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-border overflow-hidden card-hover">
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 mr-4">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 font-medium">{project.company}</p>
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      <span>{project.tasksDone}/{project.tasksTotal} Activities</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 flex items-center justify-between">
                  <div className="flex items-center text-xs">
                    <Clock className="h-3 w-3 mr-1 text-orange-500" />
                    <span>{project.nextActivity}</span>
                  </div>
                  <div className="flex items-center text-xs font-medium">
                    <Calendar className="h-3 w-3 mr-1 text-orange-500" />
                    <span>{project.nextDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="section-title">Completed Projects</h2>
          <div className="space-y-3">
            {completedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-border p-4 flex items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{project.company}</p>
                  <h3 className="text-sm font-medium">{project.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-orange-600 font-medium">+{project.pointsEarned} pts</div>
                  <div className="text-xs text-muted-foreground">{project.completionDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Community;
