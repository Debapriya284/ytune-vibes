import React from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Repeat, Shuffle 
} from 'lucide-react';
import { PlayerState } from '../types/youtube';
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

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/30 z-50">
      {/* Thin progress line at very top */}
      <div className="h-0.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleShuffle}
              className={`player-button-secondary ${shuffle ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={onPrevious}
              className="player-button-secondary text-foreground"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlayPause}
              className="player-button text-primary-foreground"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="player-button-secondary text-foreground"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`player-button-secondary relative ${
                repeat !== 'none' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Repeat className="w-4 h-4" />
              {repeat === 'one' && (
                <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-primary text-primary-foreground rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Time + Volume */}
          <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onVolumeChange(volume > 0 ? 0 : 80)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="w-20">
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(v) => onVolumeChange(v[0])}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
