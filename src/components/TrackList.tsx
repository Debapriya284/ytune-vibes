import React from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { Track } from '../types/youtube';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track, queue: Track[], index: number) => void;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
}) => {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
          <Music className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-1 text-foreground">Search for music</h3>
        <p className="text-sm text-muted-foreground">Find your favorite songs and start listening</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const showPause = isCurrentTrack && isPlaying;

        return (
          <div
            key={track.id}
            className={`track-card group cursor-pointer flex items-center gap-3 ${
              isCurrentTrack ? 'bg-surface' : ''
            }`}
            onClick={() => onTrackSelect(track, tracks, index)}
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-12 h-12 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                {showPause ? (
                  <Pause className="w-4 h-4 text-primary fill-primary" />
                ) : (
                  <Play className="w-4 h-4 text-primary fill-primary" />
                )}
              </div>
              {isCurrentTrack && isPlaying && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                isCurrentTrack ? 'text-primary' : 'text-foreground'
              }`}>
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <span className="text-xs text-muted-foreground flex-shrink-0">{track.duration}</span>

            {/* Playing indicator */}
            {isCurrentTrack && isPlaying && (
              <div className="flex gap-0.5 items-end h-4">
                <div className="visualizer-bar w-0.5 h-1.5" />
                <div className="visualizer-bar w-0.5 h-3" />
                <div className="visualizer-bar w-0.5 h-2" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
