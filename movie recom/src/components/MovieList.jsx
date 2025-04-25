import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../services/api';

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({ attempted: false, success: false });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('🔍 Attempting to fetch movies...');
        setDebugInfo(prev => ({ ...prev, attempted: true }));
        
        // Direct fetch to check connection
        const response = await fetch('http://localhost:5000/api/movies');
        console.log('📊 Response status:', response.status);
        const rawData = await response.json();
        console.log('📊 Raw API response:', rawData);
        
        if (!Array.isArray(rawData)) {
          throw new Error('Invalid data format received');
        }
        
        setMovies(rawData);
        setLoading(false);
        setDebugInfo(prev => ({ ...prev, success: true }));
        console.log('✅ Movies fetched successfully:', rawData.length);
      } catch (err) {
        console.error('❌ Error fetching movies:', err);
        setError(err.message || 'Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setDebugInfo({ attempted: false, success: false });
    
    // Force reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900 text-white rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Error Loading Movies</h2>
          <p className="mb-4">{error}</p>
          <div className="bg-gray-800 p-4 rounded mb-4 text-sm overflow-auto">
            <p>Debug Info:</p>
            <p>API Call Attempted: {debugInfo.attempted ? 'Yes' : 'No'}</p>
            <p>API Call Successful: {debugInfo.success ? 'Yes' : 'No'}</p>
            <p>Backend URL: http://localhost:5000/api/movies</p>
          </div>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">No Movies Found</h1>
        <p className="text-gray-400 mb-4">The database might be empty or there was an issue fetching the movies.</p>
        <div className="bg-gray-800 p-4 rounded mb-4 text-sm overflow-auto max-w-lg mx-auto text-left">
          <p>Debug Info:</p>
          <p>API Call Attempted: {debugInfo.attempted ? 'Yes' : 'No'}</p>
          <p>API Call Successful: {debugInfo.success ? 'Yes' : 'No'}</p>
          <p>Movies Received: {movies.length}</p>
          <p>Backend URL: http://localhost:5000/api/movies</p>
        </div>
        <button
          onClick={handleRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Movie Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-dark-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/movies/${movie._id}`)}
          >
            <div className="movie-poster">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  console.log(`Image failed to load: ${movie.imageUrl}`);
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image+Available';
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">{movie.title}</h2>
              <p className="text-gray-400 mb-2 line-clamp-3">{movie.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {movie.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">⭐ {movie.rating}</span>
                <span className="text-gray-400">{movie.releaseYear}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-400">Director: {movie.director}</p>
                <p className="text-sm text-gray-400">Duration: {movie.duration} minutes</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList; 