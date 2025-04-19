import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/slices/recipesSlice';
import { RootState } from '../store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.recipes.searchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search recipes, ingredients..."
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                     transition-all duration-200"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-gray-400" />
        </span>
      </div>
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 
                   text-white py-1 px-3 rounded-md text-sm font-medium transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;