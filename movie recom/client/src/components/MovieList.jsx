import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  const handleImageError = (movieId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const getImageUrl = (movie) => {
    if (imageLoadErrors[movie._id] || !movie.imageUrl) {
      return 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=No+Image';
    }
    return movie.imageUrl;
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list-container">
      <h2 className="section-title">All Movies</h2>
      <div className="movie-scroll-container">
        {movies.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie._id} className="movie-card">
            <div className="image-container">
              <img 
                src={getImageUrl(movie)} 
                alt={movie.title} 
                className="movie-image"
                onError={() => handleImageError(movie._id)}
                loading="lazy"
              />
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList; 