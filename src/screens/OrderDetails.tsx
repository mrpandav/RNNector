import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

 

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  const renderItem = ({ item }) => (
  <View style={styles.card}>
    {item.image && (
      <Image
        source={typeof item.image === 'number' ? item.image : { uri: item.image }}
        style={styles.image}
      />
    )}
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subname}>{item.subname}</Text>
      <Text style={styles.info}>Qty: {item.quantity}</Text>
      <Text style={styles.info}>Price: ${item.price.toFixed(2)}</Text>
    </View>
  </View>
);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
     <View style={{ width: 24 }} />  
      </View>

      <FlatList
        data={order.items}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.totalLabel}>Total Price:</Text>
            <Text style={styles.totalValue}>${order.totalPrice.toFixed(2)}</Text>
          </View>
        }
      />
    </View>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
     
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  subname: {
    color: '#555',
    fontSize: 13,
    marginBottom: 6,
  },
  info: {
    fontSize: 13,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
