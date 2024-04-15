import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import images from '../../components/images';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/logo.svg';
import Password from '../../../assets/images/password.svg';
import {apiPostWithoutToken} from '../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Call the function to store the data

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const userDatas = {
  //   appVersion: '',
  //   createdAt: '2024-04-04T11:11:58.000Z',
  //   designation: 'Manager',
  //   district: 'chennai',
  //   empId: 'K09655',
  //   garageId: 'MHM550',
  //   garageName: 'TVS A.A OWN PATROL - AMBATTUR',
  //   loginStatus: '0',
  //   manufacturer: '',
  //   model: '',
  //   networkType: '',
  //   password: 'Today@',
  //   phoneNumber: '9080269267',
  //   sdkVersion: '',
  //   state: 'Tamilnadu',
  //   updatedAt: '2024-04-04T11:11:58.000Z',
  //   userId: '1',
  //   username: username,
  //   versionCode: 1,
  // };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  // useEffect(() => {
  //   storeUserData(userDatas);
  // }, []);

  // const handlePress = () => {
  //   // Handle button press logic here

  // };

  const handlePress = async () => {
    if (!username.trim() || !password.trim()) {
      ToastAndroid.show(
        'Please enter username and password',
        ToastAndroid.SHORT,
      );
      return;
    }

    await handlePostWithToken();

    // Your logic for handling the API call with the username and password
  };

  // const storeUserData = async userData => {
  //   try {
  //     await AsyncStorage.setItem('userList', JSON.stringify(userData));
  //     console.log('Data stored successfully');
  //   } catch (error) {
  //     console.error('Failed to store data:', error);
  //   }
  // };

  // const handlePress = async () => {
  //   if (!username.trim() || !password.trim()) {
  //     ToastAndroid.show(
  //       'Please enter username and password',
  //       ToastAndroid.SHORT,
  //     );
  //     return;
  //   }

  //   try {
  //     // Retrieve the stored data from AsyncStorage
  //     const storedData = await AsyncStorage.getItem('userData');

  //     console.log(storedData, 'stored data');
  //     if (storedData) {
  //       const userData = JSON.parse(storedData);
  //       // Check if the entered username and password match any of the stored credentials
  //       const user = userData.find(
  //         item => item.username === username || item.password === password,
  //       );
  //       console.log(user, 'user is there..........');
  //       if (user) {
  //         // Logic for navigating to the videoList page
  //         // For example, navigate('videoList');
  //         await AsyncStorage.setItem('username', username);
  //         setUsername('');
  //         setPassword('');
  //         navigation.navigate('VideoList');
  //       } else {
  //         ToastAndroid.show('Invalid username or password', ToastAndroid.SHORT);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Failed to retrieve data from AsyncStorage:', error);
  //   }
  // };

  const handlePostWithToken = async () => {
    console.log('handle ');
    try {
      const params = {
        username: username,
        password: password,
      };
      const data = await apiPostWithoutToken('login', params);

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userID', JSON.stringify(data.user.userId));

      await AsyncStorage.setItem('username', data.user.username);

      const userString = JSON.stringify(data.user);

      //Store user string in AsyncStorage
      AsyncStorage.setItem('userList', userString)
        .then(() => console.log('User stored successfully'))
        .catch(error => console.error('Failed to store user:', error));

      console.log('POST response:', data);
      setUsername('');
      setPassword('');
      ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
      navigation.navigate('VideoList');
    } catch (error) {
      ToastAndroid.show('User Not Found', ToastAndroid.SHORT);
      console.error('POST error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* <Image source={images.logo} /> */}
        <Logo />
        <Text style={styles.wrapperText}>Training Course</Text>
        <Text style={styles.wrapperLoginText}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <TextInput
          style={{
            width: '100%',
            height: 56,
            backgroundColor: '#f7f8f9',
            borderRadius: 8,
            borderColor: '#e8ecf4',
            borderWidth: 1,
            paddingHorizontal: 16, // Add padding to keep text away from borders
            marginTop: 15,
            borderStyle: 'solid',
            color: 'black',
            fontSize: 15,
            fontFamily: 'DMSans-Medium',
          }}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="Username"
          placeholderTextColor="#8391a1"
          placeholderStyle={{
            fontFamily: 'DMSans-Medium',
            // Other placeholder styles if needed
          }}
          // other props
        />
        <TextInput
          style={{
            width: '100%',
            height: 56,
            backgroundColor: '#f7f8f9',
            borderRadius: 8,
            borderColor: '#e8ecf4',
            borderWidth: 1,
            paddingHorizontal: 16, // Add padding to keep text away from borders
            marginTop: 15,
            borderStyle: 'solid',
            color: 'black',
            fontSize: 15,
            fontFamily: 'DMSans-Medium',
          }}
          secureTextEntry={!isPasswordVisible}
          placeholder="Enter your password"
          placeholderTextColor="#8391a1"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderStyle={{
            fontFamily: 'DMSans-Medium',
            // Other placeholder styles if needed
          }}
          // other props
        />

        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}>
          {/* {isPasswordVisible ? ( */}
          <Password
            // source={images.eyeIcon} // Replace 'eye-icon.png' with the path to your eye icon image
            style={{width: 24, height: 24}}
            //  resizeMode="contain"
          />
          {/* ) : ( */}
          {/* <Image
              source={require('../../../assets/images/eyehide.png')}
              style={{width: 22, height: 22, tintColor: '#6a707c'}}
            /> */}
          {/* )} */}
        </TouchableOpacity>

        {/* <Text style={styles.forgotPassword}>Forgot Password?</Text> */}

        <CustomButton title="Login" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperText: {
    fontSize: 24,
    color: '#22240f',
    marginTop: 50.6,
    fontFamily: 'DMSans-Medium',
    // lineHeight: 18,
    // fontWeight: '600',
  },
  imageContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  wrapperLoginText: {
    fontSize: 20,
    color: '#22240f',
    marginTop: 51,
    fontFamily: 'DMSans-Medium',
    //  lineHeight: 18,
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    // marginTop: 17,
  },
  forgotPassword: {
    color: '#6a707c',
    marginTop: 14,
    textAlign: 'right',
    fontFamily: 'DMSans-Bold',
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 94,
    right: 30,
  },
});
