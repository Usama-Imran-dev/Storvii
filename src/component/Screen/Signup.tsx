import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Validation Schema
const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
});

const SignupScreen = ({navigation}: {navigation: any}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/3.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Signup Form */}
      <View style={styles.card}>
        <Text style={styles.title}>Signup</Text>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
          validationSchema={signupValidationSchema}
          onSubmit={values => {
            console.log(values);
            navigation.navigate('Home');
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.roundInput}
                  placeholder="Enter email or username"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.roundInput}
                  placeholder="Enter password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.roundInput}
                  placeholder="Confirm password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => {
                  handleSubmit(); // Ensure it is called properly
                }}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              {/* OR Separator */}
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.link}>
                <Text style={styles.linkText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1E6',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 350,
  },
  card: {
    backgroundColor: '#FFF1E6',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 45,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  roundInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#FFF1E6',
    fontWeight: 'bold',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  roundButton: {
    backgroundColor: '#F5E8D8',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'center',
    width: '80%',
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
