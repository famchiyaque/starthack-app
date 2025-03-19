
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AnimatedTransition from '@/components/common/AnimatedTransition';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  company: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  category: string;
  likes: number;
  comments: number;
  updatedAt: Date;
  progress: number;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  compact?: boolean;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
  compact = false,
  delay = 0,
}) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on_hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'Planning';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'on_hold':
        return 'On Hold';
      default:
        return 'Unknown';
    }
  };

  return (
    <AnimatedTransition
      type="fade"
      delay={delay}
      className={cn('group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-md', 
        className
      )}
    >
      <div className="relative">
        {/* Project Image */}
        <Link to={`/projects/${project.id}`}>
          <div className={cn('relative overflow-hidden bg-secondary',
            compact ? 'h-40' : 'h-48 md:h-56'
          )}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/5">
                <span className="text-lg text-muted-foreground">No image</span>
              </div>
            )}
          </div>
        </Link>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            {/* Category & Status */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
              <span 
                className={cn(
                  'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
                  getStatusColor(project.status)
                )}
              >
                {getStatusText(project.status)}
              </span>
            </div>

            {/* Title & Description */}
            <Link to={`/projects/${project.id}`}>
              <h3 className="text-lg font-medium leading-tight hover:text-primary transition-colors">
                {project.title}
              </h3>
            </Link>
            
            {!compact && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>

          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Company and stats */}
        <div className="mt-4 flex items-center justify-between">
          <Link to={`/company/${project.company.id}`} className="flex items-center gap-2 group/company">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {project.company.avatar ? (
                <img
                  src={project.company.avatar}
                  alt={project.company.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                project.company.name.charAt(0)
              )}
            </span>
            <span className="text-xs font-medium group-hover/company:text-primary transition-colors">
              {project.company.name}
            </span>
          </Link>

          <div className="flex items-center space-x-3 text-muted-foreground">
            {!compact && (
              <>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{project.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{project.comments}</span>
                </button>
              </>
            )}
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {new Date(project.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ProjectCard;
