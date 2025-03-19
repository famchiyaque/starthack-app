
import React from 'react';
import { User } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Pencil, MapPin, Link as LinkIcon } from 'lucide-react';
import AnimatedTransition from '@/components/common/AnimatedTransition';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwnProfile }) => {
  return (
    <div className="relative mb-8">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/20 to-secondary rounded-b-lg overflow-hidden relative">
        {isOwnProfile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 bg-background/80 backdrop-blur-sm"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>
      
      {/* Profile Content */}
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
          {/* Avatar */}
          <AnimatedTransition type="scale" className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background overflow-hidden bg-secondary flex items-center justify-center shadow-lg">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl md:text-4xl font-medium text-muted-foreground">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            {isOwnProfile && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </AnimatedTransition>
          
          {/* Profile Info */}
          <div className="flex-1 pt-4 md:pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <AnimatedTransition type="fade" delay={100}>
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  {user.type === 'company' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Company
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      Individual
                    </span>
                  )}
                  <span>Joined {user.createdAt.toLocaleDateString()}</span>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition type="fade" delay={200}>
                {isOwnProfile ? (
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button size="sm">Follow</Button>
                )}
              </AnimatedTransition>
            </div>
            
            <AnimatedTransition type="fade" delay={300} className="mt-4">
              <p className="text-muted-foreground max-w-3xl">
                {user.bio || "No bio provided yet."}
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition type="fade" delay={400} className="mt-4 flex flex-wrap gap-4 text-sm">
              {user.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a 
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </AnimatedTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
