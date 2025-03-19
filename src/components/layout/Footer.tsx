
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-semibold tracking-tight">
              progresso
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Connect companies and individuals through project progress updates and meaningful interactions.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
              <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Github className="h-4 w-4" />} label="GitHub" />
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Platform</h5>
            <ul className="space-y-2">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Company</h5>
            <ul className="space-y-2">
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
              <FooterLink href="/partners">Partners</FooterLink>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Legal</h5>
            <ul className="space-y-2">
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/cookies">Cookies</FooterLink>
              <FooterLink href="/licenses">Licenses</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-secondary-foreground/10 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Progresso. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span>Designed with care. Made with Lovable.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ 
  href, 
  icon, 
  label 
}) => {
  return (
    <a 
      href={href}
      className="h-8 w-8 rounded-full bg-secondary-foreground/5 flex items-center justify-center transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ 
  href, 
  children 
}) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
