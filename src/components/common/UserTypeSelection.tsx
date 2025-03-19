
import React from 'react';
import { Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

interface UserTypeSelectionProps {
  onSelect: (type: 'company' | 'individual') => void;
  className?: string;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect, className }) => {
  return (
    <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 w-full max-w-3xl mx-auto', className)}>
      <AnimatedTransition type="slide" direction="left" delay={100}>
        <Button
          variant="outline"
          className="h-auto p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:bg-primary/5 border-2"
          onClick={() => onSelect('company')}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Building className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-medium">Company</h3>
            <p className="text-muted-foreground text-sm">
              Showcase your projects and share progress with the community
            </p>
          </div>
        </Button>
      </AnimatedTransition>

      <AnimatedTransition type="slide" direction="right" delay={200}>
        <Button
          variant="outline"
          className="h-auto p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:bg-primary/5 border-2"
          onClick={() => onSelect('individual')}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-medium">Individual</h3>
            <p className="text-muted-foreground text-sm">
              Discover projects, follow companies, and engage with updates
            </p>
          </div>
        </Button>
      </AnimatedTransition>
    </div>
  );
};

export default UserTypeSelection;
