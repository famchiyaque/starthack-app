
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import AnimatedTransition from '@/components/common/AnimatedTransition';

const Auth = () => {
  const { action } = useParams();
  const { isAuthenticated } = useAuth();

  // Redirect to feed if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  // Validate auth action
  if (action !== 'login' && action !== 'register') {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Background/Branding */}
      <AnimatedTransition type="fade" className="hidden md:flex md:w-1/2 bg-primary p-8">
        <div className="flex flex-col justify-between h-full text-primary-foreground max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-bold">progresso</h1>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              {action === 'login' 
                ? 'Welcome back' 
                : 'Join our community'}
            </h2>
            <p className="text-xl opacity-90">
              {action === 'login'
                ? 'Log in to continue your journey with project progress tracking and updates.'
                : 'Connect with companies, discover projects, and engage with updates.'}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">For Companies</p>
                <p className="text-sm opacity-80">
                  Share project progress, get feedback, and build your audience.
                </p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">For Individuals</p>
                <p className="text-sm opacity-80">
                  Discover projects, provide feedback, and stay updated on progress.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <p className="opacity-80 text-sm">
              &copy; {new Date().getFullYear()} Progresso. All rights reserved.
            </p>
          </div>
        </div>
      </AnimatedTransition>
      
      {/* Right Side - Auth Form */}
      <AnimatedTransition type="fade" delay={200} className="flex-1 flex items-center justify-center p-6 md:p-8">
        <AuthForm initialMode={action as 'login' | 'register'} />
      </AnimatedTransition>
    </div>
  );
};

export default Auth;
