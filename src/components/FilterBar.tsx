import React from 'react';
import { Filter, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, clearFilters } from '../store/slices/recipesSlice';
import { toggleMobileFilter } from '../store/slices/uiSlice';
import { RootState } from '../store';
import { categoriesData } from '../data/categories';
import CategoryPill from './CategoryPill';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.recipes.selectedCategory);
  const isMobileFilterOpen = useSelector((state: RootState) => state.ui.isMobileFilterOpen);
  
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      dispatch(setSelectedCategory(null));
    } else {
      dispatch(setSelectedCategory(categoryId));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleToggleFilter = () => {
    dispatch(toggleMobileFilter());
  };

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 py-3 px-4 md:px-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center mb-2">
        <button 
          onClick={handleToggleFilter}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
        
        {selectedCategory && (
          <button 
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-sm text-red-600"
          >
            <X size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Desktop Filter Bar */}
      <div className={`${isMobileFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2 items-center`}>
        <div className="hidden md:flex items-center mr-2 font-medium text-gray-700">
          <Filter size={16} className="mr-1" />
          <span>Filter:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categoriesData.map(category => (
            <CategoryPill
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
        
        {selectedCategory && (
          <button 
            onClick={handleClearFilters}
            className="hidden md:flex ml-2 items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <X size={16} />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;