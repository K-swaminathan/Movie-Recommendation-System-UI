import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="movie-card"
    >
      <Link to={`/movie/${movie._id}`} className="block h-full">
        <div className="card movie-card-content h-full flex flex-col">
          <div className="movie-poster aspect-[2/3] relative overflow-hidden">
            <img
              src={movie.imageUrl || 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image'}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark-800 to-transparent h-1/4" />
            <div className="absolute top-2 right-2 bg-dark-800/80 rounded-full px-2 py-1 flex items-center">
              <Star size={14} className="text-yellow-400 mr-1" />
              <span className="text-xs font-medium">{movie.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="font-bold text-white truncate">{movie.title}</h3>
            <p className="text-dark-300 text-sm">{movie.releaseYear}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {movie.genre.map((genre, i) => (
                <span key={i} className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;