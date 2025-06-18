import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useUserStore from '../store/storageZustand';
import {useSelector, useDispatch} from 'react-redux';
import {selectProducts} from '../Redux/productsSlice';
import {addToCart} from '../Redux/cartSlice';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const {logout} = useUserStore();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const banners = [
    require('../assets/images/banner.png'),
    require('../assets/images/banner.png'),
    require('../assets/images/banner.png'),
  ];

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % banners.length;
        scrollViewRef.current?.scrollTo({x: width * nextIndex, animated: true});
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Image
            source={require('../assets/images/Group1.png')}
            style={styles.headerImage}
          />
          <View style={styles.locationRow}>
            <Image
              source={require('../assets/images/Exclude.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Image
            source={require('../assets/images/Search.png')}
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder="Search Store"
            placeholderTextColor={(colors.bla)}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.bannerWrapper}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}>
            {banners.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={styles.banner}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.dotContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Sections */}
        {['Exclusive Offer', 'Best Selling'].map(section => (
          <View key={section}>
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>{section}</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}>
              {filteredProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() =>
                    navigation.navigate('ProductDetailsScreen', {product})
                  }>
                  <View style={styles.productCard}>
                    <Image source={product.image} style={styles.productImage} />
                    <Text style={styles.productName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text style={styles.productsubName}>{product.subname}</Text>
                    <View style={styles.priceAndButtonRow}>
                      <Text style={styles.productPrice}>${product.price}</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => dispatch(addToCart(product))}>
                        <Icon name="add" size={25} color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}

        {/* Grocery Section */}
        <View style={styles.offerHeader}>
          <Text style={styles.offerTitle}>Groceries</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groceryContainer}>
          {['#FEEFD0', '#D2F6E4', '#E8F0FB'].map((color, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.groceryCard, {backgroundColor: color}]}>
              <Image
                source={require('../assets/images/Pulses.png')}
                style={styles.groceryImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}>
          {filteredProducts.map(product => (
            <TouchableOpacity
              key={product.id}
              onPress={() =>
                navigation.navigate('ProductDetailsScreen', {product})
              }>
              <View style={styles.productCard}>
                <Image source={product.image} style={styles.productImage} />
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.productsubName}>{product.subname}</Text>
                <View style={styles.priceAndButtonRow}>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => dispatch(addToCart(product))}>
                    <Icon name="add" size={25} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // ─── Header / Top Section ───────────────────────
  top: {
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    color: Colors.blate,
    fontFamily:Fonts.GMedium,
  },
  locationIcon: {
    width: 20,
    height: 17,
    resizeMode: 'contain',
    marginRight: 0,
  },

  // ─── Search Bar ────────────────────────────────
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whi,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    height:40,
  },
  icon: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 12,
fontFamily:Fonts.GMedium,
    
  },

  // ─── Banner Section ───
  bannerWrapper: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  banner: {
    width: 390,
    height: 100,
    borderRadius: 20,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 5,
    backgroundColor: colors.wwh,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.green,
    width: 16,
  },

  // ─── Offer Header Section ───────────────────────
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  offerTitle: {
    fontSize: 24,
     fontFamily:Fonts.GSemiBold,
    color:colors.blackte,
  },
  seeAll: {
    fontSize: 15,
    color: colors.green,
      fontFamily:Fonts.GSemiBold,
  },

  // ─── Product Card Section ───────────────────────
  productsContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  productCard: {
    width: 150,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: colors.separatorLine,
  },
  productImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
      fontFamily:Fonts.GBold,
    fontSize: 14,
    marginTop: 10,
    color: colors.blackte,
  },
  productsubName: {
      fontFamily:Fonts.GMedium,
    color: colors.bla,
    fontSize: 12,
    marginTop:8,
    marginBottom: 10,
  },
  priceAndButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  productPrice: {
     
    fontSize: 16,
    color: colors.blackte,
      fontFamily:Fonts.GBold,
  },
  addButton: {
    backgroundColor: colors.green,
    borderRadius: 11,
    padding: 5,
       
  },

  // ─── Grocery Card Section ───────────────────────
  groceryContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  groceryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 140,
  },
  groceryImage: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
  groceryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackte,
  },

  // ─── Logout   ───────────────
  logoutButton: {
    alignItems: 'flex-end',
    padding: 10,
  },
});
