import React from "react";

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  participants: number;
  deadline: string;
  rewards: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  company,
  description,
  imageUrl,
  participants,
  deadline,
  rewards,
  category,
}) => {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="px-2 py-1 text-xs font-medium rounded-full bg-[#DA0630]/10 text-[#DA0630]">
            {category}
          </div>
        </div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{company}</p>
        <p className="text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{participants}</span> participants
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs px-2 py-1 rounded-full bg-secondary">
              {deadline}
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-[#DA0630]/10 text-[#DA0630]">
              {rewards}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;