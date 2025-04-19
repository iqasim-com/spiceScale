import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Ingredient } from '../types';
import { scaleIngredientQuantity, formatQuantity, convertToImperial, convertToMetric } from '../utils/scaling';

interface IngredientListProps {
  ingredients: Ingredient[];
  baseServings: number;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, baseServings }) => {
  const selectedServings = useSelector((state: RootState) => state.recipes.selectedServings);
  const activeUnit = useSelector((state: RootState) => state.ui.activeUnit);
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map(ingredient => {
          // Calculate scaled quantity
          const scaledQuantity = scaleIngredientQuantity(
            ingredient.quantity,
            baseServings,
            selectedServings
          );
          
          // Apply unit conversion if needed
          let displayQuantity = scaledQuantity;
          let displayUnit = ingredient.unit;
          
          if (activeUnit === 'imperial') {
            const converted = convertToImperial(scaledQuantity, ingredient.unit);
            displayQuantity = converted.quantity;
            displayUnit = converted.unit;
          } else if (activeUnit === 'metric') {
            const converted = convertToMetric(scaledQuantity, ingredient.unit);
            displayQuantity = converted.quantity;
            displayUnit = converted.unit;
          }
          
          return (
            <li key={ingredient.id} className="flex items-start">
              <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs mr-3 mt-0.5">•</span>
              <div>
                <span className="font-medium text-amber-700">
                  {formatQuantity(displayQuantity)} {displayUnit}
                </span>
                <span className="text-gray-800 ml-1">{ingredient.name}</span>
                {ingredient.notes && (
                  <span className="text-gray-500 text-sm ml-1">({ingredient.notes})</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;