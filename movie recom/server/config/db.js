import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // MongoDB connection string - using 127.0.0.1 instead of localhost
    const MONGODB_URI = 'mongodb://127.0.0.1:27017/movie-recommendations';
    
    // Connection options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(MONGODB_URI, options);
    
    console.log('=================================');
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🖥️  Host: ${conn.connection.host}`);
    console.log(`🚪 Port: ${conn.connection.port}`);
    console.log('=================================');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB; 