import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { MediaItem, getTitle, getReleaseYear, isMovie } from "@/types/movie";
import { getPosterUrl } from "@/data/mockData";
import { getRealPosterUrl } from "@/services/tmdbService";
import { getGenreNames } from "@/data/genres";

interface MovieCardProps {
  item: MediaItem;
  useRealImages?: boolean;
}

export const MovieCard = ({ item, useRealImages = false }: MovieCardProps) => {
  const posterUrl = useRealImages ? getRealPosterUrl(item.poster_path) : getPosterUrl(item.poster_path);
  const genres = getGenreNames(item.genre_ids.slice(0, 2), !isMovie(item));
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-cinema-border hover:shadow-card-hover transition-smooth cursor-pointer">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={posterUrl}
          alt={getTitle(item)}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Rating Badge */}
        <Badge className="absolute top-2 right-2 bg-gradient-gold text-primary-foreground font-bold shadow-glow">
          <Star className="w-3 h-3 mr-1 fill-current" />
          {item.vote_average.toFixed(1)}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-cinema-text-primary mb-1 truncate group-hover:text-cinema-accent transition-smooth">
          {getTitle(item)}
        </h3>
        <p className="text-sm text-cinema-text-secondary mb-2">
          {getReleaseYear(item)}
        </p>
        
        {/* Genre badges */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {genres.map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-xs text-cinema-text-secondary line-clamp-2 opacity-0 group-hover:opacity-100 transition-smooth">
          {item.overview}
        </p>
      </div>
    </Card>
  );
};