import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Heart, Share2 } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { Movie } from '../types/movie';
import LoadingScreen from '../components/ui/LoadingScreen';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const { getMovieDetails, rateMovie } = useMovies();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        console.log('Fetching movie details for ID:', id);
        const details = await getMovieDetails(id);
        console.log('Received movie details:', details);
        setMovie(details);
        setUserRating(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, getMovieDetails]);

  const handleRating = async (rating: number) => {
    if (!id || !isAuthenticated) return;
    
    try {
      await rateMovie(id, rating);
      setUserRating(rating);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl text-white mb-4">Movie not found</h2>
        <Link to="/browse" className="btn-primary">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header with backdrop */}
      <div className="relative bg-dark-900">
        {movie.imageUrl && (
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${movie.imageUrl})`,
              filter: 'brightness(0.3)'
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-transparent" />
        
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center md:justify-start"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl w-64 md:w-full max-w-xs">
                <img
                  src={movie.imageUrl || 'https://via.placeholder.com/500x750/1a1a1a/ffffff?text=No+Image'}
                  alt={movie.title}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/500x750/1a1a1a/ffffff?text=No+Image';
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            </motion.div>
            
            {/* Movie info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-2/3 md:pl-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                {movie.genre.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-dark-600 rounded text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center mb-6 text-sm md:text-base">
                <div className="flex items-center mr-6 mb-2">
                  <Star className="text-yellow-400 mr-1" size={18} />
                  <span className="font-medium">{movie.rating.toFixed(1)}/10</span>
                </div>
                
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="text-gray-400 mr-1" size={18} />
                  <span>{movie.duration} min</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Calendar className="text-gray-400 mr-1" size={18} />
                  <span>{movie.releaseYear}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                <div className="flex flex-wrap">
                  <span className="text-gray-300">{movie.director}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.cast.map((person, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-600 mr-3">
                        <div className="w-full h-full flex items-center justify-center text-dark-300">
                          {person.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{person}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {isAuthenticated && (
                  <button className="btn-ghost flex items-center">
                    <Heart size={18} className="mr-2" />
                    Add to Favorites
                  </button>
                )}
                
                <button className="btn-ghost flex items-center">
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
              </div>
              
              {/* User rating section */}
              {isAuthenticated && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-white mb-4">Rate This Movie</h3>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleRating(rating)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full mr-1 transition-colors ${
                          userRating && rating <= userRating
                            ? 'bg-yellow-400 text-dark-800'
                            : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                    {userRating && (
                      <span className="ml-4 text-gray-300">
                        Your rating: {userRating}/10
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;