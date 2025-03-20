
import React from "react";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Award, Bell, ChevronRight, HelpCircle, LogOut, Settings, Share, Star, User } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Ana García",
    email: "ana.garcia@example.com",
    level: "Activista Bronce",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    points: 2450,
    joined: "Abril 2023",
    interests: ["Medio ambiente", "Reforestación", "Comunidad"],
    stats: {
      projects: 4,
      streak: "3 semanas",
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
          <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3" /> {user.level}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-3 border border-border text-center">
            <div className="text-lg font-bold mb-1">{user.stats.projects}</div>
            <div className="text-xs text-muted-foreground">Proyectos</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-border text-center">
            <div className="text-lg font-bold mb-1">{user.stats.streak}</div>
            <div className="text-xs text-muted-foreground">Racha</div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-border text-center">
            <div className="text-lg font-bold mb-1">{user.stats.badges}</div>
            <div className="text-xs text-muted-foreground">Insignias</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="section-title">Intereses</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <div key={index} className="chip">{interest}</div>
            ))}
            <button className="chip bg-secondary border border-border">+ Añadir</button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <h2 className="section-title">Cuenta</h2>
          
          <div className="rounded-xl overflow-hidden border border-border bg-white">
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Editar perfil</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Bell className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Notificaciones</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Award className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Mis Insignias</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <h2 className="section-title">Preferencias</h2>
          
          <div className="rounded-xl overflow-hidden border border-border bg-white">
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Settings className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Configuración</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <Share className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Invitar amigos</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center w-full p-4 hover:bg-secondary transition-colors">
              <div className="w-10 flex items-center justify-center mr-3">
                <HelpCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1 text-left">Ayuda y soporte</div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <button className="flex items-center justify-center w-full p-4 rounded-xl border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Cerrar sesión</span>
        </button>
        
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>Miembro desde {user.joined}</p>
          <p className="mt-1">Versión 1.0.0</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
