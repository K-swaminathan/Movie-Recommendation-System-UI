import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - image/branding */}
      <div className="hidden md:flex md:w-1/2 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative z-20 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <Film className="text-primary-500 mx-auto mb-6" size={64} />
            <h1 className="text-4xl font-bold text-white mb-4">CineVerse</h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover movies tailored just for you
            </p>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <p className="text-white text-left">Personalized recommendations based on your taste</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <p className="text-white text-left">Track your favorite movies and create watchlists</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <p className="text-white text-left">Join a community of movie enthusiasts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - auth forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-dark-800">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden text-center">
            <Film className="text-primary-500 mx-auto mb-4" size={40} />
            <h1 className="text-2xl font-bold text-white">CineVerse</h1>
          </div>
          
          <Outlet />
          
          <div className="mt-8 text-center">
            <p className="text-dark-300 text-sm">
              &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;