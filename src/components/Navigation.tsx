import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Gamepad2, Tv } from "lucide-react";
import { GenreFilter } from "@/components/GenreFilter";

interface NavigationProps {
  activeTab: 'movies' | 'tv';
  onTabChange: (tab: 'movies' | 'tv') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenres: number[];
  onGenreChange: (genres: number[]) => void;
}

export const Navigation = ({ 
  activeTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange, 
  selectedGenres, 
  onGenreChange 
}: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-10 bg-gradient-cinema border-b border-cinema-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top row: Logo, tabs, search */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-cinema-accent" />
              <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                gast0xC::findGoodies
              </h1>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant={activeTab === 'movies' ? 'default' : 'secondary'}
                onClick={() => onTabChange('movies')}
                className="flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                Movies
              </Button>
              <Button 
                variant={activeTab === 'tv' ? 'default' : 'secondary'}
                onClick={() => onTabChange('tv')}
                className="flex items-center gap-2"
              >
                <Tv className="w-4 h-4" />
                TV Shows
              </Button>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cinema-text-secondary" />
              <Input 
                placeholder="Search movies & shows..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-cinema-card border-cinema-border"
              />
            </div>
          </div>

          {/* Bottom row: Genre filter */}
          <div className="flex justify-start">
            <GenreFilter 
              activeTab={activeTab}
              selectedGenres={selectedGenres}
              onGenreChange={onGenreChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};