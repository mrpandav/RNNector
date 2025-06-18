import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconnn from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from '../Redux/productsSlice';
import { addToCart } from '../Redux/cartSlice';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FS } from '../../scale';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

const { height,width } = Dimensions.get('screen');
const ITEM_WIDTH = (width - 48)/2;

const categoriesData = [
  { id: '1', name: 'Soda', isCheck: false },
  { id: '2', name: 'Juice', isCheck: false },
  { id: '3', name: 'Water', isCheck: false },
];

const categoriesDataa = [
  { id: '1', name: 'Individual Callection', isCheck: false },
  { id: '2', name: 'Juice', isCheck: false },
  { id: '3', name: 'Water', isCheck: false },
  { id: '4', name: 'Soda', isCheck: false },
];

const BeveragesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(categoriesData);
  const [categoriess, setCategoriess] = useState(categoriesDataa);
  const rbRef = useRef();
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleCategory = id => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, isCheck: !cat.isCheck } : cat
      )
    );
  };

  const toggleBrand = id => {
    setCategoriess(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, isCheck: !cat.isCheck } : cat
      )
    );
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetailsScreen', { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subname}>{item.subname}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => dispatch(addToCart(item))}
        >
          <Icon name="add" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftIcon} onPress={() => navigation.goBack()}>
            <Iconnn name="left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Beverages</Text>
          <TouchableOpacity style={styles.rightIcon} onPress={() => rbRef.current.open()}>
            <Iconn name="tune-variant" size={24} color={colors.black}/>
          </TouchableOpacity>
        </View>

        {/* Search */}
           {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image
          source={require('../assets/images/Search.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Store"
          placeholderTextColor={colors.bla}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          renderItem={renderProduct}
        />

        {/* Filter Bottom Sheet */}
        <RBSheet
  ref={rbRef}
  height={height}
  openDuration={250}
  closeOnDragDown={true}
  customStyles={{
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.white,  
      paddingHorizontal: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    draggableIcon: {
      backgroundColor: colors.wwh,
    },
  }}
>
  <View style={{
      flex: 1,
      marginTop:useSafeAreaInsets().top,
      backgroundColor:colors.white,
      
    }}>
       <View style={styles.filterHeader}>
      <TouchableOpacity onPress={() => rbRef.current.close()} style={{marginLeft:20,}}>
        <Icon name="close" size={28} color={colors.black} />
      </TouchableOpacity>
      <Text style={styles.filterTitle}>Filters</Text>
      <View style={{ width: 28 }} />
    </View>
  <View
    style={{
      flex: 1,
    
      backgroundColor: colors.whi,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: 'hidden',
    }}
  >
   

    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 20,
      }}
    >
      {/* Category Filters */}
      <Text style={styles.sectionTitle}>Categories</Text>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          style={styles.checkboxContainer}
          onPress={() => toggleCategory(cat.id)}
        >
          <View
            style={[
              styles.checkbox,
              cat.isCheck && styles.checkboxChecked,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            {cat.isCheck && <Icon name="check" size={15} color={colors.white}  />}
          </View>
          <Text style={styles.checkboxLabel}>{cat.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Brand Filters */}
      <Text style={styles.sectionTitle}>Brand</Text>
      {categoriess.map(cat => (
        <TouchableOpacity
          key={cat.id}
          style={styles.checkboxContainer}
          onPress={() => toggleBrand(cat.id)}
        >
          <View
            style={[
              styles.checkbox,
              cat.isCheck && styles.checkboxChecked,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            {cat.isCheck && <Icon name="check" size={15} color={colors.white}/>}
          </View>
          <Text style={styles.checkboxLabel}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <TouchableOpacity
      style={styles.applyButton}
      onPress={() => rbRef.current.close()}
    >
      <Text style={styles.applyButtonText}>Apply Filter</Text>
    </TouchableOpacity>
  </View>
  </View>
</RBSheet>

      </View>
    </SafeAreaView>
  );
};

export default BeveragesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whi,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 42,
  },
  icon: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.GMedium,
    height: 40,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontFamily:Fonts.GBold,
  },
   
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.bla,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: ITEM_WIDTH,
     
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.separatorLine,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
     
    fontSize: 14,
    marginTop: 10,
    fontFamily:Fonts.GBold,
  },
  subname: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 8,
     fontFamily:Fonts.GBold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  price: {
     
    fontSize: 16,
     fontFamily:Fonts.GSemiBold,
  },
  addButton: {
    backgroundColor: colors.green,
    borderRadius: 11,
    padding: 5,
  },

  // FILTER STYLES
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    
  },
  filterTitle: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    fontFamily:Fonts.GBold,
  },
  sectionTitle: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 16,
    color: colors.black,
    fontFamily:Fonts.GMedium,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.wwh,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.blackte,
    fontFamily:Fonts.GMedium,
  },
  filterFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: colors.whi,
    borderTopWidth: 1,
    borderColor: colors.wwh,
    paddingHorizontal: 16,
  },
  applyButton: {
    backgroundColor:colors.green,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom:30,
     
  },
  applyButtonText: {
    color:colors.white,
     
    
    fontSize: 20,
    fontFamily:Fonts.GBold,
  },
});
