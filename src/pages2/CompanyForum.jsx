import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "@/components2/layout/MobileLayout";
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  Heart, 
  Clock, 
  Send, 
  ChevronDown,
  Building 
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CompanyForum = () => {
  const { forumId } = useParams();
  const navigate = useNavigate();
  
  // Mock data for forums
  const forums = [
    {
      id: "1",
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      description: "Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF -  marking a key milestone on the path to decarbonising aviation.",
      members: 428,
      posts: 156,
      projects: [
        { id: 1, title: "Carbon Offset Program", participants: 245 },
        { id: 2, title: "Sustainable Aviation Fuel", participants: 123 },
        { id: 3, title: "Waste Reduction Challenge", participants: 89 }
      ]
    },
    {
      id: "2",
      title: "Epic Sea Change For All",
      company: "Virgin Voyages",
      imageUrl: "https://media.virginvoyages.com/https://www.virginvoyages.com/dam/jcr:44bfcae2-34ca-44f7-a27b-9e753bf16d8a/IMG-DEST-st-croix-Catamaran-Off-Coast-of-St-Croix-share-page-hero-v1-16x9.jpg",
      description: "Virgin Voyages have teamed up with Virgin’s Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.",
      members: 315,
      posts: 98,
      projects: [
        { id: 1, title: "Ocean Plastic Cleanup", participants: 187 },
        { id: 2, title: "Coral Reef Restoration", participants: 156 },
        { id: 3, title: "Sustainable Seafood Initiative", participants: 94 }
      ]
    },
    {
      id: "3",
      title: "Better Connections Plan",
      company: "Virgin Media 02",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
      description: "Community Calling is a pioneering initiative by Virgin Media O2 and environmental charity Hubbub to tackle digital exclusion. It has already rehomed more than 20,000 unused smartphones with people who need them across the country.",
      members: 256,
      posts: 120,
      projects: [
        { id: 1, title: "Digital Inclusion Program", participants: 134 },
        { id: 2, title: "Tech Recycling Initiative", participants: 87 },
        { id: 3, title: "Rural Connectivity Project", participants: 112 }
      ]
    }
  ];
  
  // Mock data for forum posts
  const posts = [
    {
      id: 1,
      user: {
        name: "Ana Martinez", 
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
        role: "Member"
      },
      content: "Amazing reforestation initiative we completed last weekend! We managed to plant more than 200 trees in just two days. Did anyone else participate?",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      images: ["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=500"]
    },
    {
      id: 2,
      user: {
        name: "Carlos Reyes", 
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100",
        role: "Project Leader"
      },
      content: "Reminder: This Saturday we have the Las Palmas beach cleanup. We need volunteers. The company will donate a tree for each kg of plastic collected. We look forward to seeing you!",
      timestamp: "Yesterday",
      likes: 46,
      comments: 15,
      images: []
    },
    {
      id: 3,
      user: {
        name: "Virgin Atlantic", 
        avatar: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=100",
        role: "Company"
      },
      content: "We're announcing our new corporate recycling challenge! Participate and earn double points this month. The first 50 participants will receive a kit of sustainable products.",
      timestamp: "3 days ago",
      likes: 87,
      comments: 32,
      images: ["https://images.unsplash.com/photo-1517925035435-7976539b920d?q=80&w=500"]
    }
  ];
  
  const currentForum = forums.find(forum => forum.id === forumId) || forums[0];
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <MobileLayout>
      <div className="page-container pb-14">
        <div className="flex items-center gap-2 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Company Forum</h1>
        </div>
        
        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
          <img 
            src={currentForum.imageUrl} 
            alt={currentForum.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-white p-1 rounded-full">
                <Building className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-white text-sm font-medium">{currentForum.company}</p>
            </div>
            <h2 className="text-white font-bold text-xl">{currentForum.title}</h2>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-border p-4 mb-6">
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{currentForum.members} members</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{currentForum.posts} posts</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{currentForum.description}</p>
          <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
            Join Forum
          </Button>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            <div className="bg-white rounded-xl border border-border p-4 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-muted-foreground">
                What are you thinking?
              </div>
            </div>
            
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={post.user.avatar} 
                          alt={post.user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">{post.user.name}</h3>
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{post.user.role}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{post.content}</p>
                    
                    {post.images.length > 0 && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img 
                          src={post.images[0]} 
                          alt="Post image" 
                          className="w-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-orange-500">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments} comments</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {post.comments > 0 && (
                    <Accordion type="single" collapsible className="border-t">
                      <AccordionItem value="comments" className="border-b-0">
                        <AccordionTrigger className="py-2 px-4 text-xs text-orange-600">
                          View comments
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <img 
                                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100"
                                  alt="Commenter" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-xs font-medium">Miguel Sanchez</h4>
                                  <span className="text-xs text-muted-foreground">20 min</span>
                                </div>
                                <p className="text-xs">Excellent initiative! I participated last year and it was an incredible experience.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <img 
                                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                                  alt="User avatar" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 relative">
                                <input 
                                  type="text" 
                                  placeholder="Write a comment..." 
                                  className="w-full rounded-full text-xs bg-gray-100 px-4 py-2 pr-9 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">
                                  <Send className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-center py-2">
              <Button variant="ghost" className="text-xs text-muted-foreground flex items-center gap-1">
                Load more <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <h2 className="text-sm font-medium mb-2">Active Projects ({currentForum.projects.length})</h2>
            
            {currentForum.projects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:border-orange-300 transition-all">
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-1">{project.title}</h3>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{project.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="h-3.5 w-3.5" />
                      <span>In progress</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button 
                      className="w-full bg-white text-orange-600 border border-orange-200 hover:bg-orange-50"
                      size="sm"
                    >
                      View details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default CompanyForum;