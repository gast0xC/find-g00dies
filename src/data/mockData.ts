import { Movie, TVShow } from "@/types/movie";

export const topMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/9cqNxx0GxF0bflyCy3FpPiy3BXg.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 2832000,
    overview: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
    genre_ids: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    release_date: "1972-03-24",
    vote_average: 9.2,
    vote_count: 1954000,
    overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 2762000,
    overview: "When a menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
    genre_ids: [28, 80, 18]
  },
  {
    id: 4,
    title: "The Godfather Part II",
    poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    release_date: "1974-12-20",
    vote_average: 9.0,
    vote_count: 1339000,
    overview: "The early life and career of Vito Corleone in 1920s New York City is portrayed.",
    genre_ids: [18, 80]
  },
  {
    id: 5,
    title: "12 Angry Men",
    poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
    release_date: "1957-04-10",
    vote_average: 9.0,
    vote_count: 845000,
    overview: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    genre_ids: [18]
  },
  {
    id: 6,
    title: "Schindler's List",
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    release_date: "1993-12-15",
    vote_average: 9.0,
    vote_count: 1409000,
    overview: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.",
    genre_ids: [18, 36, 10752]
  }
];

export const topTVShows: TVShow[] = [
  {
    id: 1,
    name: "Breaking Bad",
    poster_path: "/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    first_air_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 1829000,
    overview: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    genre_ids: [18, 80]
  },
  {
    id: 2,
    name: "Planet Earth II",
    poster_path: "/gHu6ea80ActAiEOGsi9z69X9TMN.jpg",
    first_air_date: "2016-11-06",
    vote_average: 9.5,
    vote_count: 234000,
    overview: "Wildlife documentary series with David Attenborough, beginning with a look at the remote islands which offer sanctuary.",
    genre_ids: [99]
  },
  {
    id: 3,
    name: "The Wire",
    poster_path: "/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
    first_air_date: "2002-06-02",
    vote_average: 9.3,
    vote_count: 789000,
    overview: "Baltimore drug scene, seen through the eyes of drug dealers and law enforcement.",
    genre_ids: [80, 18]
  },
  {
    id: 4,
    name: "Avatar: The Last Airbender",
    poster_path: "/9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
    first_air_date: "2005-02-21",
    vote_average: 9.3,
    vote_count: 456000,
    overview: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest.",
    genre_ids: [16, 10759, 10765]
  },
  {
    id: 5,
    name: "Game of Thrones",
    poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    first_air_date: "2011-04-17",
    vote_average: 9.2,
    vote_count: 2234000,
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
    genre_ids: [18, 10759, 10765]
  },
  {
    id: 6,
    name: "The Sopranos",
    poster_path: "/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    first_air_date: "1999-01-10",
    vote_average: 9.2,
    vote_count: 789000,
    overview: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.",
    genre_ids: [18, 80]
  }
];

// Mock poster URLs - in real app, these would come from TMDB API
export const getPosterUrl = (posterPath: string, size: string = 'w500'): string => {
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};