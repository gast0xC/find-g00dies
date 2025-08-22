import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter, X } from "lucide-react";
import { movieGenres, tvGenres, Genre } from "@/data/genres";

interface GenreFilterProps {
  activeTab: 'movies' | 'tv';
  selectedGenres: number[];
  onGenreChange: (genres: number[]) => void;
}

export const GenreFilter = ({ activeTab, selectedGenres, onGenreChange }: GenreFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const genres = activeTab === 'movies' ? movieGenres : tvGenres;

  const toggleGenre = (genreId: number) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onGenreChange(newGenres);
  };

  const clearAllGenres = () => {
    onGenreChange([]);
  };

  const getSelectedGenreNames = () => {
    return selectedGenres
      .map(id => genres.find(g => g.id === id)?.name)
      .filter(Boolean) as string[];
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Genres
            {selectedGenres.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedGenres.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-cinema-card border-cinema-border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-cinema-text-primary">Filter by Genre</h4>
              {selectedGenres.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllGenres}>
                  Clear All
                </Button>
              )}
            </div>
            
            <ScrollArea className="h-64">
              <div className="grid grid-cols-2 gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    variant={selectedGenres.includes(genre.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGenre(genre.id)}
                    className="justify-start text-xs"
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected Genre Tags */}
      {selectedGenres.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {getSelectedGenreNames().slice(0, 3).map((genreName) => (
            <Badge 
              key={genreName} 
              variant="secondary" 
              className="flex items-center gap-1 text-xs"
            >
              {genreName}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => {
                  const genre = genres.find(g => g.name === genreName);
                  if (genre) toggleGenre(genre.id);
                }}
              />
            </Badge>
          ))}
          {selectedGenres.length > 3 && (
            <Badge variant="secondary">
              +{selectedGenres.length - 3} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};