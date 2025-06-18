import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'; 
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  selectCartItems,
} from '../Redux/cartSlice';
import {
  addToFavorite,
  removeFromFavorite,
  selectFavoriteItems,
} from '../Redux/favoriteSlice';
import Fonts from '../constants/fonts';
import colors from '../constants/colors';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const favoriteItems = useSelector(selectFavoriteItems);

  const cartItem = useMemo(
    () => cartItems.find(item => item.id === product.id),
    [cartItems, product.id]
  );

  const isLiked = useMemo(
    () => favoriteItems.some(item => item.id === product.id),
    [favoriteItems, product.id]
  );

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const [addedToCart, setAddedToCart] = useState(!!cartItem);
  const [showDetail, setShowDetail] = useState(true);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setAddedToCart(true);
    } else {
      setQuantity(1);
      setAddedToCart(false);
    }
  }, [cartItem]);

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeFromFavorite({ id: product.id }));
    } else {
      dispatch(addToFavorite(product));
    }
  };

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(updateQuantity({ id: product.id, quantity: newQty }));
  };

  const decreaseQty = () => {
    if (quantity === 1) {
      dispatch(removeFromCart({ id: product.id }));
      setAddedToCart(false);
      setQuantity(1);
    } else {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ id: product.id, quantity: newQty }));
    }
  };

  const handleAddToBasket = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={[]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            
            <Icon name="arrow-back-ios" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/images/Sheri.png')} 
            style={{width:30,height:30,}}
            />
             
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Product Image */}
          <View style={styles.imageCard}>
            <Image source={product.image} style={styles.image} />
          </View>

          {/* Title + Like */}
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
              <Text style={styles.subtitle}>{product.subname}</Text>
            </View>
            <TouchableOpacity style={styles.heartButton} onPress={handleLike}>
              <AntDesign
                name={isLiked ? 'heart' : 'hearto'}
                size={20}
                color={isLiked ? colors.reed : colors.bla}
              />
            </TouchableOpacity>
          </View>

          {/* Quantity + Price */}
          <View style={styles.row}>
            {addedToCart && (
              <View style={styles.counter}>
                <TouchableOpacity onPress={decreaseQty}>
                  <Icon name="remove" size={30} color={colors.whhi} />
                </TouchableOpacity>
                <View style={styles.countBox}>
                  <Text style={styles.counterText}>{quantity}</Text>
                </View>
                <TouchableOpacity onPress={increaseQty}>
                  <Icon name="add" size={30} color={colors.green} />
                </TouchableOpacity>
              </View>
            ) }
            <Text style={styles.price}>${(product.price).toFixed(2)}</Text>
          </View>

          {/* Detail Section */}
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowDetail(!showDetail)}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Icon
              name={showDetail ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {showDetail && (
            <Text style={styles.detail}>
              Apples are nutritious, may help weight loss and support heart health.
            </Text>
          )}

          {/* Nutrition */}
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text style={{fontFamily:Fonts.GMedium,}}>Nutrions</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.nutritionTag}>
                <Text style={styles.nutritionText}>100gr</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} />
            </View>
          </View>

          {/* Review */}
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text  style={{fontFamily:Fonts.GMedium,}}>Review</Text>
            <TouchableOpacity style={styles.review}>
              <Text style={styles.stars}>★★★★★</Text>
              <Icon name="keyboard-arrow-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Add to Basket Button */}
        {!addedToCart && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToBasket}>
            <Text style={styles.addButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageCard: {
    backgroundColor: colors.whi,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 10,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  scroll: {
    paddingBottom: 120,
    backgroundColor: colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
     
    color: colors.blackte,
     fontFamily:Fonts.GBold, 
  },
  subtitle: {
    fontSize: 13,
    fontFamily:Fonts.GBold, 
    color: colors.bla,
    marginTop: 4,
  },
  heartButton: {
    padding: 6,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 25,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBox: {
    borderWidth: 1,
    borderColor: colors.separatorLine,
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blackte,
  },
  price: {
    fontSize: 18,
     
        color: colors.blackte,
        fontFamily:Fonts.GSemiBold, 
  },
  placeholderBox: {
    width: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 8,
    alignItems: 'center',
     
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackte,
    fontFamily:Fonts.GMedium,
  },
  detail: {
    fontSize: 13,
    color: colors.bla,
    marginHorizontal: 20,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily:Fonts.GMedium,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
   fontFamily:Fonts.GMedium,
    alignItems: 'center',
  },
  nutritionTag: {
    backgroundColor: colors.whi,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionText: {
    color: colors.bla,
    fontWeight: '600',
    fontSize: 12,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 15,
    color: colors.dared,
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.separatorLine,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: colors.green,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 18,
    borderRadius: 19,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily:Fonts.GBold,
  },
});
