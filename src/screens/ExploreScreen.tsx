import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { FS } from '../../scale';

const categoryData = [
  {
    name: 'Fresh Fruits\n& Vegetable',
    image: require('../assets/images/beefbone.png'),
    color: colors.color1,
  },
  {
    name: 'Cooking Oil\n& Ghee',
    image: require('../assets/images/beefbone2.png'),
    color: colors.color2,
  },
  {
    name: 'Meat & Fish',
    image: require('../assets/images/beefbone4.png'),
    color: colors.color3,
  },
  {
    name: 'Bakery & Snacks',
    image: require('../assets/images/beefbone3.png'),
     color: colors.color4,
  },

  {
    name: 'Beverages',
    image: require('../assets/images/beefbone5.png'),
    color: colors.color5,
  },
  {
    name: 'Dairy & Eggs',
    image: require('../assets/images/beefbone6.png'),
     color: colors.color6,
  },
  {
    name: 'Fresh Fruits\n& Vegetable',
    image: require('../assets/images/beefbone.png'),
     color: colors.color1,
  },
  {
    name: 'Cooking Oil\n& Ghee',
    image: require('../assets/images/beefbone2.png'),
     color: colors.color2,
  },
 
];

const ExploreScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={{flex:1,backgroundColor:(colors.white)}} >

  
    <View style={styles.container}>
      <Text style={styles.title}>Find Products</Text>

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

      {/* Category Grid */}
      <FlatList
        data={categoryData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.colorBox,
              {
                borderColor: item.color,
                backgroundColor: item.color + '20',
              },
            ]}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('BeveragesScreen', {title: item.name})
            }>
            <Image
              source={item.image}
              style={styles.boxImage}
              resizeMode="contain"
            />
            <Text style={styles.boxText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Product Found</Text>
        }
      />
    </View>
      </SafeAreaView>
  );
};

export default ExploreScreen;

const {width} = Dimensions.get('window');
const boxSize = (width - 44) / 2;
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.GBold,
    color: colors.blackte,
    textAlign: 'center',
     
    marginBottom: 30,
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
  grid: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorBox: {
    width: boxSize,
    height: FS(190),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
     
    borderWidth: 1,
  },
  boxImage: {
    width: 120,
    height: 110,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 18,
    fontFamily: Fonts.GBold,
    color: colors.blackte,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
     
    fontSize: 16,
  },
});
