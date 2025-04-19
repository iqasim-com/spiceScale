import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryPillProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ category, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-300 ${
          isActive
            ? 'bg-amber-500 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }
      `}
    >
      <div 
        className="h-6 w-6 rounded-full overflow-hidden bg-center bg-cover"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <span className="font-medium">{category.name}</span>
    </motion.div>
  );
};

export default CategoryPill;