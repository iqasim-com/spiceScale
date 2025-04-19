import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeGrid from '../components/RecipeGrid';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Perfectly Scaled Pakistani & Indian Recipes
          </motion.h1>
          
          <motion.p 
            className="text-amber-100 text-md md:text-lg mb-8"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Find authentic recipes and adjust ingredient quantities for any number of people
          </motion.p>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </div>
      
      <FilterBar />
      <RecipeGrid />
    </motion.div>
  );
};

export default Home;