import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { TrackList } from '../components/TrackList';
import { PlayerControls } from '../components/PlayerControls';
import { AutoplayIndicator } from '../components/AutoplayIndicator';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { useMediaSession } from '../hooks/useMediaSession';
import { Track } from '../types/youtube';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
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
  } = useYouTubePlayer();

  // Enable media session controls
  useMediaSession({
    currentTrack: playerState.currentTrack,
    isPlaying: playerState.isPlaying,
    onPlay: () => !playerState.isPlaying && togglePlayPause(),
    onPause: () => playerState.isPlaying && togglePlayPause(),
    onNext: handleNext,
    onPrevious: handlePrevious,
    onSeek: seekTo,
  });

  const handleTrackSelect = (track: Track, queue: Track[], index: number) => {
    playTrack(track, queue, index);
  };

  const nextTrack = playerState.queue[playerState.currentIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      {/* YouTube Player (hidden) */}
      <div id="youtube-player" style={{ display: 'none' }} />
      
      <Header />

      {/* Autoplay Indicator */}
      <AutoplayIndicator
        isPlaying={playerState.isPlaying}
        currentTrackTitle={playerState.currentTrack?.title}
        nextTrackTitle={nextTrack?.title}
        queueLength={playerState.queue.length}
        currentIndex={playerState.currentIndex}
      />
      
      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Discover <span className="gradient-text">Amazing Music</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Search and stream millions of songs from YouTube with our beautiful music player
          </p>
          
          {!isAPIReady && (
            <div className="mb-8 p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-muted-foreground">Loading YouTube player...</p>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            onResults={setSearchResults}
            isLoading={isSearching}
            setIsLoading={setIsSearching}
          />
        </div>

        {/* Results */}
        <div className="mb-8">
          <TrackList
            tracks={searchResults}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackSelect={handleTrackSelect}
          />
        </div>
      </main>

      {/* Player Controls */}
      <PlayerControls
        playerState={playerState}
        onTogglePlayPause={togglePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onVolumeChange={setVolume}
        onSeek={seekTo}
        onToggleRepeat={toggleRepeat}
        onToggleShuffle={toggleShuffle}
      />
    </div>
  );
};

export default Index;
