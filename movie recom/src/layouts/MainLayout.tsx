import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Home, Compass, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/ui/SearchBar';

const MainLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/browse', label: 'Browse', icon: <Compass size={20} /> },
  ];

  if (isAuthenticated) {
    navLinks.push({ path: '/profile', label: 'Profile', icon: <User size={20} /> });
  }

  return (
    <div className="min-h-screen bg-dark-800 flex flex-col">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-800 shadow-lg' : 'bg-gradient-to-b from-dark-800 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Film className="text-primary-500 mr-2" size={28} />
              <span className="text-2xl font-bold text-white">CineVerse</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium flex items-center transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span className="ml-1">{link.label}</span>
                </Link>
              ))}
              <SearchBar />
              
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    logout();
                    navigate('/signin');
                  }}
                  className="btn-ghost text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/signin" className="btn-primary text-sm">
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <SearchBar />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-4 text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-700 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-2 px-4 rounded-md flex items-center ${
                        location.pathname === link.path
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-300 hover:bg-dark-600'
                      }`}
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </Link>
                  ))}
                  
                  {isAuthenticated ? (
                    <button 
                      onClick={() => {
                        logout();
                        navigate('/signin');
                      }}
                      className="py-2 px-4 rounded-md text-gray-300 hover:bg-dark-600 flex items-center"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link to="/signin" className="py-2 px-4 rounded-md bg-primary-600 text-white flex items-center">
                      Sign In
                    </Link>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <footer className="bg-dark-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Film className="text-primary-500 mr-2" size={24} />
              <span className="text-xl font-bold text-white">CineVerse</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-dark-300 text-sm">
                &copy; {new Date().getFullYear()} CineVerse. All rights reserved.
              </p>
              <p className="text-dark-400 text-xs mt-1">
                Powered by TMDb. This product uses the TMDb API but is not endorsed or certified by TMDb.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;