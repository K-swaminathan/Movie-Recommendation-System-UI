import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';
import { Movie, MovieFilterOptions } from '../types/movie';

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getFilteredMovies } = useMovies();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      fetchMovies();
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const options: MovieFilterOptions = {
        searchQuery: query
      };
      
      const results = await getFilteredMovies(options);
      setFilteredMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
      fetchMovies();
    }
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const options: MovieFilterOptions = {};
      const movies = await getFilteredMovies(options);
      setFilteredMovies(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Browse Movies'}
          </h1>
          
          <div className="flex items-center">
            <form onSubmit={handleSubmit} className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pr-12"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-dark-300 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <MovieGrid movies={filteredMovies} isLoading={isLoading} />
      
      {!isLoading && filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-2">No movies found</h3>
          <p className="text-dark-300">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default Browse;