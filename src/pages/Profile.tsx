
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Link2, Calendar, UserCheck } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';

const Profile = () => {
  // Mock user data
  const user = {
    id: '1',
    name: 'Jane Cooper',
    avatar: '',
    role: 'UX Designer',
    location: 'San Francisco, CA',
    website: 'janecooper.design',
    joinDate: new Date('2022-05-10'),
    bio: 'UX Designer with a passion for creating intuitive and engaging user experiences. Specializing in mobile app interfaces and design systems.',
    connections: 142,
    projects: 24,
    skills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Figma', 'Adobe XD'],
  };

  return (
    <div className="space-y-6">
      <AnimatedTransition type="fade">
        <Card>
          <CardHeader className="relative pb-0">
            <div className="absolute right-6 top-6">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
            
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.role}</p>
                
                <div className="mt-2 flex flex-wrap gap-y-2 gap-x-4 text-sm justify-center sm:justify-start">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                  
                  {user.website && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Link2 className="h-4 w-4" />
                      <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {user.website}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <div className="flex items-center gap-1">
                    <UserCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{user.connections} connections</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="mt-6">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <h3 className="text-lg font-medium mb-2">Bio</h3>
                <p className="text-muted-foreground">{user.bio}</p>
              </TabsContent>
              
              <TabsContent value="skills" className="mt-4">
                <h3 className="text-lg font-medium mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-4">
                <h3 className="text-lg font-medium mb-2">Recent Projects</h3>
                <p className="text-muted-foreground">You have contributed to {user.projects} projects.</p>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Projects</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Profile;
