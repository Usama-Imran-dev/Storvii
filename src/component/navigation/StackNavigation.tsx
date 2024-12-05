import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screen/Login';
import HomeScreen from '../Screen/Homescreen';
import CreateRoomScreen from '../Screen/Createroom';
import SignupScreen from '../Screen/Signup';

import AccountScreen from '../Screen/Account'; // Create this screen
import StoreScreen from '../Screen/Store'; // Create this screen
import HelpScreen from '../Screen/Help'; // Create this screen
import Help from '../Screen/Help';
import Store from '../Screen/Store';
import About from '../Screen/About';
import ProfileScreen from '../Screen/Settingscreen';
import SettingScreen from '../Screen/Settingscreen';
import Profile from '../Screen/Profile';

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
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: '#F5E8D8', // Set your desired background color
          },
        }}
      />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerStyle: {
            backgroundColor: '#F5E8D8', // Set your desired background color
          },
        }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          headerStyle: {
            backgroundColor: '#F5E8D8', // Set your desired background color
          },
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerStyle: {
            backgroundColor: '#F5E8D8', // Set your desired background color
          },
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
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
