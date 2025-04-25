import React from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-800 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="mb-8"
        >
          <Film size={64} className="text-primary-500" />
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4 text-white">CineVerse</h1>
        
        <div className="w-64 h-2 bg-dark-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "linear"
            }}
            className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
          />
        </div>
        
        <p className="mt-4 text-dark-300">Loading amazing movies for you...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;