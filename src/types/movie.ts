export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[];
  backdrop_path?: string;
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[];
  backdrop_path?: string;
}

export type MediaItem = Movie | TVShow;

export const isMovie = (item: MediaItem): item is Movie => {
  return 'title' in item;
};

export const isTVShow = (item: MediaItem): item is TVShow => {
  return 'name' in item;
};

export const getTitle = (item: MediaItem): string => {
  return isMovie(item) ? item.title : item.name;
};

export const getReleaseYear = (item: MediaItem): string => {
  const date = isMovie(item) ? item.release_date : item.first_air_date;
  return date ? new Date(date).getFullYear().toString() : 'N/A';
};