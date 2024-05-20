import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiPutWithoutToken} from '../api/Api';

export default function ResetPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPassword = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed successfully');
      ToastAndroid.show('Successfully Registered Password', ToastAndroid.SHORT);

      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  const handlePress = async () => {
    try {
      const checkPassword = await AsyncStorage.getItem('password');

      console.log(checkPassword, 'CHECK PASSWORD IS THERE...');
      const userID = await AsyncStorage.getItem('userID');

      // Compare the existing password (checkPassword) with the current password (password)
      if (password !== checkPassword) {
        ToastAndroid.show('Password is wrong', ToastAndroid.SHORT);
        return; // Exit the function if passwords do not match
      }

      if (password === '' && newPassword === '' && confirmPassword === '') {
        ToastAndroid.show('Please Enter The Field', ToastAndroid.SHORT);
      }

      // Check if newPassword and confirmPassword match
      if (newPassword !== confirmPassword) {
        ToastAndroid.show(
          'New Password and Confirm Password Mismatch',
          ToastAndroid.SHORT,
        );
        return; // Exit the function if passwords do not match
      }

      const params = {
        newPassword: confirmPassword,
      };

      const data = await apiPutWithoutToken(`users/${userID}`, params);

      resetPassword();

      console.log('Password updated successfully.');
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={[styles.profileContainer, {height: 55}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={{width: 40, height: 43, marginTop: 3}}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 16,
            color: 'black',
            fontFamily: 'DMSans-Medium',
            marginLeft: 6,
          }}>
          Back
        </Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.wrapperText}>Old Password</Text>
        <TextInput
          style={styles.Textinput}
          value={password}
          //editable={false}
          onChangeText={text => setPassword(text)}

          // other props
        />
        <Text style={styles.wrapperText}>New Password</Text>
        <TextInput
          style={styles.Textinput}
          value={newPassword}
          // editable={false}
          onChangeText={text => setNewPassword(text)}

          // other props
        />
        <Text style={styles.wrapperText}>Confirm Password</Text>
        <TextInput
          style={styles.Textinput}
          value={confirmPassword}
          // editable={false}
          onChangeText={text => setConfirmPassword(text)}

          // other props
        />
        <CustomButton title="Reset Password" onPress={handlePress} />
      </View>
    </View>
  );
}

const elevationStyle = Platform.select({
  ios: {
    // shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  loginContainer: {
    //  justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    // marginTop: 17,
  },
  Textinput: {
    width: '100%',
    height: 56,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    borderColor: '#e8ecf4',
    borderWidth: 1,
    //paddingHorizontal: 16, // Add padding to keep text away from borders
    marginTop: 28,
    borderStyle: 'solid',
    color: 'black',
    fontSize: 15,
    fontFamily: 'DMSans-Medium',
    marginTop: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
});
