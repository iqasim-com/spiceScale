export const scaleIngredientQuantity = (
  baseQuantity: number,
  baseServings: number,
  targetServings: number
): number => {
  // Prevent division by zero
  if (baseServings === 0) return baseQuantity;
  
  // Calculate the scaling factor
  const scalingFactor = targetServings / baseServings;
  
  // Apply the scaling factor to the quantity
  const scaledQuantity = baseQuantity * scalingFactor;
  
  // Round to 2 decimal places for precision
  return Math.round(scaledQuantity * 100) / 100;
};

export const formatQuantity = (quantity: number): string => {
  // Handle whole numbers
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  }
  
  // Handle common fractions
  if (quantity === 0.25) return "¼";
  if (quantity === 0.5) return "½";
  if (quantity === 0.75) return "¾";
  if (quantity === 0.33 || Math.abs(quantity - 1/3) < 0.01) return "⅓";
  if (quantity === 0.67 || Math.abs(quantity - 2/3) < 0.01) return "⅔";
  
  // For other decimal values, round to 2 decimal places
  return quantity.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

export const convertToImperial = (quantity: number, unit: string): { quantity: number; unit: string } => {
  // Handle common metric to imperial conversions
  switch (unit.toLowerCase()) {
    case 'g':
    case 'grams':
      return { quantity: quantity / 28.35, unit: 'oz' };
    case 'kg':
      return { quantity: quantity * 2.2, unit: 'lb' };
    case 'ml':
    case 'milliliters':
      return { quantity: quantity / 29.57, unit: 'fl oz' };
    case 'l':
    case 'liter':
    case 'liters':
      return { quantity: quantity * 4.227, unit: 'cups' };
    case 'cm':
      return { quantity: quantity / 2.54, unit: 'inch' };
    // If the unit doesn't need conversion or is not recognized, return as is
    default:
      return { quantity, unit };
  }
};

export const convertToMetric = (quantity: number, unit: string): { quantity: number; unit: string } => {
  // Handle common imperial to metric conversions
  switch (unit.toLowerCase()) {
    case 'oz':
    case 'ounce':
    case 'ounces':
      return { quantity: quantity * 28.35, unit: 'g' };
    case 'lb':
    case 'pound':
    case 'pounds':
      return { quantity: quantity * 0.454, unit: 'kg' };
    case 'fl oz':
    case 'fluid ounce':
    case 'fluid ounces':
      return { quantity: quantity * 29.57, unit: 'ml' };
    case 'inch':
    case 'inches':
      return { quantity: quantity * 2.54, unit: 'cm' };
    // If the unit doesn't need conversion or is not recognized, return as is
    default:
      return { quantity, unit };
  }
};