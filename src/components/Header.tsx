import React from 'react';
import { Music, Headphones } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">YouTune</h1>
              <p className="text-sm text-muted-foreground">Music Player</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Music className="w-4 h-4" />
            <span>Powered by YouTube</span>
          </div>
        </div>
      </div>
    </header>
  );
};