import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleFavorite } from '../store/slices/recipesSlice';
import { Recipe } from '../types';
import { formatTime } from '../utils/scaling';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipe.id));
  };
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div 
        className="h-48 bg-center bg-cover relative"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute top-2 right-2">
          <button 
            onClick={handleFavoriteClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
            aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              fill={recipe.isFavorite ? "#ef4444" : "none"} 
              className={recipe.isFavorite ? "text-red-500" : "text-gray-600"} 
            />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-500 text-white rounded-full">
            {recipe.category}
          </span>
          <span className="inline-block ml-2 px-3 py-1 text-xs font-semibold bg-white text-gray-800 rounded-full">
            {recipe.region}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={16} />
            <span>{formatTime(totalTime)}</span>
          </div>
          
          <div className="text-sm font-medium">
            <span className="mr-1 text-gray-600">Serves:</span>
            <span className="text-amber-600">{recipe.servings}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;