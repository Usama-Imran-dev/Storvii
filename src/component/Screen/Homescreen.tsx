import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RoomScreen from './Roomscreen';
import SettingScreen from './Settingscreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  const image = require('../../assets/1.png');

  const quoteArray = [
    {
      part1: 'Where every ',
      part2: 'story is a bridge to ',
      part3: 'another soul.',
    },
    {
      part1: 'Where every ',
      part2: 'journey begins with a ',
      part3: 'step towards discovery.',
    },
    {
      part1: 'Where every',
      part2: 'voice echoes through ',
      part3: 'the hearts of others.',
    },
    {
      part1: 'Where every',
      part2: 'moment holds promise',
      part3: 'of a new adventure.',
    },
    {
      part1: 'Where every',
      part2: 'connection weaves a',
      part3: 'thread of understanding.',
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(quoteArray[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const slideAnim = useState(new Animated.Value(-300))[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % quoteArray.length);
      setCurrentQuote(quoteArray[quoteIndex]);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearInterval(timer);
  }, [quoteIndex]);

  const MainScreen = () => (
    <View style={{flex: 1, backgroundColor: '#F5E8D8'}}>
      {/* Header */}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          Storvii
        </Text>
        <TouchableOpacity>
          <Icon name="account-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Quote Display */}
      <View style={{paddingVertical: 100, paddingHorizontal: 20}}>
        <Text style={{fontSize: 32, color: 'black'}}>{currentQuote.part1}</Text>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: -95}}>
        <Text style={{fontSize: 32, color: 'black', fontWeight: 'bold'}}>
          {currentQuote.part2}
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 5}}>
        <Text style={{fontSize: 32, color: 'black'}}>{currentQuote.part3}</Text>
      </View>

      {/* Animated Image */}
      <View style={{paddingHorizontal: 3, marginTop: 20, paddingVertical: 100}}>
        <Animated.Image
          source={image}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            transform: [{translateX: slideAnim}],
          }}
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '2%',
          transform: [{translateX: -30}],
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={() => navigation.navigate('CreateRoom')}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true, // Ensure the label is visible
        tabBarLabelStyle: {
          fontSize: 20, // Adjust text size to 14 for better visibility
          color: 'black', // Text color for all tabs
        },
        tabBarIcon: () => null, // No icons for tabs
        tabBarLabel: ({focused}) => (
          <View style={{alignItems: 'center'}}>
            {/* Text for the tab */}
            <Text
              style={{
                color: focused ? 'black' : 'gray',
                fontSize: 20,
                fontFamily: 'outfit',
                fontWeight: 'bold',
              }}>
              {route.name}
            </Text>

            {/* Line below the text when tab is focused */}
            {focused && (
              <View
                style={{
                  height: 2,
                  width: 50,
                  backgroundColor: 'black',
                  marginTop: 4,
                }}
              />
            )}
          </View>
        ),
        tabBarStyle: {
          backgroundColor: '#F5E8D8', // Set background color to match the screen color
          borderTopWidth: 0, // Remove border at the top of the tab bar
          height: 80, // Adjust height to make the text and line properly visible
        },
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Tab.Screen name="Rooms" component={RoomScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
