import React from 'react';
import { Music, Headphones, User, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const handleAboutClick = () => {
    // Scroll to about section or navigate to about page
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Gumu Player</h1>
              <p className="text-sm text-muted-foreground">Free Music Streaming</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAboutClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="w-4 h-4 mr-2" />
              About
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Music className="w-4 h-4" />
              <span>Powered by YouTube</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};