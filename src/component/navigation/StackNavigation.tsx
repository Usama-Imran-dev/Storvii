import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';
import LoginScreen from '../Screen/Login';
import HomeScreen from '../Screen/Homescreen';
import CreateRoomScreen from '../Screen/Createroom';
import SignupScreen from '../Screen/Signup';

// Create the Stack Navigator
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoomScreen}
        options={{
          headerStyle: {
            backgroundColor: '#F5E8D8', // Set your desired background color
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
