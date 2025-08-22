import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { MediaItem, getTitle, getReleaseYear } from "@/types/movie";
import { getPosterUrl } from "@/data/mockData";

interface MovieCardProps {
  item: MediaItem;
}

export const MovieCard = ({ item }: MovieCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-cinema-border hover:shadow-card-hover transition-smooth cursor-pointer">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={getPosterUrl(item.poster_path)}
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
        <p className="text-xs text-cinema-text-secondary line-clamp-2 opacity-0 group-hover:opacity-100 transition-smooth">
          {item.overview}
        </p>
      </div>
    </Card>
  );
};