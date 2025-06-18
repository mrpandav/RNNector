import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch, batch } from 'react-redux';
import { selectFavoriteItems, clearFavorites } from '../Redux/favoriteSlice';
import { addToCart } from '../Redux/cartSlice';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

const FavouriteScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);

  const handleAddAllToCart = () => {
    if (favoriteItems.length === 0) return;

    Alert.alert(
      'Add All to Cart',
      'Are you sure you want to add all favourite items to cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            batch(() => {
              favoriteItems.forEach(item => {
                dispatch(addToCart(item));
              });
               
            });

            Alert.alert('Success', 'All products added to cart!');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', { product: item })
      }>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.productsubName}>{item.subname}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Icon name="chevron-thin-right" size={20} color={colors.black} />
        </View>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Favourite</Text>
      <View style={styles.divider} />
      <View style={styles.container}>
        {favoriteItems.length === 0 ? (
          <Text style={styles.empty}>No favourites yet!</Text>
        ) : (
          <>
            <FlatList
            showsVerticalScrollIndicator={false}
              data={favoriteItems}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
            <TouchableOpacity
              style={styles.addAllButton}
              onPress={handleAddAllToCart}
            >
              <Text style={styles.addAllText}>Add All to Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  divider: {
    height: 1,
    backgroundColor: colors.separatorLine,
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.black,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'contain',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    
    fontSize: 14,
    marginBottom: 2,
    fontFamily:Fonts.GBold,
  },
  productsubName: {
    color: colors.bla,
    fontFamily:Fonts.GBold,
    fontSize: 12,
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 60,
  },
  price: {
    fontFamily:Fonts.GSemiBold,
    fontSize: 14,
     
  },
  addAllButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: colors.green,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
     
     
  },
  addAllText: {
    color: colors.white,
    fontSize: 20,
    fontFamily:Fonts.GBold,
      
  },
});