import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MovieGrid } from "@/components/MovieGrid";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { topMovies, topTVShows } from "@/data/mockData";
import { TMDBService } from "@/services/tmdbService";
import { Movie, TVShow } from "@/types/movie";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [movies, setMovies] = useState<Movie[]>(topMovies);
  const [tvShows, setTvShows] = useState<TVShow[]>(topTVShows);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [dataSource, setDataSource] = useState<'mock' | 'tmdb'>('mock');
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists
    const apiKey = TMDBService.getApiKey();
    setHasApiKey(!!apiKey);
    
    if (apiKey) {
      setDataSource('tmdb');
      loadTMDBData();
    }
  }, []);

  // Clear genres when switching tabs
  useEffect(() => {
    setSelectedGenres([]);
  }, [activeTab]);

  const loadTMDBData = async () => {
    setIsLoading(true);
    try {
      const [moviesData, tvData] = await Promise.all([
        TMDBService.fetchTopMovies(),
        TMDBService.fetchTopTVShows()
      ]);
      
      setMovies(moviesData);
      setTvShows(tvData);
      setDataSource('tmdb');
      
      toast({
        title: "Data Updated",
        description: "Loaded latest data from TMDB",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load TMDB data. Using mock data instead.",
        variant: "destructive",
      });
      setDataSource('mock');
      setMovies(topMovies);
      setTvShows(topTVShows);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySet = () => {
    setHasApiKey(true);
    loadTMDBData();
  };

  const switchToMockData = () => {
    setDataSource('mock');
    setMovies(topMovies);
    setTvShows(topTVShows);
    toast({
      title: "Switched to Mock Data",
      description: "Now showing sample movie data",
    });
  };

  if (!hasApiKey) {
    return <ApiKeyInput onApiKeySet={handleApiKeySet} />;
  }

  const currentItems = activeTab === 'movies' ? movies : tvShows;

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cinema-text-primary mb-2">
              Top Rated {activeTab === 'movies' ? 'Movies' : 'TV Shows'}
            </h2>
            <p className="text-cinema-text-secondary">
              {dataSource === 'tmdb' ? 'Live data from TMDB' : 'Sample movie data'}
            </p>
          </div>
          <div className="flex gap-2">
            {dataSource === 'tmdb' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={loadTMDBData}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  onClick={switchToMockData}
                >
                  Use Sample Data
                </Button>
              </>
            )}
          </div>
        </div>
        
        <MovieGrid 
          items={currentItems} 
          searchQuery={searchQuery}
          selectedGenres={selectedGenres}
          useRealImages={dataSource === 'tmdb'}
        />
      </main>
    </div>
  );
};

export default Index;
