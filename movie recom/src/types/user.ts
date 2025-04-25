export interface User {
  id: string;
  email: string;
  username: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteGenres: number[];
  favoriteCast: number[];
  favoriteDirectors: number[];
}

export interface UserRating {
  userId: string;
  movieId: string;
  rating: number;
  timestamp: string;
}

export interface UserReview {
  userId: string;
  movieId: string;
  content: string;
  rating?: number;
  timestamp: string;
}