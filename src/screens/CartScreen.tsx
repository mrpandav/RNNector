import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../Redux/cartSlice';
import { addOrder } from '../Redux/ordersSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  const increment = id => {
    const item = cartItems.find(i => i.id === id);
    if (item) dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
  };

  const decrement = id => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => dispatch(removeFromCart({ id })),
          },
        ],
        { cancelable: true },
      );
    } else {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveItem = id => {
    Alert.alert(
      'Remove Item',
      'Do you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFromCart({ id })),
        },
      ],
      { cancelable: true },
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    refRBSheet.current.open();
  };

  const placeOrder = () => {
    const orderId = `order_${Date.now()}`;
    const orderDate = new Date().toISOString();

    const order = {
      id: orderId,
      date: orderDate,
      items: cartItems,
      totalPrice,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    refRBSheet.current.close();
    navigation.navigate('Orderaccepted');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
      <Text style={styles.title}>My Cart</Text>
      <View style={styles.divider} />
      <View style={styles.container}>
        <View style={{ flex: 1, width: '100%' }}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty</Text>
          ) : (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetailsScreen', {
                      product: item,
                    })
                  }>
                  <View style={styles.itemWrapper}>
                    <TouchableOpacity
                      onPress={() => handleRemoveItem(item.id)}
                      style={styles.closeIconContainer}>
                      <Iconn name="close" size={20} color="#B3B3B3" />
                    </TouchableOpacity>

                    <View style={styles.item}>
                      <Image source={item.image} style={styles.image} />
                      <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.productsubName}>{item.subname}</Text>
                        <View style={styles.counterRow}>
                          <View style={styles.counter}>
                            <TouchableOpacity
                              onPress={() => decrement(item.id)}
                              style={styles.counterButton}>
                              <Icon name="remove" size={18} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity
                              onPress={() => increment(item.id)}
                              style={[styles.counterButton]}>
                              <Icon name="add" size={18} color="green" />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.price}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.itemDivider} />
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {cartItems.length > 0 && (
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <View style={{ width: 50 }}></View>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.nutritionTag}>
              <Text style={styles.checkoutPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <RBSheet
        ref={refRBSheet}
        height={520}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          draggableIcon: {
            backgroundColor: '#ccc',
          },
        }}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 25, fontWeight: '400', paddingTop: 10 }}>
                Checkout
              </Text>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <Iconn
                  name="close"
                  size={22}
                  color="#000"
                  style={{ paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#E2E2E2',
                alignSelf: 'stretch',
                marginHorizontal: -20,
                marginBottom: 12,
                marginTop: 20,
              }}
            />

            <TouchableOpacity style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Delivery</Text>
              <View style={styles.checkoutRight}>
                <Text style={styles.checkoutValue}>Select Method</Text>
                <Icon name="keyboard-arrow-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Payment</Text>
              <View style={styles.checkoutRight}>
                <Image
                  source={require('../assets/images/cardddd.png')}
                  style={{ width: 30, height: 20, marginRight: 6 }}
                />
                <Icon name="keyboard-arrow-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Promo Code</Text>
              <View style={styles.checkoutRight}>
                <Text style={styles.checkoutValue}>Pick discount</Text>
                <Icon name="keyboard-arrow-right" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Total Cost</Text>
              <View style={styles.checkoutRight}>
                <Text
                  style={[
                    styles.checkoutValue,
                    { fontWeight: 'bold', fontSize: 16, color: '#181725' },
                  ]}>
                  ${totalPrice.toFixed(2)}
                </Text>
                <Icon name="keyboard-arrow-right" size={20} color="#000" />
              </View>
            </View>

            <Text style={styles.termsText}>By placing an order you agree to our </Text>
            <Text style={styles.termsBold}>Terms And Conditions</Text>
          </View>

          <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
     
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:Fonts.GBold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.separatorLine,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  itemDivider: {
    height: 1,
    backgroundColor: colors.separatorLine,
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  itemWrapper: {
    position: 'relative',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
   
    fontSize: 16,
    marginBottom: 2,
    fontFamily:Fonts.GBold,
  },
  productsubName: {
    color: colors.bla,
    fontFamily:Fonts.GBold,
    fontSize: 12,
    marginBottom: 6,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 10,
  },
  counterButton: {
    borderWidth: 1,
    borderColor: colors.separatorLine,
    padding: 6,
    borderRadius: 12,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    
    fontSize: 14,
     
    fontFamily:Fonts.GSemiBold,
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.green,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    height: 60,
  },
  nutritionTag: {
    backgroundColor: colors.ggreen,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutText: {
    color: colors.lightGray,
    fontSize: 20,
     
    fontFamily:Fonts.GBold,
  },
  checkoutPrice: {
   color: colors.lightGray,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.separatorLine,
  },
  checkoutLabel: {
    fontSize: 16,
    color: '#181725',
     fontFamily:Fonts.GMedium,
  },
  checkoutRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutValue: {
    fontSize: 14,
      fontFamily:Fonts.GMedium,
    marginRight: 4,
  },
  termsText: {
    fontSize: 12,
    color: '#7C7C7C',
    marginTop: 12,
     fontFamily:Fonts.GMedium,
  },
  termsBold: {
     
     fontFamily:Fonts.GMedium,
     
  },
  placeOrderButton: {
    backgroundColor: colors.green,
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    
  },
  placeOrderText: {
    color: colors.white,
    fontSize: 20,
     
    fontFamily:Fonts.GBold,
  },
});
