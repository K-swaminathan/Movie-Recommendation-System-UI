import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const sampleMovies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2010,
    rating: 8.8,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    duration: 148
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    rating: 9.0,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: 152
  },
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
  }
];

const initializeDatabase = async () => {
  try {
    // MongoDB connection string
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/movie-recommendations';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully');

    // Clear existing movies
    console.log('Clearing existing movies...');
    await Movie.deleteMany({});
    console.log('Existing movies cleared');

    // Insert sample movies
    console.log('Inserting sample movies...');
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies inserted successfully');

    // Verify the insertion
    const count = await Movie.countDocuments();
    console.log(`Total movies in database: ${count}`);

    const movies = await Movie.find({});
    console.log('Inserted movies:');
    movies.forEach(movie => {
      console.log(`- ${movie.title} (${movie.releaseYear})`);
    });

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the initialization
initializeDatabase(); 