import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { MovieService } from '../services/MovieService';
import { Movie, MovieDetails, Genre, MovieFilterOptions } from '../types/movie';

interface MovieContextType {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  genres: Genre[];
  recommendations: Movie[];
  isLoading: boolean;
  searchMovies: (query: string, filters?: MovieFilterOptions) => Promise<Movie[]>;
  getMovieDetails: (id: string) => Promise<MovieDetails>;
  getRecommendations: () => Promise<Movie[]>;
  rateMovie: (movieId: string, rating: number) => Promise<void>;
  getFilteredMovies: (options: MovieFilterOptions) => Promise<Movie[]>;
}

const MovieContext = createContext<MovieContextType>({} as MovieContextType);

export const useMovies = () => useContext(MovieContext);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cache, setCache] = useState<Record<string, { data: any, timestamp: number }>>({});

  const fetchWithCache = useCallback(async (key: string, fetchFn: () => Promise<any>) => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    
    if (cache[key] && Date.now() - cache[key].timestamp < CACHE_DURATION) {
      return cache[key].data;
    }

    const data = await fetchFn();
    setCache(prev => ({
      ...prev,
      [key]: { data, timestamp: Date.now() }
    }));
    return data;
  }, [cache]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        console.log('🎬 Fetching initial movie data...');
        
        // Fetch all data in parallel with caching
        const [trending, popular, topRated, genreList] = await Promise.all([
          fetchWithCache('trending', MovieService.getTrendingMovies),
          fetchWithCache('popular', MovieService.getPopularMovies),
          fetchWithCache('topRated', MovieService.getTopRatedMovies),
          fetchWithCache('genres', MovieService.getGenres)
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching initial movie data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchWithCache]);

  const searchMovies = async (query: string, filters?: MovieFilterOptions): Promise<Movie[]> => {
    try {
      const results = await fetchWithCache(`search-${query}`, () => MovieService.searchMovies(query));
      if (filters) {
        return MovieService.getFilteredMovies({ ...filters, searchQuery: query });
      }
      return results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  };

  const getMovieDetails = async (id: string): Promise<MovieDetails> => {
    try {
      return await fetchWithCache(`details-${id}`, () => MovieService.getMovieDetails(id));
    } catch (error) {
      console.error(`Error fetching details for movie ${id}:`, error);
      throw error;
    }
  };

  const getRecommendations = async (): Promise<Movie[]> => {
    try {
      const recommendedMovies = await fetchWithCache('recommendations', MovieService.getRecommendations);
      setRecommendations(recommendedMovies);
      return recommendedMovies;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };

  const getFilteredMovies = async (options: MovieFilterOptions): Promise<Movie[]> => {
    try {
      return await fetchWithCache(
        `filtered-${JSON.stringify(options)}`,
        () => MovieService.getFilteredMovies(options)
      );
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      return [];
    }
  };

  const rateMovie = async (movieId: string, rating: number): Promise<void> => {
    try {
      await MovieService.rateMovie(movieId, rating);
      // Invalidate cache for this movie
      setCache(prev => {
        const newCache = { ...prev };
        delete newCache[`details-${movieId}`];
        return newCache;
      });
    } catch (error) {
      console.error(`Error rating movie ${movieId}:`, error);
      throw error;
    }
  };

  const value = {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    genres,
    recommendations,
    isLoading,
    searchMovies,
    getMovieDetails,
    getRecommendations,
    rateMovie,
    getFilteredMovies
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};