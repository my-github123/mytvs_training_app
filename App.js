import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Logo from './assets/images/logo.svg';
import ScreenList from './src/navigation/ScreenList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// const data = [
//   {username: 'OWCH42156', password: 'user123'},
//   {username: 'OWCH47305', password: 'user123'},
// ];

//OWCH42156
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo width={'80%'} height={'80%'} resizeMode="contain" />
    </View>
  );
};

export default function App({navigation}) {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   // Convert the array of objects to a JSON string
  //   const jsonData = JSON.stringify(data);

  //   // Store the JSON string in AsyncStorage
  //   AsyncStorage.setItem('userData', jsonData)
  //     .then(() => console.log('Data stored successfully'))
  //     .catch(error => console.error('Failed to store data:', error));
  // };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds delay
  }, []);

  return loading ? <SplashScreen /> : <ScreenList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});
// //  android:screenOrientation="portrait"

//2526
