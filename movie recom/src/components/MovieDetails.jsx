import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4 p-4 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-4 p-4">
        <p className="text-gray-400">Movie not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Movies
      </button>
      <div className="bg-dark-700 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image+Available';
              }}
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">⭐ {movie.rating}</span>
              <span className="text-gray-400">{movie.releaseYear}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="bg-blue-900 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mb-4">{movie.description}</p>
            <div className="grid grid-cols-2 gap-4 text-gray-400">
              <div>
                <p className="font-semibold">Director</p>
                <p>{movie.director}</p>
              </div>
              <div>
                <p className="font-semibold">Duration</p>
                <p>{movie.duration} minutes</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Cast</p>
                <p>{movie.cast.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 