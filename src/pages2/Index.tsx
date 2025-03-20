
import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import Hero from "@/components2/home/Hero";
import ProjectCard from "@/components2/common/ProjectCard";

const Index = () => {
  // Mock data for projects
  const featuredProjects = [
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
  ];

  return (
    <MobileLayout>
      <div className="page-container">
        <Hero />
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Proyectos destacados</h2>
            <button className="text-sm text-primary font-medium">Ver todos</button>
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
          <h2 className="section-title">Actividad reciente</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Laura M.</span> se unió al proyecto{" "}
                    <span className="text-orange-600 font-medium">Limpieza de playa San Carlos</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">hace 2 horas</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Carlos G.</span> completó una actividad y ganó{" "}
                    <span className="text-orange-600 font-medium">50 puntos</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">hace 5 horas</p>
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
