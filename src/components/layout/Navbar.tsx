
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check if user is logged in - would come from auth context
  const isLoggedIn = false; 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled 
          ? 'bg-background/80 border-b shadow-sm py-3' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          progresso
        </Link>

        {!isMobile ? (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              <NavLinks isLoggedIn={isLoggedIn} />
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <UserActions />
              ) : (
                <AuthButtons />
              )}
            </div>
          </>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background animate-fade-in flex flex-col">
          <div className="flex flex-col p-6 space-y-8">
            <nav className="flex flex-col space-y-6">
              <NavLinks isLoggedIn={isLoggedIn} />
            </nav>
            <div className="flex flex-col space-y-4 mt-auto">
              {isLoggedIn ? (
                <UserActions />
              ) : (
                <div className="flex flex-col space-y-4">
                  <AuthButtons />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = isLoggedIn
    ? [
        { path: '/feed', label: 'Feed' },
        { path: '/explore', label: 'Explore' },
        { path: '/dashboard', label: 'Dashboard' },
      ]
    : [
        { path: '/features', label: 'Features' },
        { path: '/about', label: 'About' },
      ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            'text-sm hover:text-primary transition-colors relative py-1 px-1',
            isActive(item.path)
              ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
              : 'text-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

const UserActions: React.FC = () => {
  return (
    <>
      <Button variant="ghost" size="icon" className="relative" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
      </Button>
      <Link to="/profile">
        <Button className="rounded-full h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center overflow-hidden">
          <span className="text-xs font-medium">JD</span>
        </Button>
      </Link>
    </>
  );
};

const AuthButtons: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Link to="/auth/login" className={cn(isMobile ? 'w-full' : '')}>
        <Button variant="outline" className={cn(isMobile ? 'w-full' : '')}>
          Log in
        </Button>
      </Link>
      <Link to="/auth/register" className={cn(isMobile ? 'w-full' : '')}>
        <Button className={cn(isMobile ? 'w-full' : '')}>Sign up</Button>
      </Link>
    </>
  );
};

export default Navbar;
