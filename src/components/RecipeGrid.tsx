import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

const RecipeGrid: React.FC = () => {
  const filteredRecipes = useSelector((state: RootState) => state.recipes.filteredRecipes);
  const searchQuery = useSelector((state: RootState) => state.recipes.searchQuery);
  const selectedCategory = useSelector((state: RootState) => state.recipes.selectedCategory);
  
  if (filteredRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <img 
          src="https://images.pexels.com/photos/4049444/pexels-photo-4049444.jpeg" 
          alt="No recipes found" 
          className="w-24 h-24 object-cover rounded-full mb-4 opacity-70"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">No recipes found</h3>
        <p className="text-gray-600 max-w-md">
          {searchQuery 
            ? `We couldn't find any recipes matching "${searchQuery}"${selectedCategory ? ' in this category' : ''}.` 
            : 'We couldn\'t find any recipes in this category.'}
        </p>
        <p className="text-gray-600 mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {filteredRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </motion.div>
  );
};

export default RecipeGrid;