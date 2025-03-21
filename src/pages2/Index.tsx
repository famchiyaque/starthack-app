import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import Hero from "@/components2/home/Hero";
import ProjectCard from "@/components2/common/ProjectCard";

const Index = () => {
  // Mock data for projects
  const featuredProjects = [
    {
      id: 1,
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      description: "Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF -  marking a key milestone on the path to decarbonising aviation.",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      participants: 48,
      deadline: "Jun 23",
      rewards: "200 pts",
      category: "Environment",
    },
    {
      id: 2,
      title: "Epic Sea Change For All",
      company: "Virgin Voyages",
      description: "Virgin Voyages have teamed up with Virgin's Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.",
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
        <Hero />
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Featured Projects</h2>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                company={project.company}
                description={project.description}
                imageUrl={project.imageUrl}
                participants={project.participants}
                deadline={project.deadline}
                rewards={project.rewards}
                category={project.category}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="section-title">Recent Activity</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DA0630]/10 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/ian.jpeg"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Ian H.</span> joined the project {" "}
                    <span className="text-[#DA0630] font-medium">Youngest, Cleanest Fleet in the Sky</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DA0630]/10 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/robert.jpeg"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Roberto H.</span> completed an activity and earned {" "}
                    <span className="text-[#DA0630] font-medium">50 points</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;