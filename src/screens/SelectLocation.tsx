import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';

const {width, height} = Dimensions.get('window');

const SelectLocation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/Number.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back-ios" size={35} color={colors.blacktext} />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.greenBox}>
                <Image
                  source={require('../assets/images/illustration.png')}
                  resizeMode="contain"
                  style={styles.illustration}
                />
                <Text style={styles.title}>Select Your Location</Text>
                <Text style={styles.subtitle}>
                  Switch on your location to stay in tune with
                </Text>
                <Text style={styles.subtitle}>
                  what’s happening in your area
                </Text>
              </View>

              <View style={styles.bottomBox}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Your Zone</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFieldWithIcon}
                      placeholder="Banasree"
                      placeholderTextColor={colors.textPrimary}
                    />
                    <Icon
                      name="keyboard-arrow-down"
                      size={20}
                      color={colors.textPrimary}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Your Area</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFieldWithIcon}
                      placeholder="Types of your area"
                      placeholderTextColor={colors.wh}
                    />
                    <Icon
                      name="keyboard-arrow-down"
                      size={20}
                      color={colors.textPrimary}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  greenBox: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    // flex:1,
  },
  illustration: {
    width: '90%',
    height: 150,
  },
  title: {
    fontSize: 24,
    color: colors.blackte,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: colors.bla,
    textAlign: 'center',
  },
  bottomBox: {},
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.bla,
    marginBottom: 8,
    fontWeight: '400',
  },
  inputField: {
    height: 50,

    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.blacktext,
    borderBottomWidth: 1,
    borderColor: colors.separatorLine,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.separatorLine,
    paddingHorizontal: 10,
    height: 50,
  },

  inputFieldWithIcon: {
    flex: 1,
    fontSize: 16,
    color: colors.blacktext,
  },
  submitButton: {
    backgroundColor: colors.green,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: colors.white,
    
  },
});
