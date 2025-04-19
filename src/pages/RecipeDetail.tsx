import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Clock, ChefHat, Bookmark, ArrowLeft, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { setSelectedRecipe, toggleFavorite } from '../store/slices/recipesSlice';
import { RootState } from '../store';
import ServingAdjuster from '../components/ServingAdjuster';
import IngredientList from '../components/IngredientList';
import InstructionsList from '../components/InstructionsList';
import { formatTime } from '../utils/scaling';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const recipe = useSelector((state: RootState) => state.recipes.selectedRecipe);
  
  useEffect(() => {
    if (id) {
      dispatch(setSelectedRecipe(id));
    }
  }, [id, dispatch]);
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Recipe not found</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to recipes
          </button>
        </div>
      </div>
    );
  }
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(recipe.id));
  };
  
  const handlePrintClick = () => {
    window.print();
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Recipe Header with Hero Image */}
      <div 
        className="h-64 md:h-96 bg-center bg-cover relative"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                {recipe.category}
              </span>
              <span className="px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-full">
                {recipe.region}
              </span>
              <span className="px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded-full">
                {recipe.difficulty}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.name}</h1>
            <p className="text-gray-200 text-lg max-w-3xl">{recipe.description}</p>
          </div>
        </div>
        
        <button
          onClick={handleBackClick}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
      </div>
      
      {/* Recipe Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <Clock size={20} className="text-amber-600 mr-2" />
                <span className="text-gray-700">
                  {formatTime(totalTime)}
                </span>
              </div>
              
              <div className="flex items-center">
                <ChefHat size={20} className="text-amber-600 mr-2" />
                <span className="text-gray-700">{recipe.difficulty}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrintClick}
                className="flex items-center px-3 py-1.5 rounded-md border border-gray-300 
                           text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Printer size={16} className="mr-1" />
                <span className="text-sm">Print</span>
              </button>
              
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center px-3 py-1.5 rounded-md ${
                  recipe.isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <Heart 
                  size={16} 
                  className="mr-1" 
                  fill={recipe.isFavorite ? 'white' : 'none'} 
                />
                <span className="text-sm">
                  {recipe.isFavorite ? 'Favorited' : 'Favorite'}
                </span>
              </button>
            </div>
          </div>
          
          <ServingAdjuster />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <IngredientList 
                ingredients={recipe.ingredients} 
                baseServings={recipe.servings}
              />
            </div>
            
            <div className="md:col-span-2">
              <InstructionsList instructions={recipe.instructions} />
            </div>
          </div>
          
          {/* Recipe Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;