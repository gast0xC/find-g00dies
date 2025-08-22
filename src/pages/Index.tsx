import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MovieGrid } from "@/components/MovieGrid";
import { topMovies, topTVShows } from "@/data/mockData";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
  const [searchQuery, setSearchQuery] = useState('');

  const currentItems = activeTab === 'movies' ? topMovies : topTVShows;

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cinema-text-primary mb-2">
            Top Rated {activeTab === 'movies' ? 'Movies' : 'TV Shows'}
          </h2>
          <p className="text-cinema-text-secondary">
            Discover the highest-rated content on IMDB
          </p>
        </div>
        
        <MovieGrid items={currentItems} searchQuery={searchQuery} />
      </main>
    </div>
  );
};

export default Index;
