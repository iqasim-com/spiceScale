import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { updateServings } from '../store/slices/recipesSlice';
import { toggleUnit } from '../store/slices/uiSlice';
import { RootState } from '../store';

const ServingAdjuster: React.FC = () => {
  const dispatch = useDispatch();
  const selectedServings = useSelector((state: RootState) => state.recipes.selectedServings);
  const activeUnit = useSelector((state: RootState) => state.ui.activeUnit);
  
  const handleDecrement = () => {
    if (selectedServings > 1) {
      dispatch(updateServings(selectedServings - 1));
    }
  };
  
  const handleIncrement = () => {
    dispatch(updateServings(selectedServings + 1));
  };
  
  const handleUnitToggle = () => {
    dispatch(toggleUnit());
  };
  
  return (
    <div className="bg-amber-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <Users size={20} className="text-amber-700 mr-2" />
        <span className="text-gray-800 font-medium">Servings</span>
      </div>
      
      <div className="flex items-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDecrement}
          disabled={selectedServings <= 1}
          className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-300
                   bg-white text-gray-700 hover:text-amber-600 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease servings"
        >
          <Minus size={16} />
        </motion.button>
        
        <div className="w-12 text-center font-bold text-amber-700 mx-2">
          {selectedServings}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleIncrement}
          className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-300
                   bg-white text-gray-700 hover:text-amber-600 transition-colors"
          aria-label="Increase servings"
        >
          <Plus size={16} />
        </motion.button>
      </div>
      
      <button
        onClick={handleUnitToggle}
        className="text-sm px-3 py-1 rounded-md bg-white border border-gray-300
                 text-gray-700 hover:text-amber-600 transition-colors"
      >
        {activeUnit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}
      </button>
    </div>
  );
};

export default ServingAdjuster;