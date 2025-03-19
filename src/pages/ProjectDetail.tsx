
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProgressUpdate from '@/components/projects/ProgressUpdate';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Calendar, 
  Edit, 
  Globe, 
  Heart, 
  MessageCircle, 
  Share2 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

// Mock project data
const mockProject = {
  id: '1',
  title: 'Eco-friendly Packaging Design',
  description: 'Developing sustainable packaging solutions for consumer products that minimize environmental impact. Our team is working on innovative materials and designs that reduce waste while maintaining product integrity and customer experience.',
  image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFja2FnaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  company: {
    id: '101',
    name: 'Green Innovations',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    website: 'https://example.com',
    location: 'San Francisco, CA',
  },
  status: 'in_progress',
  category: 'Design',
  likes: 24,
  comments: 8,
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2023-06-15'),
  progress: 65,
  updates: [
    {
      id: '101',
      content: 'Completed initial research phase and identified three promising sustainable materials for further testing.',
      date: new Date('2023-02-15'),
      progress: 20,
      images: ['https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzZWFyY2glMjBsYWJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    },
    {
      id: '102',
      content: 'Prototype designs for the new packaging have been created and reviewed by the design team. Moving forward with material testing phase.',
      date: new Date('2023-04-10'),
      progress: 45,
      images: ['https://images.unsplash.com/photo-1581091878591-4f0714c6f36f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvdG90eXBlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    },
    {
      id: '103',
      content: 'Material testing complete. Selected bamboo composite as the primary material for our new packaging design. Beginning production setup.',
      date: new Date('2023-06-15'),
      progress: 65,
      images: ['https://images.unsplash.com/photo-1584277261846-c6a1672ed979?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWF0ZXJpYWwlMjB0ZXN0aW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    },
  ],
};

// Mock comments
const mockComments = [
  {
    id: '1',
    user: {
      id: '201',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    content: 'This is an exciting project! Have you considered exploring mycelium-based materials as well?',
    date: new Date('2023-06-12'),
  },
  {
    id: '2',
    user: {
      id: '202',
      name: 'Sarah Lee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    content: 'I love the direction this is going. Would be interested to see how the bamboo composite performs in drop tests compared to traditional packaging.',
    date: new Date('2023-06-14'),
  },
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments);
  
  // In a real app, we would fetch the project data based on projectId
  const project = mockProject;
  
  // Check if project exists
  if (!project) {
    return <Navigate to="/feed" />;
  }
  
  const isOwnProject = user?.type === 'company' && user?.id === project.company.id;
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handlePostComment = () => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      user: {
        id: user?.id || '0',
        name: user?.name || 'Anonymous',
        avatar: user?.avatar,
      },
      content: commentText,
      date: new Date(),
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Project Header */}
        <div className="relative">
          <div className="h-64 md:h-80 w-full overflow-hidden bg-secondary">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/5">
                <span className="text-xl text-muted-foreground">No image</span>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          <AnimatedTransition type="fade" className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <span 
                    className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                      project.status === 'in_progress' 
                        ? 'bg-amber-100 text-amber-800' 
                        : project.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'planning'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {project.status === 'in_progress' 
                      ? 'In Progress' 
                      : project.status === 'completed' 
                      ? 'Completed' 
                      : project.status === 'planning'
                      ? 'Planning'
                      : 'On Hold'}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Started on {project.createdAt.toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border p-4 w-full md:w-64">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Progress</h3>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="rounded-lg border p-4 w-full md:w-64">
                  <a 
                    href={`/company/${project.company.id}`} 
                    className="flex items-center gap-3 mb-4 group"
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-primary/10">
                      {project.company.avatar ? (
                        <img
                          src={project.company.avatar}
                          alt={project.company.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-lg font-medium text-primary">
                            {project.company.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {project.company.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">Company</span>
                    </div>
                  </a>
                  
                  <div className="space-y-2 text-sm">
                    {project.company.location && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{project.company.location}</span>
                      </div>
                    )}
                    {project.company.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={project.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {project.company.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={liked ? "default" : "outline"}
                    className="flex-1"
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {liked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                {isOwnProject && (
                  <Button variant="default">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Project
                  </Button>
                )}
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={100}>
            <Tabs defaultValue="updates" className="mt-8">
              <TabsList>
                <TabsTrigger value="updates" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Updates
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Comments ({comments.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="updates" className="mt-6 space-y-8">
                {isOwnProject && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Post a Progress Update</h3>
                    <ProgressUpdate 
                      projectId={project.id} 
                      currentProgress={project.progress} 
                    />
                  </div>
                )}
                
                <div className="space-y-8">
                  {project.updates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No updates yet</p>
                    </div>
                  ) : (
                    <>
                      {project.updates.map((update, index) => (
                        <AnimatedTransition 
                          key={update.id} 
                          type="fade" 
                          delay={index * 100}
                          className="border rounded-lg p-6 bg-card"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-full overflow-hidden bg-primary/10">
                                {project.company.avatar ? (
                                  <img
                                    src={project.company.avatar}
                                    alt={project.company.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <span className="text-lg font-medium text-primary">
                                      {project.company.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{project.company.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {update.date.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline">
                              Progress: {update.progress}%
                            </Badge>
                          </div>
                          
                          <p className="mb-4">{update.content}</p>
                          
                          {update.images && update.images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              {update.images.map((image, i) => (
                                <div key={i} className="rounded-md overflow-hidden bg-secondary">
                                  <img
                                    src={image}
                                    alt={`Update ${i + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <Heart className="h-4 w-4" />
                              <span>Like</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>Comment</span>
                            </button>
                          </div>
                        </AnimatedTransition>
                      ))}
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="mt-6 space-y-6">
                {isAuthenticated ? (
                  <div className="border rounded-lg p-4 bg-card">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="min-h-20 resize-none"
                        />
                        <div className="flex justify-end">
                          <Button onClick={handlePostComment} disabled={!commentText.trim()}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 border rounded-lg">
                    <p className="text-muted-foreground mb-2">
                      Please sign in to post comments
                    </p>
                    <Button asChild>
                      <a href="/auth/login">Sign In</a>
                    </Button>
                  </div>
                )}
                
                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No comments yet</p>
                    </div>
                  ) : (
                    <>
                      {comments.map((comment, index) => (
                        <AnimatedTransition 
                          key={comment.id} 
                          type="fade" 
                          delay={index * 100}
                          className="border rounded-lg p-4 bg-card"
                        >
                          <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{comment.user.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {comment.date.toLocaleDateString()}
                                </span>
                              </div>
                              <p className="mt-2">{comment.content}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                                <button className="hover:text-primary transition-colors">
                                  Like
                                </button>
                                <button className="hover:text-primary transition-colors">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </AnimatedTransition>
                      ))}
                    </>
                  )}
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

export default ProjectDetail;
