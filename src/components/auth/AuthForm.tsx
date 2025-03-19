
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserTypeSelection from '@/components/common/UserTypeSelection';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth, UserType } from '@/context/AuthContext';
import AnimatedTransition from '@/components/common/AnimatedTransition';

interface AuthFormProps {
  initialMode?: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'select-type'>(initialMode);
  const { userType, setUserType } = useAuth();

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setMode('register');
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <AnimatedTransition type="fade">
            <LoginForm />
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => setMode('select-type')}>
                Sign up
              </Button>
            </div>
          </AnimatedTransition>
        );
      case 'register':
        return (
          <AnimatedTransition type="fade">
            <RegisterForm userType={userType} onBack={() => setMode('select-type')} />
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => setMode('login')}>
                Log in
              </Button>
            </div>
          </AnimatedTransition>
        );
      case 'select-type':
        return (
          <AnimatedTransition type="fade">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium mb-2">Join Progresso</h2>
                <p className="text-muted-foreground">
                  Select your account type to get started
                </p>
              </div>
              <UserTypeSelection onSelect={handleUserTypeSelect} />
              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Already have an account?</span>{' '}
                <Button variant="link" className="p-0 h-auto" onClick={() => setMode('login')}>
                  Log in
                </Button>
              </div>
            </div>
          </AnimatedTransition>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center mb-2">
        <Link to="/" className="inline-block">
          <h1 className="text-2xl font-bold">progresso</h1>
        </Link>
      </div>
      {renderForm()}
    </div>
  );
};

export default AuthForm;
