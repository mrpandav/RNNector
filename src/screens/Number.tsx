import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';
import Numberbg from '../assets/images/Number.png';
import colors from '../constants/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');

 
const PhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits') 
    .required('Phone number is required'),
});

const Number = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('BD');
  const [country, setCountry] = useState({ cca2: 'BD', callingCode: ['880'] });

  const handleNextPress = (values) => {
    if (values.phoneNumber.length === 10) {
      navigation.navigate('Verification');
    } else {
      Alert.alert('Invalid number', 'Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground source={Numberbg} style={styles.background} resizeMode="cover">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back-ios" size={35} color={colors.black} />
            </TouchableOpacity>

            <Text style={styles.text}>Enter your mobile number</Text>

            <Formik
              initialValues={{ phoneNumber: '' }}
              validationSchema={PhoneSchema}
              onSubmit={handleNextPress}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <CountryPicker
                      withFilter
                      withFlag
                      withCallingCode
                      withEmoji
                      countryCode={countryCode}
                      onSelect={(country) => {
                        setCountryCode(country.cca2);
                        setCountry(country);
                      }}
                    />
                    <Text style={styles.codeText}>+ {country?.callingCode?.[0] ?? '880'}</Text>
                    <TextInput
                      style={styles.phoneInput}
                      keyboardType="numeric" // Restrict to numeric input
                      maxLength={10} // Allow only 10 digits
                      placeholderTextColor="#181725"
                      value={values.phoneNumber}
                      onChangeText={(text) => {
                        // Filter out non-numeric characters
                        const numericText = text.replace(/[^\d]/g, ''); // Remove non-digits
                        handleChange('phoneNumber')(numericText); // Update Formik value
                      }}
                      onBlur={handleBlur('phoneNumber')}
                    />
                  </View>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}

                  <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.iconButton}>
                      <Icon name="chevron-right" size={35} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  backButton: {
    paddingTop: 50,
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    color: colors.blacktext,
    marginTop: 50,
    textAlign: 'left',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 50,
    paddingHorizontal: 10,
     width:'95%',
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorLine,
  },
  codeText: {
    fontSize: 18,
    marginLeft: 10,
  },
  phoneInput: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
  },
});
