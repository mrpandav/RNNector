import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrders, deleteOrder, selectOrders } from '../Redux/ordersSlice';

const Orders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const handleClearAllOrders = () => {
    Alert.alert(
      'Clear All Orders',
      'Are you sure you want to delete all orders?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(clearOrders()),
        },
      ]
    );
  };

  const handleDeleteOrder = (orderId) => {
    Alert.alert('Delete Order', 'Are you sure you want to delete this order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteOrder(orderId)),
      },
    ]);
  };

  const renderOrder = ({ item }) => {
    const dateObj = new Date(item.date);
    const date = dateObj.toLocaleDateString();
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const time = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const totalItems = item.items.reduce((sum, i) => sum + i.quantity, 0);

    return (
      <View style={styles.orderCard}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>Date: {date}</Text>
            <Text style={styles.orderText}>Day: {day}</Text>
            <Text style={styles.orderText}>Time: {time}</Text>
            <Text style={styles.orderText}>Total Items: {totalItems}</Text>
            <Text style={styles.orderText}>
              Total Price: ${item.totalPrice.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteOrder(item.id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/images/Number.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Iconn name="chevron-back-sharp" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders</Text>
          {orders.length > 0 ? (
            <TouchableOpacity onPress={handleClearAllOrders} style={styles.iconRight}>
              <Icon name="delete" size={26} color="red" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconRight} />
          )}
        </View>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No orders placed yet.</Text>
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  background: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // marginTop: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  iconRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
    marginRight: 10,
  },
  orderText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 40,
  },
});
