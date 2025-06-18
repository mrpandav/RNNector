import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addToFavorite: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromFavorite: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
  clearFavorites,
} = favoriteSlice.actions;

export const selectFavoriteItems = state => state.favorite;

export default favoriteSlice.reducer;
