import React, { useEffect, useState } from 'react';
import { hideSplash } from 'react-native-splash-view';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/Redux/store';  

import Welcome from './src/screens/Welcome';
import Singin from './src/screens/Singin';
import Number from './src/screens/Number';
import Verification from './src/screens/Verification';
import SelectLocation from './src/screens/SelectLocation';
import Login from './src/screens/login';
import SignUp from './src/screens/SignUp';
import BottomTabs from './src/constants/BottomTabs';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import BeveragesScreen from './src/screens/Beverages';
import orderaccepted from './src/screens/orderaccepted';
import Orders from './src/screens/Orders';
import OrderDetails from './src/screens/OrderDetails';


import useUserStore from './src/store/storageZustand';

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLogin } = useUserStore();

  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 5000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLogin ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Singin" component={Singin} />
                <Stack.Screen name="Number" component={Number} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="SelectLocation" component={SelectLocation} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={BottomTabs} />
                <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                <Stack.Screen name="BeveragesScreen" component={BeveragesScreen} />
                <Stack.Screen name='Orderaccepted' component={orderaccepted} />
                <Stack.Screen name='Orders' component={Orders}  />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />

              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
