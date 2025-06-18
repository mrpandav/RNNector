import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoriteSlice';
import ordersSlice from './ordersSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
 orders: ordersSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'favorite','orders'],  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
