
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Users, Award } from "lucide-react";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  participants: number;
  deadline?: string;
  rewards: string;
  category: string;
  className?: string;
}

const ProjectCard = ({
  title,
  company,
  description,
  imageUrl,
  participants,
  deadline,
  rewards,
  category,
  className,
}: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden bg-white shadow-md card-hover border border-border",
        className
      )}
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <div className="chip animate-fade-in">{category}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-orange-600">{company}</p>
          {deadline && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{deadline}</span>
            </div>
          )}
        </div>

        <h3 className="text-base font-semibold line-clamp-2 mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{participants} participantes</span>
          </div>
          <div className="flex items-center text-orange-600 font-medium">
            <Award className="h-3.5 w-3.5 mr-1" />
            <span>{rewards}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
