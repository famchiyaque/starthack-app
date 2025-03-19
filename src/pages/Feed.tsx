
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Grid, List, Search, Sparkles, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

// Mock data for projects in feed
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
  {
    id: '3',
    title: 'Supply Chain Optimization',
    description: 'Implementing new systems to improve efficiency and reduce costs in our global supply chain operations.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwcGx5JTIwY2hhaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    company: {
      id: '103',
      name: 'Logistics Pro',
      avatar: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ycG9yYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    status: 'completed',
    category: 'Operations',
    likes: 18,
    comments: 5,
    updatedAt: new Date('2023-05-28'),
    progress: 100,
  },
  {
    id: '4',
    title: 'Smart Home Security System',
    description: 'Developing an integrated security system for homes with AI-powered threat detection and mobile alerts.',
    image: 'https://images.unsplash.com/photo-1558002038-1055e2dae2c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    company: {
      id: '104',
      name: 'SecureTech',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ycG9yYXRlJTIwYnVpbGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    status: 'in_progress',
    category: 'Technology',
    likes: 32,
    comments: 14,
    updatedAt: new Date('2023-06-05'),
    progress: 45,
  },
  {
    id: '5',
    title: 'Sustainable Office Campus',
    description: 'Designing and building a carbon-neutral office campus with renewable energy sources and green spaces.',
    image: 'https://images.unsplash.com/photo-1545159446-d4004b7da9ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    company: {
      id: '105',
      name: 'EcoArchitects',
      avatar: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjaGl0ZWN0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    status: 'in_progress',
    category: 'Construction',
    likes: 45,
    comments: 19,
    updatedAt: new Date('2023-06-12'),
    progress: 30,
  },
];

// Category filters
const categories = [
  'All Categories',
  'Technology',
  'Design',
  'Operations',
  'Construction',
  'Marketing',
  'Finance',
];

const Feed = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Filter projects based on category and search query
  const filteredProjects = mockProjects.filter(project => {
    const matchesCategory = selectedCategory === 'All Categories' || project.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort projects based on option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'trending':
        return (b.likes + b.comments) - (a.likes + a.comments);
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container px-4 md:px-6 py-8">
          <AnimatedTransition type="fade" className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Project Feed</h1>
                <p className="text-muted-foreground mt-1">
                  Discover and follow project progress from companies
                </p>
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={100} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-auto flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      {categories.map((category) => (
                        <DropdownMenuRadioItem key={category} value={category}>
                          {category}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={sortOption}
                      onValueChange={setSortOption}
                    >
                      <DropdownMenuRadioItem value="recent">
                        Most Recent
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="trending">
                        Trending
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="progress">
                        Progress
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {selectedCategory !== 'All Categories' && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <button 
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setSelectedCategory('All Categories')}
                  >
                    ✕
                  </button>
                </Badge>
              </div>
            )}
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={200}>
            {sortedProjects.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                {sortOption === 'trending' && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Trending Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedProjects.slice(0, 3).map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          delay={index * 100}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
                }>
                  {sortedProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      delay={index * 100}
                      compact={viewMode === 'list'}
                      className={viewMode === 'list' ? "flex flex-col md:flex-row" : ""}
                    />
                  ))}
                </div>
              </>
            )}
          </AnimatedTransition>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;
