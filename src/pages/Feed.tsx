
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Heart, MessageSquare, Share2 } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';

// Mock data for feed items
const mockFeedItems = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Acme Corp',
      avatar: '',
    },
    title: 'New Product Launch',
    description: 'We are excited to announce our new product line that will revolutionize the industry.',
    image: 'https://picsum.photos/seed/post1/800/400',
    likes: 124,
    comments: 32,
    timestamp: new Date('2023-09-15'),
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Tech Innovators',
      avatar: '',
    },
    title: 'Opening New Office',
    description: 'We are expanding our operations with a new office in San Francisco. Join us for the grand opening!',
    image: 'https://picsum.photos/seed/post2/800/400',
    likes: 89,
    comments: 14,
    timestamp: new Date('2023-09-14'),
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'EcoSolutions',
      avatar: '',
    },
    title: 'Sustainability Initiative',
    description: 'Our company is launching a new sustainability initiative to reduce our carbon footprint.',
    image: 'https://picsum.photos/seed/post3/800/400',
    likes: 256,
    comments: 48,
    timestamp: new Date('2023-09-13'),
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'DesignWorks',
      avatar: '',
    },
    title: 'Portfolio Update',
    description: 'Check out our latest design work for major clients in the finance and healthcare sectors.',
    image: 'https://picsum.photos/seed/post4/800/400',
    likes: 178,
    comments: 26,
    timestamp: new Date('2023-09-12'),
  },
];

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeed, setFilteredFeed] = useState(mockFeedItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredFeed(mockFeedItems);
    } else {
      const filtered = mockFeedItems.filter(item => 
        item.title.toLowerCase().includes(term.toLowerCase()) || 
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.user.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFeed(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-10 -mx-4 bg-background px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feed..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredFeed.map((item, index) => (
          <AnimatedTransition key={item.id} type="fade" delay={index * 100}>
            <Card className="overflow-hidden">
              <div className="aspect-video w-full bg-muted overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <CardHeader className="flex flex-row items-start gap-4">
                <Avatar>
                  <AvatarImage src={item.user.avatar} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{item.user.name}</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">
                      {item.timestamp.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
              
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <Heart className="h-4 w-4" />
                    <span>{item.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <MessageSquare className="h-4 w-4" />
                    <span>{item.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
                
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Connect
                </Button>
              </CardFooter>
            </Card>
          </AnimatedTransition>
        ))}
      </div>
    </div>
  );
};

export default Feed;
