import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import {getFirestore, setDoc, doc} from '@react-native-firebase/firestore';
import colors from '../constants/colors';
import useUserStore from '../store/storageZustand';

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUp = ({navigation}) => {
  const {setUser} = useUserStore();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async values => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const useruid = userCredential.user.uid;

      const firestore = getFirestore();
      await setDoc(doc(firestore, 'Users', useruid), {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setUser({
        username:values.username,
        email:values.email,
        password:values.password,
        uid:useruid
      })
      await updateProfile(userCredential.user, {
        displayName: values.username,
      });

      console.log('User created:', userCredential.user.email);

      navigation.navigate('Main');
    } catch (error) {
      console.error('Sign up error:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password is too weak!');
      } else {
        Alert.alert('Something went wrong. Please try again.');
      }
    }
  };



  
  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/Number.png')}
        resizeMode="cover"
        style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.contener}>
              <View style={styles.Fbox}>
                <Image source={require('../assets/images/Group1.png')} />
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>
                  Enter your credentials to continue
                </Text>
              </View>

              <Formik
                initialValues={{username: '', email: '', password: ''}}
                validationSchema={SignUpSchema}
                onSubmit={handleSignUp}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.inputContainer}>
                    {/* Username */}
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                      style={styles.input}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}

                    {/* Email */}
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    {/* Password */}
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={{flex: 1}}
                        secureTextEntry={!isPasswordVisible}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.iconContainer}>
                        <Icon
                          name={isPasswordVisible ? 'eye-off' : 'eye'}
                          size={20}
                          color={colors.blacktext}
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <Text style={{fontSize: 14, color: colors.bla}}>
                      By continuing you agree to our
                      <Text style={styles.greenText}> Terms of Service </Text>
                      and
                      <Text style={styles.greenText}> Privacy Policy.</Text>
                    </Text>

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmit}>
                      <Text style={styles.submitText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.greenText}> Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

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
    marginTop: 55,
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    marginTop: 30,
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
    fontSize: 14,
    color: colors.bla,
    marginBottom: 5,
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
  submitButton: {
    backgroundColor: colors.green,
    height: 50,
    width: '100%',
    borderRadius: 12,
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
    fontSize: 15,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  greenText: {
    color: colors.green,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});
