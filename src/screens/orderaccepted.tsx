// screens/Orderaccepted.js
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Orderaccepted = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/Number.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.centerWrapper}>
            <Animated.Image
              source={require('../assets/images/OderDone.png')}
              style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
            />

            <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>

            <Text style={styles.subtitle}>
              Your items has been placed and is on{'\n'}its way to being processed
            </Text>
          </View>

          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => navigation.replace('Orders')}
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Main')}>
              <Text style={styles.backToHomeText}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Orderaccepted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  image: {
    width: 250,
    height: 230,
    marginBottom: 30,
    marginRight:50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  bottomButtons: {
    alignItems: 'center',
    width: '100%',
  },
  trackButton: {
    backgroundColor: '#53B175',
    paddingVertical: 16,
    borderRadius: 19,
    marginBottom: 20,
    width: '100%',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  backToHomeText: {
    fontSize: 16,
    color: '#181725',
    fontWeight: '500',
  },
});
