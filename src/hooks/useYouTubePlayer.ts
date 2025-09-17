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
        autoplay: 1,
      },
      events: {
        onReady: (event: any) => {
          playerRef.current = event.target;
          event.target.setVolume(playerState.volume);
          console.log('YouTube player ready');
        },
        onStateChange: (event: any) => {
          const state = event.data;
          const isPlaying = state === window.YT.PlayerState.PLAYING;
          const isBuffering = state === window.YT.PlayerState.BUFFERING;
          const hasEnded = state === window.YT.PlayerState.ENDED;
          
          console.log('Player state changed:', {
            state,
            isPlaying,
            isBuffering,
            hasEnded,
            currentTrack: playerState.currentTrack?.title
          });
          
          setPlayerState(prev => ({
            ...prev,
            isPlaying,
            isLoading: isBuffering,
          }));

          // Auto-play next track when current track ends
          if (hasEnded) {
            console.log('Track ended, auto-playing next...');
            setTimeout(() => {
              handleNext();
            }, 500); // Small delay to ensure state is updated
          }
        },
        onError: (event: any) => {
          console.error('YouTube player error:', event.data);
          // Skip to next track on error
          setTimeout(() => {
            handleNext();
          }, 1000);
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
  }, [isAPIReady, playerState.isPlaying]);

  const playTrack = useCallback((track: Track, queue: Track[] = [], index: number = 0) => {
    if (!playerRef.current) {
      console.log('Player not ready yet');
      return;
    }

    console.log('Playing track:', track.title, 'at index', index, 'of queue length', queue.length);

    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      queue,
      currentIndex: index,
      isLoading: true,
    }));

    // Load and automatically play the video
    playerRef.current.loadVideoById(track.videoId, 0, 'default');
    
    // Ensure autoplay after load
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    }, 1000);
  }, []);

  const handleNext = useCallback(() => {
    const { queue, currentIndex, repeat, shuffle } = playerState;
    
    console.log('handleNext called:', {
      queueLength: queue.length,
      currentIndex,
      repeat,
      shuffle
    });

    if (queue.length === 0) {
      console.log('No queue available');
      return;
    }

    let nextIndex = currentIndex;

    if (repeat === 'one') {
      // Replay current track
      console.log('Repeating current track');
      if (playerRef.current && playerState.currentTrack) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
      return;
    }

    if (shuffle) {
      const availableIndexes = queue.map((_, i) => i).filter(i => i !== currentIndex);
      if (availableIndexes.length > 0) {
        nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        console.log('Shuffle mode: playing index', nextIndex);
      } else {
        console.log('No more tracks available for shuffle');
        return;
      }
    } else {
      nextIndex = currentIndex + 1;
      console.log('Next index would be:', nextIndex, 'of', queue.length);
      
      if (nextIndex >= queue.length) {
        if (repeat === 'all') {
          nextIndex = 0;
          console.log('Repeat all: going back to start');
        } else {
          console.log('End of queue reached, no repeat');
          // Don't return - let it continue to potentially play next track
          // Instead, keep playing if there are more tracks
          if (queue.length > 1) {
            nextIndex = 0; // Start from beginning
            console.log('Auto-continuing from start of queue');
          } else {
            return;
          }
        }
      }
    }

    if (queue[nextIndex]) {
      console.log('Playing next track:', queue[nextIndex].title);
      playTrack(queue[nextIndex], queue, nextIndex);
    } else {
      console.log('No track found at index:', nextIndex);
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

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (playerState.isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [playerState.isPlaying]);

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