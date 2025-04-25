import mongoose from 'mongoose';
import User from '../models/User.js';

const testUserRegistration = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/movie-recommendations');
    console.log('Connected to MongoDB');

    // Create a test user
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    console.log('Creating test user...');
    const user = new User(testUser);
    await user.save();
    console.log('Test user created successfully');

    // Verify user was saved
    const savedUser = await User.findOne({ email: testUser.email }).select('-password');
    console.log('Saved user data:', savedUser);

    // Count total users
    const totalUsers = await User.countDocuments();
    console.log(`Total users in database: ${totalUsers}`);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.code === 11000) {
      console.log('User already exists. Trying to find the user...');
      const existingUser = await User.findOne({ 
        $or: [
          { email: 'test@example.com' },
          { username: 'testuser' }
        ]
      }).select('-password');
      console.log('Existing user:', existingUser);
    }
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

testUserRegistration(); 