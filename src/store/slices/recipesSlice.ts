import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../types';
import { recipesData } from '../../data/recipes';

interface RecipesState {
  allRecipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  selectedServings: number;
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: RecipesState = {
  allRecipes: recipesData,
  filteredRecipes: recipesData,
  selectedRecipe: null,
  selectedServings: 4,
  searchQuery: '',
  selectedCategory: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<string>) => {
      state.selectedRecipe = state.allRecipes.find(recipe => recipe.id === action.payload) || null;
      if (state.selectedRecipe) {
        state.selectedServings = state.selectedRecipe.servings;
      }
    },
    updateServings: (state, action: PayloadAction<number>) => {
      state.selectedServings = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipeIndex = state.allRecipes.findIndex(recipe => recipe.id === action.payload);
      if (recipeIndex !== -1) {
        state.allRecipes[recipeIndex].isFavorite = !state.allRecipes[recipeIndex].isFavorite;
        
        if (state.selectedRecipe?.id === action.payload) {
          state.selectedRecipe.isFavorite = state.allRecipes[recipeIndex].isFavorite;
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredRecipes = filterRecipes(
        state.allRecipes,
        action.payload,
        state.selectedCategory
      );
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.filteredRecipes = filterRecipes(
        state.allRecipes,
        state.searchQuery,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
      state.filteredRecipes = state.allRecipes;
    },
  },
});

const filterRecipes = (
  recipes: Recipe[],
  searchQuery: string,
  category: string | null
): Recipe[] => {
  let filtered = recipes;

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  if (category) {
    filtered = filtered.filter(recipe => recipe.category === category);
  }

  return filtered;
};

export const {
  setSelectedRecipe,
  updateServings,
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} = recipesSlice.actions;

export default recipesSlice.reducer;