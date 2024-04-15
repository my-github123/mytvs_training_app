import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/auth/Login';
import VideoList from '../screen/video/VideoList';
import VideoPlay from '../screen/video/VideoPlay';
import Account from '../screen/account/Account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../screen/notification/Notification';

const Stack = createStackNavigator();

export default function ScreenList() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token is stored in AsyncStorage
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        setToken(value);
      }
    } catch (error) {
      console.error('Failed to retrieve token:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VideoList" component={VideoList} />
        <Stack.Screen name="VideoPlay" component={VideoPlay} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
