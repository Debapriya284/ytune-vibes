import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Track } from '../types/youtube';
import { youtubeService } from '../services/youtube';
import { useToast } from '@/hooks/use-toast';

interface SearchBarProps {
  onResults: (tracks: Track[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onResults, isLoading, setIsLoading }) => {
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const tracks = await youtubeService.searchVideos(searchQuery, 20);
      onResults(tracks);
      
      if (tracks.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "default"
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search for music",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [onResults, setIsLoading, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for music..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input pl-14 pr-12 text-lg"
            disabled={isLoading}
          />
          {isLoading && (
            <Loader2 className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
          )}
        </div>
      </form>
    </div>
  );
};