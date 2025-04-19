import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Heart, Home, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, closeMenu } from '../store/slices/uiSlice';
import { RootState } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  
  const handleLinkClick = () => {
    dispatch(closeMenu());
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -300, transition: { duration: 0.2 } }
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-amber-600 hover:text-amber-700 transition-colors"
            >
              <UtensilsCrossed className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">SpiceScale</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`flex items-center text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/') 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Home size={16} className="mr-1" />
                Home
              </Link>
              <Link 
                to="/favorites" 
                className={`flex items-center text-sm font-medium px-2 py-1 rounded transition-colors ${
                  isActive('/favorites') 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Heart size={16} className="mr-1" />
                Favorites
              </Link>
            </nav>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={handleToggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 
                       hover:text-amber-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Main menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg fixed inset-y-0 left-0 z-40 w-64 px-6 py-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/" 
                className="flex items-center text-amber-600"
                onClick={handleLinkClick}
              >
                <UtensilsCrossed className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">SpiceScale</span>
              </Link>
              <button
                onClick={handleToggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-gray-100 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`flex items-center p-2 rounded-md ${
                  isActive('/') 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
                onClick={handleLinkClick}
              >
                <Home size={20} className="mr-2" />
                Home
              </Link>
              <Link 
                to="/favorites" 
                className={`flex items-center p-2 rounded-md ${
                  isActive('/favorites') 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
                onClick={handleLinkClick}
              >
                <Heart size={20} className="mr-2" />
                Favorites
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => dispatch(closeMenu())}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;