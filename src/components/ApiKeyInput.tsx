import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TMDBService } from "@/services/tmdbService";
import { Key, ExternalLink } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: () => void;
}

export const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    
    try {
      // Store the API key
      localStorage.setItem('tmdb_api_key', apiKey.trim());
      TMDBService.setApiKey(apiKey.trim());
      
      // Test the API key by making a simple request
      await TMDBService.fetchTopMovies();
      
      toast({
        title: "Success!",
        description: "TMDB API key validated and saved.",
      });
      
      onApiKeySet();
    } catch (error) {
      toast({
        title: "Invalid API Key",
        description: "Please check your TMDB API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cinema flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-cinema-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Key className="w-12 h-12 text-cinema-accent" />
          </div>
          <CardTitle className="text-2xl text-cinema-text-primary">TMDB API Key Required</CardTitle>
          <CardDescription className="text-cinema-text-secondary">
            Enter your TMDB API key to fetch real movie and TV show data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your TMDB API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-cinema-card border-cinema-border"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!apiKey.trim() || isValidating}
            >
              {isValidating ? "Validating..." : "Set API Key"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-cinema-darker rounded-lg border border-cinema-border">
            <h4 className="font-semibold text-cinema-text-primary mb-2">How to get a TMDB API Key:</h4>
            <ol className="text-sm text-cinema-text-secondary space-y-1 list-decimal list-inside">
              <li>Visit <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer" className="text-cinema-accent hover:underline">themoviedb.org</a> and sign up</li>
              <li>Go to your account settings</li>
              <li>Click on "API" in the left sidebar</li>
              <li>Request an API key (it's free!)</li>
              <li>Copy your API key and paste it above</li>
            </ol>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">
                Get API Key <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};