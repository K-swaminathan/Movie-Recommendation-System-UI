import axios from 'axios';
import { Movie, MovieDetails, Genre, MovieFilterOptions } from '../types/movie';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL
});

export const MovieService = {
  getTrendingMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  },

  getPopularMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data.sort((a: Movie, b: Movie) => b.rating - a.rating);
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data.filter((movie: Movie) => 
        movie.genre.some(g => g.toLowerCase() === genreId.toString().toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  },

  getMoviesByLanguage: async (language: string): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data.filter((movie: Movie) => 
        movie.language?.toLowerCase() === language.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching movies by language:', error);
      return [];
    }
  },

  getFilteredMovies: async (options: MovieFilterOptions): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      let filteredMovies = response.data;

      // Apply search query filter if provided
      if (options.searchQuery) {
        filteredMovies = filteredMovies.filter((movie: Movie) =>
          movie.title.toLowerCase() === options.searchQuery?.toLowerCase()
        );
      }

      // Apply genre filter if provided
      if (options.genres && options.genres.length > 0) {
        filteredMovies = filteredMovies.filter((movie: Movie) =>
          options.genres?.some(genreId => 
            movie.genre.some(g => g.toLowerCase() === genreId.toString().toLowerCase())
          )
        );
      }

      // Apply language filter if provided
      if (options.language) {
        filteredMovies = filteredMovies.filter((movie: Movie) =>
          movie.language?.toLowerCase() === options.language?.toLowerCase()
        );
      }

      // Apply sorting if provided
      if (options.sortBy) {
        filteredMovies.sort((a: Movie, b: Movie) => {
          switch (options.sortBy) {
            case 'popularity.desc':
              return b.rating - a.rating;
            case 'vote_average.desc':
              return b.rating - a.rating;
            case 'release_date.desc':
              return new Date(b.releaseYear).getTime() - new Date(a.releaseYear).getTime();
            default:
              return 0;
          }
        });
      }

      // Apply pagination if provided
      if (options.page) {
        const itemsPerPage = 20;
        const startIndex = (options.page - 1) * itemsPerPage;
        filteredMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);
      }

      return filteredMovies;
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      return [];
    }
  },

  getGenres: async (): Promise<Genre[]> => {
    try {
      const response = await api.get('/movies');
      const allGenres = new Set<string>();
      response.data.forEach((movie: Movie) => {
        movie.genre.forEach(g => allGenres.add(g));
      });
      return Array.from(allGenres).map((name, id) => ({ id, name }));
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data.filter((movie: Movie) => 
        movie.title.toLowerCase() === query.toLowerCase()
      );
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for movie ${id}:`, error);
      throw error;
    }
  },

  getRecommendations: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies');
      return response.data.sort(() => Math.random() - 0.5).slice(0, 10);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  },

  rateMovie: async (movieId: string, rating: number): Promise<void> => {
    try {
      await api.post(`/movies/${movieId}/rate`, { rating });
    } catch (error) {
      console.error(`Error rating movie ${movieId}:`, error);
      throw error;
    }
  }
};