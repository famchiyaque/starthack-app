
import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Calendar, CheckCircle, Clock, Users } from "lucide-react";

const Community = () => {
  // Mock data for active and completed projects
  const activeProjects = [
    {
      id: 1,
      title: "Limpieza de playa San Carlos",
      company: "EcoMundo",
      imageUrl: "https://images.unsplash.com/photo-1618477462146-050d2757350d?q=80&w=1000",
      progress: 70,
      tasksDone: 3,
      tasksTotal: 5,
      nextActivity: "Recolección domingo 9:00 AM",
      nextDate: "18 Jun",
    },
    {
      id: 2,
      title: "Recolección de alimentos",
      company: "FoodShare",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd59a0c3a4be?q=80&w=1000",
      progress: 40,
      tasksDone: 2,
      tasksTotal: 4,
      nextActivity: "Distribución miércoles 5:00 PM",
      nextDate: "21 Jun",
    }
  ];
  
  const completedProjects = [
    {
      id: 3,
      title: "Taller de reciclaje comunitario",
      company: "ArtEco",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000",
      pointsEarned: 200,
      completionDate: "May 2023",
    },
    {
      id: 4,
      title: "Maratón por la conservación",
      company: "RunForNature",
      imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000",
      pointsEarned: 350,
      completionDate: "Abr 2023",
    },
  ];

  const communityStats = {
    totalProjects: 4,
    totalPoints: 750,
    totalImpact: "12 toneladas CO₂ reducidas",
  };

  return (
    <MobileLayout>
      <div className="page-container">
        <h1 className="section-title text-xl mb-4">Mi Comunidad</h1>
        
        <div className="bg-white rounded-xl border border-border p-4 mb-6">
          <h2 className="font-medium mb-3">Mi Impacto</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2">
              <div className="text-2xl font-bold text-orange-500 animate-float">{communityStats.totalProjects}</div>
              <div className="text-xs text-muted-foreground">Proyectos</div>
            </div>
            <div className="p-2 border-x border-border">
              <div className="text-2xl font-bold text-orange-500 animate-float">{communityStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Puntos</div>
            </div>
            <div className="p-2">
              <div className="text-sm font-bold text-orange-500 animate-float">{communityStats.totalImpact}</div>
              <div className="text-xs text-muted-foreground">Impacto</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="section-title">Proyectos Activos</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-border overflow-hidden card-hover">
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 mr-4">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 font-medium">{project.company}</p>
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      <span>{project.tasksDone}/{project.tasksTotal} Actividades</span>
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
          <h2 className="section-title">Proyectos Completados</h2>
          <div className="space-y-3">
            {completedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-border p-4 flex items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
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
        
        <div>
          <h2 className="section-title">Mi Equipo</h2>
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center mb-4">
              <div className="flex -space-x-2 mr-4">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-xs font-medium text-orange-600">
                  +2
                </div>
              </div>
              <div>
                <h3 className="font-medium">Eco Equipo</h3>
                <p className="text-xs text-muted-foreground">6 miembros</p>
              </div>
            </div>
            <button className="w-full py-2 border border-orange-200 rounded-lg text-sm text-orange-600 font-medium hover:bg-orange-50 transition-colors">
              Ver Equipo
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Community;
