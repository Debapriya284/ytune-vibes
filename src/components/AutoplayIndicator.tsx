import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';

interface AutoplayIndicatorProps {
  isPlaying: boolean;
  currentTrackTitle?: string;
  nextTrackTitle?: string;
  queueLength: number;
  currentIndex: number;
}

export const AutoplayIndicator: React.FC<AutoplayIndicatorProps> = ({
  isPlaying,
  currentTrackTitle,
  nextTrackTitle,
  queueLength,
  currentIndex,
}) => {
  if (!currentTrackTitle) return null;

  return (
    <div className="fixed top-20 right-6 z-40 glass rounded-xl p-4 max-w-sm">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isPlaying ? (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Pause className="w-4 h-4 text-white fill-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{currentTrackTitle}</p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{currentIndex + 1} of {queueLength}</span>
            {nextTrackTitle && (
              <>
                <SkipForward className="w-3 h-3" />
                <span className="truncate">{nextTrackTitle}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
};