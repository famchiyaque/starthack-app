import React, { useState } from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import ProjectCard from "@/components2/common/ProjectCard";
import { Search as SearchIcon, MapPin, Filter } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const projects = [
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
      id: 4,
      title: "Creative Recycling Workshop",
      company: "Virgin Unite",
      description: "Learn to create useful objects from recycled materials.",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000",
      participants: 28,
      deadline: "July 5",
      rewards: "180 pts",
      category: "Education",
    },
    {
      id: 5,
      title: "Conservation Marathon",
      company: "Virgin Voyages",
      description: "Run to raise funds for wildlife conservation.",
      imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000",
      participants: 125,
      deadline: "August 12",
      rewards: "300 pts",
      category: "Sports",
    },
  ];

  const categories = [
    "All", "Environment", "Community", "Education", "Reforestation", "Sports"
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileLayout>
      <div className="page-container">
        <h1 className="section-title text-xl mb-4">Discover Projects</h1>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search projects, companies..."
            className="pl-10 pr-4 py-3 w-full rounded-xl bg-white border border-border focus:outline-none focus:ring-1 focus:ring-orange-300 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex overflow-x-auto py-2 space-x-2 scrollbar-none">
            {categories.map(category => (
              <button
                key={category}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-orange-100"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> 
            <span>Near Me</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" /> 
            <span>Filters</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
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
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Search;
