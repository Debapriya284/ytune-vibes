import React from 'react';
import { Music } from 'lucide-react';

export const Header = () => {
  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/20">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Music className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Gumu</span>
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={scrollToAbout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
        </nav>
      </div>
    </header>
  );
};
