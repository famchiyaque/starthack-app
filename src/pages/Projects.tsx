
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MessageCircle, Bell, Plus } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import { useAuth } from "../context/AuthContext";
import axios from 'axios'

const Projects = () => {
  const { name, userType } = useAuth();
  const [projects, setProjects] = useState([])
  console.log("name from auth: ", name)

  useEffect(() => {
    console.log("about to call backend api for projects");

    axios.get('/api/get-projects', {
      params: {
          name: name
      }
    })
    .then(res => {
        console.log("Returned data:", res.data);
        setProjects(res.data);
    })
    .catch(error => console.error("Fetch error:", error));
    
    }, []);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Link to="/company/projects/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Project</span>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <AnimatedTransition key={project.id} type="fade" delay={index * 100}>
            <Link to={`/company/projects/${project.id}`} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader className="pb-2">
                  <CardTitle>{project.initiative}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.call_to_action}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      // style={{ width: `${project.progress}%` }}
                      style={{ width: '75%' }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {/* Progress: {project.progress}% */}
                    Progress: 75%
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>
                      {project.created_at}
                      {/* {project.updatedAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })} */}
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
