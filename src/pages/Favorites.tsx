import React from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipes.allRecipes);
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
  
  if (favoriteRecipes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-6">
              <Heart size={32} className="text-amber-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any recipes to your favorites. Browse our collection and add some!
            </p>
            
            <Link 
              to="/"
              className="inline-flex items-center px-4 py-2 rounded-md bg-amber-500 text-white 
                        hover:bg-amber-600 transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-amber-500 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Favorite Recipes</h1>
          <p className="text-amber-100">
            Your collection of saved recipes for quick access
          </p>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Favorites;