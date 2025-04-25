import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';

const Profile: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { genres, recommendations, isLoading: moviesLoading } = useMovies();
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    user?.preferences?.favoriteGenres || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    
    // Simulate API call to save profile
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    }, 1000);
  };
  
  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };
  
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile information - left side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/3"
        >
          <div className="bg-dark-700 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              
              {!isEditing ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                  <p className="text-dark-300">{user?.email}</p>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-4 btn-primary text-sm"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-error-600/20 border border-error-500 rounded-md p-3 mb-6 flex items-start">
                <AlertCircle size={20} className="text-error-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-error-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-success-600/20 border border-success-500 rounded-md p-3 mb-6 flex items-start">
                <AlertCircle size={20} className="text-success-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-success-400 text-sm">{success}</p>
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleSaveProfile}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
                      <User size={18} />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input w-full pl-10"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input w-full pl-10"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 mb-3">Favorite Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <button
                        key={genre.id}
                        type="button"
                        onClick={() => toggleGenre(genre.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedGenres.includes(genre.id)
                            ? 'bg-primary-600 text-white'
                            : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className={`btn-primary flex items-center ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Account Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-600 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-500">0</p>
                    <p className="text-dark-300 text-sm">Rated Movies</p>
                  </div>
                  <div className="bg-dark-600 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-500">0</p>
                    <p className="text-dark-300 text-sm">Reviews</p>
                  </div>
                  <div className="bg-dark-600 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-500">0</p>
                    <p className="text-dark-300 text-sm">Watchlist</p>
                  </div>
                  <div className="bg-dark-600 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-500">0</p>
                    <p className="text-dark-300 text-sm">Favorites</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Favorite Genres</h3>
                {user?.preferences?.favoriteGenres && user.preferences.favoriteGenres.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.favoriteGenres.map(genreId => {
                      const genre = genres.find(g => g.id === genreId);
                      return genre ? (
                        <span key={genre.id} className="bg-dark-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-dark-300">No favorite genres selected yet.</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Right side - recommended movies, etc */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-2/3"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Recommendations</h2>
          
          <MovieGrid 
            movies={recommendations} 
            isLoading={moviesLoading} 
          />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Activity</h2>
            <div className="bg-dark-700 rounded-xl p-6">
              <p className="text-dark-300 text-center py-8">You haven't rated any movies yet.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;