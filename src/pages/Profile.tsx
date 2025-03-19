
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Grid, LineChart, List, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for projects in profile
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Eco-friendly Packaging Design',
    description: 'Developing sustainable packaging solutions for consumer products that minimize environmental impact.',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFja2FnaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    company: {
      id: '101',
      name: 'Green Innovations',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
    description: 'Revamping the user experience and interface of our mobile banking application for better accessibility and security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    company: {
      id: '102',
      name: 'FinTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFua3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    status: 'planning',
    category: 'Technology',
    likes: 12,
    comments: 3,
    updatedAt: new Date('2023-06-10'),
    progress: 15,
  },
];

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" />;
  }

  const isCompany = user.type === 'company';
  const isOwnProfile = true; // In a real app, this would be determined by comparing user IDs

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
        
        <div className="container px-4 md:px-6 py-8">
          <AnimatedTransition type="fade">
            <Tabs defaultValue="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="projects" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    {isCompany ? 'Projects' : 'Followed Projects'}
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Activity
                  </TabsTrigger>
                  {isCompany && (
                    <TabsTrigger value="analytics" className="flex items-center gap-2">
                      <LineChart className="h-4 w-4" />
                      Analytics
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="about" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    About
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
                {isCompany && isOwnProfile && (
                  <div className="flex justify-end">
                    <Button asChild>
                      <a href="/dashboard">Manage Projects</a>
                    </Button>
                  </div>
                )}
                
                {mockProjects.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">
                      {isCompany 
                        ? 'No projects yet' 
                        : 'Not following any projects yet'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {isCompany 
                        ? 'Create your first project to start tracking progress' 
                        : 'Follow projects you are interested in to see them here'}
                    </p>
                    <Button asChild>
                      <a href={isCompany ? '/dashboard' : '/feed'}>
                        {isCompany ? 'Create Project' : 'Explore Projects'}
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                  }>
                    {mockProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        delay={index * 100}
                        compact={viewMode === 'list'}
                        className={viewMode === 'list' ? "flex flex-col md:flex-row" : ""}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Activity Feed</h3>
                  <p className="text-muted-foreground">
                    Track your recent interactions and updates
                  </p>
                </div>
              </TabsContent>
              
              {isCompany && (
                <TabsContent value="analytics">
                  <div className="rounded-lg border p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      View insights about your projects and engagement metrics
                    </p>
                  </div>
                </TabsContent>
              )}
              
              <TabsContent value="about">
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-4">About</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Bio</h4>
                      <p>{user.bio || "No bio provided yet."}</p>
                    </div>
                    
                    {isCompany && (
                      <>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Website</h4>
                          {user.website ? (
                            <a 
                              href={user.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {user.website}
                            </a>
                          ) : (
                            <p>No website provided yet.</p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                          <p>{user.location || "No location provided yet."}</p>
                        </div>
                      </>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                      <p>{user.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Joined</h4>
                      <p>{user.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
