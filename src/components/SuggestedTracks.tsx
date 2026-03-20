import React, { useEffect, useState } from 'react';
import { Play, Pause, Loader2, Sparkles } from 'lucide-react';
import { Track } from '../types/youtube';
import { youtubeService } from '../services/youtube';

interface SuggestedTracksProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track, queue: Track[], index: number) => void;
}

export const SuggestedTracks: React.FC<SuggestedTracksProps> = ({
  currentTrack,
  isPlaying,
  onTrackSelect,
}) => {
  const [suggestions, setSuggestions] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchedId, setLastFetchedId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentTrack || currentTrack.videoId === lastFetchedId) return;

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const tracks = await youtubeService.getRelatedVideos(currentTrack.videoId, 8);
        setSuggestions(tracks);
        setLastFetchedId(currentTrack.videoId);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentTrack?.videoId, lastFetchedId]);

  if (!currentTrack) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Up Next</h3>
        <span className="text-sm text-muted-foreground">
          Based on what you're listening to
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-3 text-muted-foreground text-sm">Finding songs for you...</span>
        </div>
      ) : suggestions.length === 0 ? null : (
        <div className="space-y-1">
          {suggestions.map((track, index) => {
            const isCurrent = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className="track-card group cursor-pointer flex items-center gap-3"
                onClick={() => onTrackSelect(track, suggestions, index)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    {isCurrent && isPlaying ? (
                      <Pause className="w-4 h-4 text-primary fill-primary" />
                    ) : (
                      <Play className="w-4 h-4 text-primary fill-primary" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>

                <span className="text-xs text-muted-foreground flex-shrink-0">{track.duration}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
