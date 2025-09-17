import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle,
  VolumeX
} from 'lucide-react';
import { Track, PlayerState } from '../types/youtube';
import { Slider } from '@/components/ui/slider';

interface PlayerControlsProps {
  playerState: PlayerState;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerState,
  onTogglePlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onSeek,
  onToggleRepeat,
  onToggleShuffle,
}) => {
  const { currentTrack, isPlaying, volume, currentTime, duration, repeat, shuffle } = playerState;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    onSeek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-border/50 p-4 z-50">
      <div className="max-w-6xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Current track info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium truncate">{currentTrack.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Main controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleShuffle}
              className={`player-button-secondary ${shuffle ? 'text-primary bg-primary/20' : 'text-muted-foreground'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={onPrevious}
              className="player-button-secondary text-foreground hover:text-primary"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlayPause}
              className="player-button text-white hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white ml-1" />
              )}
            </button>

            <button
              onClick={onNext}
              className="player-button-secondary text-foreground hover:text-primary"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`player-button-secondary ${
                repeat !== 'none' ? 'text-primary bg-primary/20' : 'text-muted-foreground'
              }`}
            >
              <Repeat className="w-4 h-4" />
              {repeat === 'one' && (
                <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
            <button
              onClick={() => onVolumeChange(volume > 0 ? 0 : 80)}
              className="text-muted-foreground hover:text-foreground"
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <div className="w-24">
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};