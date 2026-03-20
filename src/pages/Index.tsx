import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { TrackList } from '../components/TrackList';
import { PlayerControls } from '../components/PlayerControls';
import { SuggestedTracks } from '../components/SuggestedTracks';
import { AboutSection } from '../components/AboutSection';
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

  return (
    <div className="min-h-screen bg-background">
      <div id="youtube-player" style={{ display: 'none' }} />
      
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6 pb-28">
        {/* Hero */}
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-foreground">
            Gumu <span className="gradient-text">Player</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-1">
            No Premium Required • Built by a Student
          </p>
          
          {!isAPIReady && (
            <div className="mt-4 p-3 bg-muted rounded-xl text-center">
              <p className="text-sm text-muted-foreground">Loading player...</p>
            </div>
          )}
        </div>

        {/* Now Playing Card */}
        {playerState.currentTrack && (
          <div className="mb-8 p-6 rounded-2xl bg-card border border-border/30 now-playing-glow">
            <div className="flex flex-col items-center text-center">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 mb-4 ${
                playerState.isPlaying ? 'animate-spin-slow' : ''
              }`}>
                <img
                  src={playerState.currentTrack.thumbnail}
                  alt={playerState.currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-foreground truncate max-w-full px-2">
                {playerState.currentTrack.title}
              </h2>
              <p className="text-sm text-muted-foreground">{playerState.currentTrack.artist}</p>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            onResults={setSearchResults}
            isLoading={isSearching}
            setIsLoading={setIsSearching}
          />
        </div>

        {/* Results */}
        <div className="mb-6">
          <TrackList
            tracks={searchResults}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackSelect={handleTrackSelect}
          />
        </div>

        {/* Suggested Tracks */}
        <SuggestedTracks
          currentTrack={playerState.currentTrack}
          isPlaying={playerState.isPlaying}
          onTrackSelect={handleTrackSelect}
        />
      </main>

      <AboutSection />

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
