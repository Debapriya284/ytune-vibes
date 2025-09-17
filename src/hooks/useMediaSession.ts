import { useEffect } from 'react';
import { Track } from '../types/youtube';

interface MediaSessionHookProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
}

export const useMediaSession = ({
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onSeek,
}: MediaSessionHookProps) => {
  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentTrack) return;

    // Set metadata
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: 'YouTune Player',
      artwork: [
        {
          src: currentTrack.thumbnail,
          sizes: '320x320',
          type: 'image/jpeg',
        },
      ],
    });

    // Set playback state
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

    // Set action handlers
    navigator.mediaSession.setActionHandler('play', onPlay);
    navigator.mediaSession.setActionHandler('pause', onPause);
    navigator.mediaSession.setActionHandler('previoustrack', onPrevious);
    navigator.mediaSession.setActionHandler('nexttrack', onNext);
    
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime) {
        onSeek(details.seekTime);
      }
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const skipTime = details.seekOffset || 10;
      onSeek(Math.max(0, Date.now() / 1000 - skipTime));
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const skipTime = details.seekOffset || 10;
      onSeek(Date.now() / 1000 + skipTime);
    });

  }, [currentTrack, isPlaying, onPlay, onPause, onNext, onPrevious, onSeek]);

  // Update service worker with media info for background processing
  useEffect(() => {
    if (!currentTrack || !navigator.serviceWorker) return;

    navigator.serviceWorker.ready.then((registration) => {
      if (registration.active) {
        registration.active.postMessage({
          type: 'MEDIA_SESSION_UPDATE',
          payload: {
            title: currentTrack.title,
            artist: currentTrack.artist,
            artwork: currentTrack.thumbnail,
          },
        });
      }
    });
  }, [currentTrack]);
};