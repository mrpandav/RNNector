import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { items, totalPrice } = action.payload;
      state.orders.push({
        id: Date.now().toString(),
        items,
        date: new Date().toISOString(),
        totalPrice,
      });
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    deleteOrder: (state, action) => {
      const idToDelete = action.payload;
      state.orders = state.orders.filter(order => order.id !== idToDelete);
    },
  },
});

export const { addOrder, clearOrders, deleteOrder } = ordersSlice.actions;
export const selectOrders = (state) => state.orders.orders;
export default ordersSlice.reducer;
