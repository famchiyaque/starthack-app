import React from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components2/layout/MobileLayout";
import { Calendar, CheckCircle, Clock, Users, MessageSquare, Building } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Community = () => {
  const navigate = useNavigate();
  
  // Mock data for companies/forums
  const companyForums = [
    {
      id: 1,
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      description: "Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF -  marking a key milestone on the path to decarbonising aviation.",
      members: 428,
      posts: 156,
    },
    {
      id: 2,
      title: "Epic Sea Change For All",
      company: "Virgin Voyages",
      imageUrl: "https://media.virginvoyages.com/https://www.virginvoyages.com/dam/jcr:44bfcae2-34ca-44f7-a27b-9e753bf16d8a/IMG-DEST-st-croix-Catamaran-Off-Coast-of-St-Croix-share-page-hero-v1-16x9.jpg",
      description: "Virgin Voyages have teamed up with Virgin’s Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.",
      members: 315,
      posts: 98,
    },
    {
      id: 3,
      title: "Better Connections Plan",
      company: "Virgin Media 02",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
      description: "Community Calling is a pioneering initiative by Virgin Media O2 and environmental charity Hubbub to tackle digital exclusion. It has already rehomed more than 20,000 unused smartphones with people who need them across the country.",
      members: 256,
      posts: 120,
    }
  ];

  const handleForumClick = (forumId) => {
    navigate(`/user/community/forum/${forumId}`);
  };

  return (
    <MobileLayout>
      <div className="page-container">
        <Tabs defaultValue="forums" className="w-full mb-6">
          <TabsContent value="forums" className="space-y-4">
            <h2 className="text-center">Communities</h2>
            <div className="space-y-4">
              {companyForums.map((forum) => (
                <Card 
                  key={forum.id} 
                  className="cursor-pointer hover:border-[#DA0630] transition-all"
                  onClick={() => handleForumClick(forum.id)}
                >
                  <CardHeader className="p-4 pb-3 flex flex-row gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={forum.imageUrl} 
                        alt={forum.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-[#DA0630] font-medium flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        {forum.company}
                      </p>
                      <h3 className="font-medium text-sm">{forum.title}</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground mb-3">{forum.description}</p>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-[#DA0630]" />
                        <span>{forum.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-[#DA0630]" />
                        <span>{forum.posts} posts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Community;
