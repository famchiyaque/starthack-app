
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MessageCircle, Bell, Plus } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';

// Dummy data for projects
const mockProjects = [
  {
    id: '1',
    title: 'Mobile App Redesign',
    description: 'Redesigning the mobile app interface for better user experience',
    progress: 75,
    updatedAt: new Date('2023-09-15'),
    comments: 24,
    notifications: 5,
  },
  {
    id: '2',
    title: 'Website Development',
    description: 'Creating a responsive website for a client in the healthcare industry',
    progress: 45,
    updatedAt: new Date('2023-09-10'),
    comments: 12,
    notifications: 2,
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    description: 'Developing a marketing strategy for a new product launch',
    progress: 30,
    updatedAt: new Date('2023-09-05'),
    comments: 8,
    notifications: 0,
  },
  {
    id: '4',
    title: 'Brand Identity',
    description: 'Creating a new brand identity including logo, colors, and typography',
    progress: 90,
    updatedAt: new Date('2023-09-01'),
    comments: 15,
    notifications: 1,
  },
];

const Projects = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>New Project</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project, index) => (
          <AnimatedTransition key={project.id} type="fade" delay={index * 100}>
            <Link to={`/projects/${project.id}`} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Progress: {project.progress}%
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>
                      {project.updatedAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <MessageCircle size={14} />
                      <span>{project.comments}</span>
                    </div>
                    {project.notifications > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <Bell size={14} />
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                          {project.notifications}
                        </span>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </AnimatedTransition>
        ))}
      </div>
    </div>
  );
};

export default Projects;
