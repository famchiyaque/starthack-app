
import React, { useState } from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import ProjectCard from "@/components2/common/ProjectCard";
import { Search as SearchIcon, MapPin, Filter } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "Limpieza de playa San Carlos",
      company: "EcoMundo",
      description: "Ayúdanos a limpiar la playa y conservar el ecosistema marino.",
      imageUrl: "https://images.unsplash.com/photo-1618477462146-050d2757350d?q=80&w=1000",
      participants: 48,
      deadline: "23 Jun",
      rewards: "200 pts",
      category: "Medio ambiente",
    },
    {
      id: 2,
      title: "Plantación de árboles nativos",
      company: "GreenForest",
      description: "Contribuye a la reforestación con especies nativas.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
      participants: 32,
      deadline: "15 Jul",
      rewards: "150 pts",
      category: "Reforestación",
    },
    {
      id: 3,
      title: "Recolección de alimentos",
      company: "FoodShare",
      description: "Dona alimentos para familias necesitadas en tu comunidad.",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd59a0c3a4be?q=80&w=1000",
      participants: 76,
      deadline: "30 Jun",
      rewards: "250 pts",
      category: "Comunidad",
    },
    {
      id: 4,
      title: "Taller de reciclaje creativo",
      company: "ArtEco",
      description: "Aprende a crear objetos útiles con materiales reciclados.",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000",
      participants: 28,
      deadline: "5 Jul",
      rewards: "180 pts",
      category: "Educación",
    },
    {
      id: 5,
      title: "Maratón por la conservación",
      company: "RunForNature",
      description: "Corre para recaudar fondos para la conservación animal.",
      imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000",
      participants: 125,
      deadline: "12 Ago",
      rewards: "300 pts",
      category: "Deporte",
    },
  ];

  const categories = [
    "Todos", "Medio ambiente", "Comunidad", "Educación", "Reforestación", "Deporte"
  ];

  const [activeCategory, setActiveCategory] = useState("Todos");

  // Filter projects based on search term and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "Todos" || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileLayout>
      <div className="page-container">
        <h1 className="section-title text-xl mb-4">Descubre Proyectos</h1>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Buscar proyectos, empresas..."
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
            <span>Cerca de mí</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" /> 
            <span>Filtros</span>
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
              <p className="text-muted-foreground">No se encontraron proyectos.</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Search;
