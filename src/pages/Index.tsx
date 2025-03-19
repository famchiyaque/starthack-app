
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/common/AnimatedTransition';
import UserTypeSelection from '@/components/common/UserTypeSelection';
import { useAuth, UserType } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Eye, PenTool, LineChart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { setUserType } = useAuth();
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);

  const handleGetStarted = () => {
    setShowUserTypeSelection(true);
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    navigate('/auth/register');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 mt-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <AnimatedTransition type="fade" className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Share your project's progress with the world
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Connect companies and individuals through transparent project updates and meaningful interactions.
                </p>
              </AnimatedTransition>
              
              <AnimatedTransition type="fade" delay={200} className="w-full max-w-md">
                {showUserTypeSelection ? (
                  <UserTypeSelection onSelect={handleUserTypeSelect} />
                ) : (
                  <Button 
                    size="lg" 
                    className="mt-6 w-full md:w-auto"
                    onClick={handleGetStarted}
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </AnimatedTransition>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <AnimatedTransition type="fade" className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
                Discover how Progresso helps companies and individuals connect through project transparency.
              </p>
            </AnimatedTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <FeatureCard
                icon={<Eye className="h-6 w-6" />}
                title="Transparent Updates"
                description="Companies can share real-time progress updates, giving stakeholders visibility into project development."
                delay={100}
              />
              <FeatureCard
                icon={<PenTool className="h-6 w-6" />}
                title="Interactive Feedback"
                description="Individuals can provide valuable feedback, suggestions, and support for ongoing projects."
                delay={200}
              />
              <FeatureCard
                icon={<LineChart className="h-6 w-6" />}
                title="Progress Tracking"
                description="Visualize project progress over time with intuitive charts and milestone tracking."
                delay={300}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <AnimatedTransition type="fade" className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
                A simple process to connect companies and individuals through project progress.
              </p>
            </AnimatedTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-8">
                <StepCard
                  number="01"
                  title="Create Your Account"
                  description="Sign up as a company to showcase projects or as an individual to discover and interact."
                  delay={100}
                />
                <StepCard
                  number="02"
                  title="Share Project Updates"
                  description="Companies publish regular progress updates with images, milestones, and completion percentages."
                  delay={200}
                />
                <StepCard
                  number="03"
                  title="Engage & Connect"
                  description="Individuals provide feedback, ask questions, and follow projects that interest them."
                  delay={300}
                />
              </div>
              
              <AnimatedTransition type="scale" delay={400} className="rounded-lg overflow-hidden bg-secondary h-[450px] flex items-center justify-center">
                <div className="p-8 text-center">
                  <span className="text-2xl text-muted-foreground">Platform Preview</span>
                </div>
              </AnimatedTransition>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <AnimatedTransition type="fade" className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to start sharing your journey?
                </h2>
                <p className="mt-4 md:text-xl opacity-90">
                  Join our community of companies and individuals collaborating through project progress.
                </p>
              </AnimatedTransition>
              
              <AnimatedTransition type="fade" delay={200}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="mt-6"
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </AnimatedTransition>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ 
  icon,
  title, 
  description,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => (
  <AnimatedTransition 
    type="fade" 
    delay={delay}
    className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </AnimatedTransition>
);

const StepCard = ({ 
  number, 
  title, 
  description,
  delay = 0
}: {
  number: string;
  title: string;
  description: string;
  delay?: number;
}) => (
  <AnimatedTransition 
    type="fade" 
    delay={delay}
    className="flex items-start gap-4"
  >
    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
      <span className="text-lg font-medium">{number}</span>
    </div>
    <div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </AnimatedTransition>
);

export default Index;
