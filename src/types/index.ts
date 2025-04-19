export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  region: 'Pakistani' | 'Indian' | 'Both';
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  isFavorite: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}