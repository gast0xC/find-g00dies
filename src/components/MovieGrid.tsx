import { MovieCard } from "@/components/MovieCard";
import { MediaItem, getTitle } from "@/types/movie";

interface MovieGridProps {
  items: MediaItem[];
  searchQuery: string;
  selectedGenres: number[];
  useRealImages?: boolean;
}

export const MovieGrid = ({ items, searchQuery, selectedGenres, useRealImages = false }: MovieGridProps) => {
  const filteredItems = items.filter(item => {
    // Filter by search query
    const matchesSearch = getTitle(item).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected genres
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genreId => item.genre_ids.includes(genreId));
    
    return matchesSearch && matchesGenres;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-cinema-text-primary mb-2">
          No results found
        </h2>
        <p className="text-cinema-text-secondary">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {filteredItems.map((item) => (
        <MovieCard key={item.id} item={item} useRealImages={useRealImages} />
      ))}
    </div>
  );
};