import { useCallback, useEffect, useRef, useState } from 'react';
import { Track, PlayerState } from '../types/youtube';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const useYouTubePlayer = () => {
  const playerRef = useRef<any>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 80,
    currentTime: 0,
    duration: 0,
    queue: [],
    currentIndex: -1,
    isLoading: false,
    repeat: 'none',
    shuffle: false,
  });

  const [isAPIReady, setIsAPIReady] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isAPIReady) return;

    const player = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      playerVars: {
        playsinline: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event: any) => {
          playerRef.current = event.target;
          event.target.setVolume(playerState.volume);
        },
        onStateChange: (event: any) => {
          const state = event.data;
          const isPlaying = state === window.YT.PlayerState.PLAYING;
          const isBuffering = state === window.YT.PlayerState.BUFFERING;
          
          setPlayerState(prev => ({
            ...prev,
            isPlaying,
            isLoading: isBuffering,
          }));

          // Auto-play next track when current track ends
          if (state === window.YT.PlayerState.ENDED) {
            handleNext();
          }
        },
      },
    });

    // Update current time periodically
    const interval = setInterval(() => {
      if (playerRef.current && playerState.isPlaying) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        setPlayerState(prev => ({
          ...prev,
          currentTime,
          duration,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAPIReady]);

  const playTrack = useCallback((track: Track, queue: Track[] = [], index: number = 0) => {
    if (!playerRef.current) return;

    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      queue,
      currentIndex: index,
      isLoading: true,
    }));

    playerRef.current.loadVideoById(track.videoId);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (playerState.isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [playerState.isPlaying]);

  const handleNext = useCallback(() => {
    const { queue, currentIndex, repeat, shuffle } = playerState;
    if (queue.length === 0) return;

    let nextIndex = currentIndex;

    if (repeat === 'one') {
      // Replay current track
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
      return;
    }

    if (shuffle) {
      const availableIndexes = queue.map((_, i) => i).filter(i => i !== currentIndex);
      nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeat === 'all') {
          nextIndex = 0;
        } else {
          return; // End of queue
        }
      }
    }

    if (queue[nextIndex]) {
      playTrack(queue[nextIndex], queue, nextIndex);
    }
  }, [playerState, playTrack]);

  const handlePrevious = useCallback(() => {
    const { queue, currentIndex } = playerState;
    if (queue.length === 0 || currentIndex <= 0) return;

    const prevIndex = currentIndex - 1;
    if (queue[prevIndex]) {
      playTrack(queue[prevIndex], queue, prevIndex);
    }
  }, [playerState, playTrack]);

  const setVolume = useCallback((volume: number) => {
    if (!playerRef.current) return;

    playerRef.current.setVolume(volume);
    setPlayerState(prev => ({ ...prev, volume }));
  }, []);

  const seekTo = useCallback((time: number) => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(time);
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      repeat: prev.repeat === 'none' ? 'all' : prev.repeat === 'all' ? 'one' : 'none',
    }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  return {
    playerState,
    playTrack,
    togglePlayPause,
    handleNext,
    handlePrevious,
    setVolume,
    seekTo,
    toggleRepeat,
    toggleShuffle,
    isAPIReady,
  };
};