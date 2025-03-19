
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';
import ProjectForm from '@/components/projects/ProjectForm';
import ProgressUpdate from '@/components/projects/ProgressUpdate';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LineChart, List, Grid, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Eco-friendly Packaging Design',
    description: 'Developing sustainable packaging solutions for consumer products that minimize environmental impact.',
    company: {
      id: '1',
      name: 'Green Innovations',
    },
    status: 'in_progress',
    category: 'Design',
    likes: 24,
    comments: 8,
    updatedAt: new Date('2023-06-15'),
    progress: 65,
  },
  {
    id: '2',
    title: 'Mobile Banking App Redesign',
    description: 'Revamping the user experience and interface of our mobile banking application.',
    company: {
      id: '1',
      name: 'Green Innovations',
    },
    status: 'planning',
    category: 'Technology',
    likes: 12,
    comments: 3,
    updatedAt: new Date('2023-06-10'),
    progress: 15,
  },
  {
    id: '3',
    title: 'Supply Chain Optimization',
    description: 'Implementing new systems to improve efficiency and reduce costs in our supply chain operations.',
    company: {
      id: '1',
      name: 'Green Innovations',
    },
    status: 'completed',
    category: 'Operations',
    likes: 18,
    comments: 5,
    updatedAt: new Date('2023-05-28'),
    progress: 100,
  },
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect individuals to feed
  if (user?.type === 'individual') {
    toast({
      title: 'Access restricted',
      description: 'The dashboard is only available for company accounts.',
    });
    return <Navigate to="/feed" />;
  }

  const handleCreateProject = () => {
    setIsCreateDialogOpen(false);
    toast({
      title: 'Project created',
      description: 'Your new project has been created successfully.',
    });
    // In a real app, we would fetch the updated list from an API
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container px-4 md:px-6 py-8">
          <AnimatedTransition type="fade" className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your projects and track their progress
                </p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create a New Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm onSuccess={handleCreateProject} />
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={100}>
            <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="projects" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="updates" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Updates
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="projects" className="space-y-6">
                {projects.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first project to start tracking progress
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </div>
                ) : (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            delay={index * 100}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projects.map((project, index) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            delay={index * 100}
                            className="flex flex-col md:flex-row"
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    View insights about your projects and engagement metrics
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="updates" className="space-y-6">
                {projects.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No projects to update</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a project first to post progress updates
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg border p-6">
                      <h3 className="text-lg font-medium mb-4">Post a Progress Update</h3>
                      <ProgressUpdate 
                        projectId={projects[0].id} 
                        currentProgress={projects[0].progress} 
                      />
                    </div>
                    
                    <div className="rounded-lg border p-6">
                      <h3 className="text-lg font-medium mb-4">Recent Updates</h3>
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No recent updates to display</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
