import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Feather';
import useUserStore from '../store/storageZustand';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

const AccountScreen = () => {
  const [name] = useState('Afsar Hossen');
  const [email] = useState('Imshuvo97@gmail.com');
  const [imageUri] = useState('');
  const navigation = useNavigation();
  const {logout} = useUserStore();

  const menuItems = [
    {icon: require('../assets/images/Ordersicon.png'), label: 'Orders'},
    {icon: require('../assets/images/MyDetailsicon.png'), label: 'My Details'},
    {
      icon: require('../assets/images/Deliceryaddress.png'),
      label: 'Delivery Address',
    },
    {
      icon: require('../assets/images/Paymenticon.png'),
      label: 'Payment Methods',
    },
    {icon: require('../assets/images/PromoCordicon.png'), label: 'Promo Code'},
    {
      icon: require('../assets/images/Notificationicon.png'),
      label: 'Notifications',
    },
    {icon: require('../assets/images/helpicon.png'), label: 'Help'},
    {icon: require('../assets/images/abouticon.png'), label: 'About'},
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel'},
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.rowProfile}>
            <Image
              source={
                imageUri
                  ? {uri: imageUri}
                  : require('../assets/images/Rectangle.png')
              }
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.nameText}>
                {name}  <Iconn name="edit-2" size={13} color={colors.green} />
              </Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                item.label === 'Orders' && styles.topBorder,
              ]}
              onPress={() => {
                if (item.label === 'Orders') {
                  navigation.navigate('Orders');
                }
              }}>
              <View style={styles.menuLeft}>
                <Image source={item.icon} style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.blackte} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Fixed Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={colors.green} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  rowProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
     
    
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 7,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.blackte,
    fontFamily:Fonts.GBold,
  },
  emailText: {
    fontSize: 14,
    color: colors.bla,
    fontFamily:Fonts.GMedium,
  },
  topBorder: {
    borderTopWidth: 0.9,
    borderTopColor: colors.separatorLine,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.9,
    borderBottomColor: colors.separatorLine,
    paddingHorizontal: 20,
     
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  menuLabel: {
    fontSize: 17,
    color: colors.blackte,
    fontFamily:Fonts.GMedium,
  },
  logoutButton: {
    
    backgroundColor: colors.whi,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    height:65,
  },
  logoutText: {
    fontSize: 16,
    color:colors.green,
    flex: 1,
    textAlign: 'center',
    fontFamily:Fonts.GMedium,
  },
});
