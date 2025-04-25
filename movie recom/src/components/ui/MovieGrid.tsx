import React from 'react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { Movie } from '../../types/movie';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  isLoading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title,
  isLoading = false 
}) => {
  const gridRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="card animate-pulse bg-dark-700">
          <div className="bg-dark-600 aspect-[2/3]"></div>
          <div className="p-4">
            <div className="h-4 bg-dark-600 rounded mb-2"></div>
            <div className="h-3 bg-dark-600 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="mb-12 relative group">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6 text-white"
        >
          {title}
        </motion.h2>
      )}
      
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark-800/80 hover:bg-dark-700/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <motion.div 
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
        >
          {isLoading 
            ? <LoadingSkeleton /> 
            : movies.map((movie, index) => (
                <div key={movie._id} className="flex-shrink-0 w-64">
                  <MovieCard movie={movie} index={index} />
                </div>
              ))
          }
        </motion.div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark-800/80 hover:bg-dark-700/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;