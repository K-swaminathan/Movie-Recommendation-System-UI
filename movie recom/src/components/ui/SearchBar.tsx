import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { Movie } from '../../types/movie';

const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<number>();
  const { searchMovies } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchMovies(query);
        setResults(searchResults.slice(0, 5)); // Limit to 5 results for the dropdown
      } catch (error) {
        console.error('Error searching movies:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, searchMovies]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setResults([]);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setIsLoading(true);
      const searchResults = await searchMovies(value);
      setResults(searchResults.slice(0, 5)); // Limit to 5 results for the dropdown
      setIsLoading(false);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (movieId: string) => {
    if (!movieId) return;
    navigate(`/movie/${movieId}`);
    setQuery('');
    setIsExpanded(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/92x138/1a1a1a/ffffff?text=No+Image';
    e.currentTarget.onerror = null;
  };

  return (
    <div className="relative z-10">
      <div className="flex items-center">
        <motion.form
          initial={false}
          animate={{ width: isExpanded ? '300px' : '40px' }}
          className="relative"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search movies..."
            className={`input w-full pr-10 ${!isExpanded ? 'opacity-0' : 'opacity-100'}`}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setTimeout(() => setIsExpanded(false), 200) }
          />
          
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-dark-300 hover:text-white transition-colors"
            onClick={() => {
              if (isExpanded) {
                setQuery('');
                setResults([]);
              }
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <X size={18} /> : <Search size={18} />}
          </button>
        </motion.form>
      </div>

      <AnimatePresence>
        {isExpanded && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-dark-700 rounded-md shadow-lg overflow-hidden"
          >
            <ul>
              {results.map(movie => (
                <li key={movie.id} className="border-b border-dark-600 last:border-none">
                  <button
                    className="w-full p-3 text-left hover:bg-dark-600 transition-colors flex items-center"
                    onClick={() => handleResultClick(movie.id)}
                  >
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138/1a1a1a/ffffff?text=No+Image'}
                      alt={movie.title}
                      className="w-10 h-15 object-cover rounded mr-3"
                      onError={handleImageError}
                    />
                    <div>
                      <p className="font-medium text-white">{movie.title}</p>
                      <p className="text-sm text-dark-300">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;