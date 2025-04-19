import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuOpen: boolean;
  isMobileFilterOpen: boolean;
  activeView: 'grid' | 'list';
  activeUnit: 'metric' | 'imperial';
}

const initialState: UiState = {
  isMenuOpen: false,
  isMobileFilterOpen: false,
  activeView: 'grid',
  activeUnit: 'metric',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleMobileFilter: (state) => {
      state.isMobileFilterOpen = !state.isMobileFilterOpen;
    },
    closeMobileFilter: (state) => {
      state.isMobileFilterOpen = false;
    },
    setActiveView: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.activeView = action.payload;
    },
    toggleUnit: (state) => {
      state.activeUnit = state.activeUnit === 'metric' ? 'imperial' : 'metric';
    }
  },
});

export const {
  toggleMenu,
  closeMenu,
  toggleMobileFilter,
  closeMobileFilter,
  setActiveView,
  toggleUnit
} = uiSlice.actions;

export default uiSlice.reducer;