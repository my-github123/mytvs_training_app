import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/auth/Login';
import VideoList from '../screen/video/VideoList';
import VideoPlay from '../screen/video/VideoPlay';
import Account from '../screen/account/Account';

const Stack = createStackNavigator();

export default function ScreenList() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
