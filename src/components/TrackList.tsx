import React from 'react';
import { Play, Pause, Clock, Music } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Music className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No tracks found</h3>
        <p className="text-muted-foreground">Search for your favorite music above</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const showPlayIcon = !isCurrentTrack || !isPlaying;

        return (
          <div
            key={track.id}
            className={`track-card group cursor-pointer ${isCurrentTrack ? 'ring-2 ring-primary' : ''}`}
            onClick={() => onTrackSelect(track, tracks, index)}
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail with play button overlay */}
              <div className="relative flex-shrink-0">
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-14 h-14 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  {showPlayIcon ? (
                    <Play className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  )}
                </div>
                {isCurrentTrack && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </div>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-foreground'}`}>
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </div>

              {/* Duration */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Visualizer for current playing track */}
            {isCurrentTrack && isPlaying && (
              <div className="flex space-x-1 mt-3 h-8 items-end">
                <div className="visualizer-bar w-1 h-3"></div>
                <div className="visualizer-bar w-1 h-6"></div>
                <div className="visualizer-bar w-1 h-4"></div>
                <div className="visualizer-bar w-1 h-8"></div>
                <div className="visualizer-bar w-1 h-2"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};