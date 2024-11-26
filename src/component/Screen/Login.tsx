import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Validation Schema for Login
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const BottomSheet = ({visible, onClose, onSubmit, email, setEmail}: any) => (
  <Modal transparent visible={visible} animationType="slide">
    <View style={styles.modalOverlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottomSheet}>
        <Text style={styles.bottomSheetTitle}>Forgot Password?</Text>
        <Text style={styles.bottomSheetText}>
          Enter your email to reset your password.
        </Text>
        <TextInput
          style={styles.roundInput}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.roundButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.link}>
          <Text style={styles.linkText}>Close</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleKeyboardShow = () => setIsKeyboardVisible(true);
  const handleKeyboardHide = () => setIsKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/2.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginValidationSchema}
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

              {/* Forgot Password Link aligned to the right */}
              <View style={styles.forgotContainer}>
                <TouchableOpacity
                  onPress={() => setShowBottomSheet(true)}
                  style={styles.forgotLink}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>

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

              {/* SignUp Link */}
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.link}>
                <Text style={styles.linkText}>
                  Don't have an account? Signup
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>

      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        onSubmit={() => {
          console.log('Email submitted for reset:', forgotEmail);
          setShowBottomSheet(false);
        }}
        email={forgotEmail}
        setEmail={setForgotEmail}
      />
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
    marginTop: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#F5E8D8',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomSheetText: {
    fontSize: 14,
    marginBottom: 15,
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 19,
  },
  forgotLink: {
    alignItems: 'flex-end',
  },
});

export default LoginScreen;
