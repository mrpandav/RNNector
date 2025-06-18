import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import colors from '../constants/colors';

const VerificationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .matches(/^\d{4}$/, 'Code must be exactly 4 digits'),
});

const Verification = () => {
  const navigation = useNavigation();

  const handleGoPress = values => {
    if (values.code.length === 4) {
      navigation.navigate('SelectLocation');
    } else {
      Alert.alert(
        'Invalid Code',
        'Please enter a valid 4-digit verification code.',
      );
    }
  };

  const handleResendPress = resetForm => {
    resetForm();
    Alert.alert(
      'Code Resent',
      'A new verification code has been sent to your number.',
    );
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/Number.png')}
        style={styles.background}
        resizeMode="cover">
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <Formik
            initialValues={{code: ''}}
            validationSchema={VerificationSchema}
            onSubmit={handleGoPress}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              resetForm,
            }) => (
              <>
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Icon name="arrow-back-ios" size={35} color="#181725" />
                  </TouchableOpacity>

                  <Text style={styles.text}>Enter your 4-digit code</Text>
                  <Text style={{color: '#7C7C7C'}}>Code</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"  
                    maxLength={4}  
                    placeholder="- - - -"
                    placeholderTextColor="#181725"
                    value={values.code}
                    onChangeText={text => {
                       
                      const numericText = text.replace(/[^\d]/g, '');
                      handleChange('code')(numericText); 
                    }}
                    onBlur={handleBlur('code')}
                  />

                  {touched.code && errors.code && (
                    <Text style={styles.errorText}>{errors.code}</Text>
                  )}
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={() => handleResendPress(resetForm)}
                    style={styles.resendButton}>
                    <Text style={styles.resendText}>Resend Code</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.iconButton}>
                    <Icon name="chevron-right" size={35} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Verification;

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
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,

    fontSize: 18,
    marginTop: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.separatorLine,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  iconButton: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  resendButton: {
    marginTop: 22,
    
    alignItems: 'center',
  },
  resendText: {
    color: colors.green,
    fontSize: 16,
    marginLeft: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
