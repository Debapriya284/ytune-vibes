import axios from 'axios';
import { YouTubeSearchResult, YouTubeVideoDetails, Track } from '../types/youtube';

const API_KEY = 'AIzaSyD_hxG5j3l_R2C1EnYwCh8aBrRDcXTrhhE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export class YouTubeService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || API_KEY;
  }

  async searchVideos(query: string, maxResults: number = 20): Promise<Track[]> {
    try {
      const searchResponse = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          q: `${query} official audio music`,
          type: 'video',
          videoCategoryId: '10', // Music category
          maxResults,
          key: this.apiKey,
        },
      });

      const videoIds = searchResponse.data.items
        .map((item: YouTubeSearchResult) => item.id.videoId)
        .join(',');

      const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,contentDetails',
          id: videoIds,
          key: this.apiKey,
        },
      });

      return this.formatTracks(detailsResponse.data.items);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      throw new Error('Failed to search YouTube. Please check your API key and try again.');
    }
  }

  private formatTracks(videos: YouTubeVideoDetails[]): Track[] {
    return videos.map((video) => ({
      id: `youtube-${video.id}`,
      videoId: video.id,
      title: this.cleanTitle(video.snippet.title),
      artist: video.snippet.channelTitle,
      duration: this.formatDuration(video.contentDetails.duration),
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
    }));
  }

  private cleanTitle(title: string): string {
    // Remove common music video markers
    return title
      .replace(/\(Official Video\)/gi, '')
      .replace(/\(Official Audio\)/gi, '')
      .replace(/\(Lyric Video\)/gi, '')
      .replace(/\(Official Music Video\)/gi, '')
      .replace(/\[Official Video\]/gi, '')
      .replace(/\[Official Audio\]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export const youtubeService = new YouTubeService();