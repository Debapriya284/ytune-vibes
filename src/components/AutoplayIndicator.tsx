import React from 'react';

interface AutoplayIndicatorProps {
  isPlaying: boolean;
  currentTrackTitle?: string;
  nextTrackTitle?: string;
  queueLength: number;
  currentIndex: number;
}

export const AutoplayIndicator: React.FC<AutoplayIndicatorProps> = () => {
  return null;
};
