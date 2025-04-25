export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  releaseYear: number;
  rating: number;
  imageUrl: string;
  director: string;
  cast: string[];
  duration: number;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  poster_path?: string;
  release_date?: string;
}

export interface MovieDetails {
  _id: string;
  title: string;
  description: string;
  rating: number;
  genre: string[];
  releaseYear: number;
  director: string;
  duration: number;
  cast: string[];
  imageUrl: string;
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  overview?: string;
  status?: string;
  videos?: {
    results: Array<{
      site: string;
      type: string;
      key: string;
    }>;
  };
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  similar?: {
    results: Movie[];
  };
  reviews?: {
    results: Array<{
      id: string;
      author: string;
      content: string;
      created_at: string;
      rating?: number;
    }>;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  rating?: number;
}

export interface MovieFilterOptions {
  genres?: number[];
  language?: string;
  sortBy?: 'popularity.desc' | 'vote_average.desc' | 'release_date.desc';
  page?: number;
  searchQuery?: string;
}