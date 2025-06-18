 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: '1', name: 'Orgenic Banana',subname:'7pcs priceg', price: 10.2, image: require('../assets/images/banana.png') },
    { id: '2', name: 'Apple', price: 20.33, subname:'7pcs priceg',image: require('../assets/images/redapple.png') },
    { id: '3', name: 'Chilli', price: 30.21,subname:'7pcs priceg', image: require('../assets/images/redCillli.png') },
    { id: '4', name: 'Ginger', price: 15.77,subname:'7pcs priceg', image: require('../assets/images/zenjer.png') },
    { id: '5', name: 'Coke', price: 18.48, subname:'7pcs priceg',image: require('../assets/images/coke.png') },
    
    { id: '6', name: 'Beef Bone',subname:'7pcs priceg', price: 22, image: require('../assets/images/beefBon.png') },
  { id: '7', name: 'Chikcen',subname:'7pcs priceg', price: 22.7, image: require('../assets/images/Chikcen.png') },
{ id: '8', name: 'sprite',subname:'7pcs priceg', price: 66, image: require('../assets/images/sprite.png') },
{ id: '9', name: 'Tree top juice apple',subname:'7pcs priceg', price: 11, image: require('../assets/images/appleJuice.png') },
  { id: '10', name: 'Egg Chicken red ',subname:'4pcs priceg', price: 25, image: require('../assets/images/Eggbol.png') },
  { id: '11', name: 'Sample Product',subname:'7pcs priceg', price: 4.22, image: require('../assets/images/Eggwi.png') },
  { id: '12', name: 'Egg pasta',subname:'7pcs priceg', price: 7.11, image: require('../assets/images/EggPasta.png') },
  { id: '13', name: 'Egg Noodels',subname:'7pcs priceg', price: 9.01, image: require('../assets/images/EggNu.png') },
   
  ],
};

const productsSlice = createSlice({
  name: 'products',
  subname:'product',
  initialState,
  reducers: {},
});

export const selectProducts = (state) => state.products.products;
export default productsSlice.reducer;
