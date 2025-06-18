import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import useUserStore from '../store/storageZustand'; // Make sure this is used correctly
import { useNavigation } from '@react-navigation/native'; // Import this here
import colors from '../constants/colors';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const { setUser } = useUserStore();   
  const navigation = useNavigation();   

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (values) => {
    const auth = getAuth();
    const firestore = getFirestore();

    try {
      // 1. Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const uid = userCredential.user.uid;

      // 2. Fetch user data from Firestore
      const userDocRef = doc(firestore, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists) {
        Alert.alert('User data not found in Firestore.');
        return;
      }

      const userData = userDoc.data();
      // 3. Save user info to Zustand and navigate
      setUser({
        username: values.username || '',
        email: values.email,
        password: '',  // Don’t store password for security reasons
        uid: uid,
      });

      setTimeout(() => {
        navigation.navigate('Main');  // Navigate after successful login
      }, 1000);

    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email address!');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password!');
      } else {
        Alert.alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground source={require('../assets/images/Number.png')} resizeMode="cover" style={styles.background}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.contener}>
              <View style={styles.Fbox}>
                <Image source={require('../assets/images/Group1.png')} />
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Enter your email and password</Text>
              </View>

              <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleLogin}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={styles.inputContainer}>
                    {/* Email */}
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    {/* Password */}
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={{ flex: 1 }}
                        secureTextEntry={!isPasswordVisible}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                        <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#000" />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity>
                      <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitText}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.greenText}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;
   

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  background: {
    flex: 1,
  },
  contener: {
    height: '100%',
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  Fbox: {
    marginTop: 80,
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    marginTop: 50,
    color: colors.blacktext,
  },
  subtitle: {
    fontSize: 16,
    color: colors.bla,
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.bla,
    marginBottom: 5,
    fontWeight:'500',
  },
  input: {
    height: 50,
     
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.blacktext,
    borderBottomWidth: 1,
    borderColor: colors.separatorLine,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.InputbackgroundColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.blacktext,
    borderBottomWidth: 1,
    borderColor: colors.separatorLine,
    marginBottom: 15,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
  },
  forgotPassword: {
    color: colors.blacktext,
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.green,
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  submitText: {
    fontSize: 18,
    color: colors.white,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: colors.textPrimary,
      
  },
  greenText: {
    color: colors.green,
    fontSize: 14,
   
    fontWeight: '500',
    marginLeft: 5, 
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});
