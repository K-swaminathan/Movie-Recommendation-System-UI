import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, ChevronRight } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/ui/MovieGrid';
import { Movie } from '../types/movie';
import { MovieService } from '../services/MovieService';

const FEATURED_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 878, name: 'Science Fiction' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' }
];

const Home: React.FC = () => {
  const { 
    trendingMovies, 
    popularMovies, 
    topRatedMovies, 
    recommendations, 
    getRecommendations,
    isLoading 
  } = useMovies();
  const { isAuthenticated } = useAuth();
  const [genreMovies, setGenreMovies] = useState<Record<number, Movie[]>>({});
  
  // Memoize featured movie to prevent unnecessary re-renders
  const featuredMovie = useMemo(() => 
    trendingMovies && trendingMovies.length > 0 ? trendingMovies[0] : null,
    [trendingMovies]
  );

  // Fetch recommendations only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getRecommendations();
    }
  }, [isAuthenticated, getRecommendations]);

  // Fetch genre movies only once
  useEffect(() => {
    const fetchGenreMovies = async () => {
      const moviesByGenre: Record<number, Movie[]> = {};
      
      for (const genre of FEATURED_GENRES) {
        try {
        const movies = await MovieService.getMoviesByGenre(genre.id);
        moviesByGenre[genre.id] = movies;
        } catch (error) {
          console.error(`Error fetching movies for genre ${genre.name}:`, error);
          moviesByGenre[genre.id] = [];
        }
      }
      
      setGenreMovies(moviesByGenre);
    };

    fetchGenreMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero section with featured movie */}
      {featuredMovie && (
        <section className="relative h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${featuredMovie.imageUrl})`,
              filter: 'brightness(0.3)'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {featuredMovie.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span className="text-white font-medium">{featuredMovie.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-300">{featuredMovie.releaseYear}</span>
                <span className="text-gray-300">{featuredMovie.duration} min</span>
              </div>
              
              <p className="text-gray-300 mb-6 line-clamp-3">
                {featuredMovie.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to={`/movie/${featuredMovie._id}`} className="btn-primary flex items-center">
                  <Play size={18} className="mr-2" />
                  View Details
                </Link>
                <Link to="/browse" className="btn-ghost">
                  Browse More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="container mx-auto px-4 py-12">
        {/* Personalized recommendations (if authenticated) */}
        {isAuthenticated && recommendations && recommendations.length > 0 && (
          <MovieGrid 
            title="Recommended for You" 
            movies={recommendations} 
            isLoading={isLoading} 
          />
        )}

        {/* Trending movies section */}
        <MovieGrid 
          title="Trending Now" 
          movies={trendingMovies} 
          isLoading={isLoading} 
        />

        {/* Popular movies section */}
        <MovieGrid 
          title="Popular Movies" 
          movies={popularMovies} 
          isLoading={isLoading} 
        />

        {/* Top rated section */}
        <MovieGrid 
          title="Top Rated" 
          movies={topRatedMovies} 
          isLoading={isLoading} 
        />

        {/* Genre-specific sections */}
        {FEATURED_GENRES.map(genre => (
          <MovieGrid
            key={genre.id}
            title={`Top in ${genre.name}`}
            movies={genreMovies[genre.id] || []}
            isLoading={!genreMovies[genre.id]}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;