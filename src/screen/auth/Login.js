import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import images from '../../components/images';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/logo.svg';
import Password from '../../../assets/images/password.svg';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handlePress = () => {
    // Handle button press logic here
    navigation.navigate('VideoList');
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
            paddingHorizontal: 16,
            marginTop: 17,
            fontSize: 15,
            color: '#8391a1',
            borderStyle: 'solid',
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
          <Password
            // source={images.eyeIcon} // Replace 'eye-icon.png' with the path to your eye icon image
            style={{width: 24, height: 24}}
            //  resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

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
    bottom: 124,
    right: 30,
  },
});
