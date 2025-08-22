import { Movie, TVShow } from "@/types/movie";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// You'll need to get a free API key from https://www.themoviedb.org/settings/api
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key

interface TMDBResponse<T> {
  results: T[];
  total_pages: number;
  total_results: number;
  page: number;
}

export class TMDBService {
  private static apiKey = API_KEY;

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static getApiKey(): string | null {
    // First try to get from localStorage (user input)
    const userKey = localStorage.getItem('tmdb_api_key');
    if (userKey) return userKey;
    
    // Fall back to hardcoded key
    return this.apiKey !== 'YOUR_TMDB_API_KEY' ? this.apiKey : null;
  }

  static async fetchTopMovies(): Promise<Movie[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('TMDB API key not found. Please set your API key.');
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data: TMDBResponse<Movie> = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching top movies:', error);
      throw error;
    }
  }

  static async fetchTopTVShows(): Promise<TVShow[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('TMDB API key not found. Please set your API key.');
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data: TMDBResponse<TVShow> = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching top TV shows:', error);
      throw error;
    }
  }

  static async searchMovies(query: string): Promise<Movie[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('TMDB API key not found. Please set your API key.');
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data: TMDBResponse<Movie> = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  static async searchTVShows(query: string): Promise<TVShow[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('TMDB API key not found. Please set your API key.');
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/tv?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data: TMDBResponse<TVShow> = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching TV shows:', error);
      throw error;
    }
  }
}

// Updated poster URL function for real TMDB images
export const getRealPosterUrl = (posterPath: string | null, size: string = 'w500'): string => {
  if (!posterPath) return '/placeholder.svg';
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};