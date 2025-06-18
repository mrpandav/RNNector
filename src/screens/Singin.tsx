import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountryPicker from 'react-native-country-picker-modal';
import B1 from '../assets/images/Singin.png';
import colors from '../constants/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  Profile,
} from 'react-native-fbsdk-next';
import useUserStore from '../store/storageZustand';

const { width, height } = Dimensions.get('window');



const Singin = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('BD');
  const [country, setCountry] = useState({
    cca2: 'BD',
    callingCode: ['880'],
  });
  const { setUser } = useUserStore();
  
  const handleNumber = () => {
    navigation.navigate('Number');
  };

  // Handlers for each button click
  const handleEmailLogin = () => {
    console.log("Continue with Email");
    navigation.navigate('Login')
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '827591450683-cjhhfi1tt722g0v64flv735rfujcnl07.apps.googleusercontent.com', // Web client ID
      iosClientId: '827591450683-3a9n30d884es40li4lhmkj8bj3t7usgf.apps.googleusercontent.com', // iOS client ID
      
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Required for Android
      const userInfo = await GoogleSignin.signIn();
      
      console.log('User Info:', userInfo);
  
      const { idToken } = await GoogleSignin.getTokens(); // You can send this to your backend
  
      // Example of what you get
      // userInfo.user.name
      // userInfo.user.email
      // userInfo.user.photo
      // idToken
  
      // Optionally, navigate or save user data locally
      navigation.navigate('Home'); // Change this to your target screen
    } catch (error) {
      // console.error('Google Sign-In error:', error);
    }
  };

    const handleFacebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) throw new Error('AccessToken not available');

    const profile = await Profile.getCurrentProfile();

    setUser({
      username: profile?.name || '',
      email: '',
      password: '',
      uid: profile?.userID || '',
    });

    // No manual navigation
  } catch (error) {
    // Alert.alert('Facebook Login Error', error.message);
    console.error(error);
  }
};

  return (
    <ImageBackground source={B1} style={styles.background} resizeMode="stretch">
      <View style={styles.overlay}>
        <View style={styles.bottomContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>Get your groceries</Text>
            <Text style={styles.heading}>with nectar</Text>
          </View>

          <TouchableOpacity style={styles.inputContainer} onPress={handleNumber}>
            <CountryPicker
              withFilter
              withFlag
              withCallingCode
              withEmoji
              countryCode={countryCode}
              onSelect={country => {
                setCountryCode(country.cca2);
                setCountry(country);
              }}
            />
              <Text style={styles.codeText}>+{country?.callingCode?.[0] ?? '880'}</Text>
          </TouchableOpacity>

           

          <Text style={styles.socialText}>Or connect with social media</Text>

           
          <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
            <Icon name="envelope" size={20} color={colors.white} style={styles.icon} />
            <View style={styles.textWrapperCentered}>
              <Text style={styles.buttonText}>Continue with Email</Text>
            </View>
          </TouchableOpacity>

        
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleLogin}>
            <Icon name="google" size={20} color={colors.white} style={styles.icon} />
            <View style={styles.textWrapperCentered}>
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

       
          <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebookLogin}>
            <Icon name="facebook" size={20} color={colors.white} style={styles.icon} />
            <View style={styles.textWrapperCentered}>
              <Text style={styles.buttonText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Singin;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    
  },
  bottomContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    
    marginTop:250,
     
  },
  textWrapper: {
    marginBottom: 20,
   
  },
  heading: {
    fontSize: 25,
    color: colors.blacktext,
    fontFamily: 'Gilroy',
    fontWeight:'500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth:1,
    borderColor:colors.separatorLine,
  },
  codeText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: colors.blacktext,
  },
  
  socialText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.shadow,
    fontWeight: '400',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: width * 0.9,
    height: 60,
    backgroundColor: colors.green,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginVertical: 6,
  },
  googleButton: {
    backgroundColor: colors.blue,
  },
  facebookButton: {
    backgroundColor: colors.darkblue,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  textWrapperCentered: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
