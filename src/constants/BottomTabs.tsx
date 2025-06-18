import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../Redux/cartSlice';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const iconSize = 24;

const iconStyle = (focused) => ({
  width: iconSize,
  height: iconSize,
  resizeMode: 'contain',
  tintColor: focused ? '#53B175' : '#181725',
});

const BottomTabs = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: '#181725',
      }}>
      <Tab.Screen
        name="Shop"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/store.png')}
              style={iconStyle(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/Explorei.png')}
              style={iconStyle(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/Carti.png')}
              style={iconStyle(focused)}
            />
          ),
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
            fontSize: 15,
          },
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/Favouritei.png')}
              style={iconStyle(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/Accounti.png')}
              style={[iconStyle(focused), { borderRadius: 12 }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;



//source={require('../assets/images/Explorei.png')}