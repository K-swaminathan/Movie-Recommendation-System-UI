import mongoose from 'mongoose';
import Movie from './models/Movie.js';

const testConnection = async () => {
  try {
    // Connection string for MongoDB Compass
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/movie-recommendations';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected Successfully');

    // Add more sample movies
    const sampleMovies = [
      {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genre: ["Crime", "Drama"],
        releaseYear: 1994,
        rating: 8.9,
        imageUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
        duration: 154
      },
      {
        title: "The Matrix",
        description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
        genre: ["Action", "Sci-Fi"],
        releaseYear: 1999,
        rating: 8.7,
        imageUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        director: "Lana and Lilly Wachowski",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        duration: 136
      }
    ];

    // Clear existing movies (optional - comment out if you want to keep existing movies)
    // await Movie.deleteMany({});
    
    // Insert sample movies
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies added successfully');

    // Fetch and display all movies
    const movies = await Movie.find();
    console.log('Total movies in database:', movies.length);
    movies.forEach(movie => {
      console.log(`- ${movie.title} (${movie.releaseYear})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

testConnection(); 