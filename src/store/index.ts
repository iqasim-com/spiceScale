import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;