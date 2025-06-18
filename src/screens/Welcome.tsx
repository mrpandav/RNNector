import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { FS } from '../../scale';
import B1 from '../assets/images/onboarding.png';
import B2 from '../assets/images/Group.png';

import colors from '../constants/colors';

const Welcome = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Singin');
  };

  return (
    <ImageBackground source={B1} style={styles.background}>
      <View style={styles.boxContainer}>
        <View style={styles.boxSpecial}></View>
        <View style={styles.boxNormal}>
          <Image source={B2} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Welcome</Text>
            <Text style={styles.titleText}>to our store</Text>
          </View>
          <Text style={styles.description}>
            Get your groceries in as fast as one hour
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: '101%',
    height: '100%',
    resizeMode: 'cover',
  },
  boxContainer: {
    flex: 1,
  },
  boxSpecial: {
    flex: 1,
  },
  boxNormal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
  },
  image: {
    width: width * 0.15,
    height: height * 0.07,
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
    resizeMode: 'contain',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.12,
    width: width * 0.8,
  },
  titleText: {
    fontSize: FS(40),
    color:colors.white,
    fontFamily: 'Gilroy',
    textAlign: 'center',
    lineHeight: FS(50),
  },
  description: {
    width: width * 0.8,
    fontSize: FS(14),
    color: colors.lightGray,
    textAlign: 'center',
    fontFamily: 'Gilroy',
    marginBottom: 30,
  },
  button: {
    backgroundColor:colors.green,
    width: width * 0.9,
    height: height * 0.08,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor:colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color:colors.text,
    fontFamily: 'Gilroy',
    fontSize: FS(16),
  },
});



 