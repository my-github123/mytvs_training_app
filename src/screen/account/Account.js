import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  BackHandler,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import User from '../../../assets/images/user.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

// name,
// designation,
// employee id,
// phone number,
// location,
// garage name,

export default function Account({navigation}) {
  const [profileList, setProfileList] = useState({});
  const [username, setUsername] = useState('');
  useEffect(() => {
    getProfileList();
    getData();
  }, []);

  const getData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');

      if (username !== null) {
        setUsername(username);
      }
    } catch (e) {
      console.log(e, 'fyy');
    }
  };

  const getProfileList = async () => {
    await AsyncStorage.getItem('userList')

      .then(userString => {
        if (userString) {
          // Parse the user string into an object
          const user = JSON.parse(userString);
          setProfileList(user);
          console.log('User:', user);
        } else {
          console.log('User not found in AsyncStorage');
        }
      })
      .catch(error => console.error('Failed to retrieve user:', error));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handlePress = async () => {
    AsyncStorage.removeItem('token')
      .then(
        () => console.log('Token removed successfully'),
        navigation.navigate('Login'),
      )
      .catch(error => console.error('Failed to remove token:', error));
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 20}}>
          <View style={{alignItems: 'center'}}>
            <User
              // source={images.profile}
              width={60}
              height={63}
              //  style={{marginTop: 10}}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.wrapperText}>Username</Text>
            <TextInput
              style={styles.Textinput}
              value={username}
              editable={false}
              // onChangeText={text => setUsername(text)}

              // other props
            />
            <Text style={styles.wrapperText}>designation</Text>
            <TextInput
              style={styles.Textinput}
              value={profileList.designation}
              editable={false}
              //  onChangeText={text => setUsername(text)}

              // other props
            />
            <Text style={styles.wrapperText}>E code</Text>
            <TextInput
              style={styles.Textinput}
              value={profileList.empId}
              editable={false}
              // onChangeText={text => setUsername(text)}

              // other props
            />
            <Text style={styles.wrapperText}>Phonenumber</Text>
            <TextInput
              style={styles.Textinput}
              value={profileList.phoneNumber}
              editable={false}
              //  onChangeText={text => setUsername(text)}

              // other props
            />
            {/* s */}
            <Text style={styles.wrapperText}>District</Text>
            <TextInput
              style={styles.Textinput}
              value={profileList.district}
              editable={false}
              //   onChangeText={text => setUsername(text)}

              // other props
            />
            <Text style={styles.wrapperText}>Garagename</Text>
            <TextInput
              style={styles.Textinput}
              value={profileList.garageName}
              editable={false}
              //   onChangeText={text => setUsername(text)}

              // other props
            />

            <CustomButton title="Logout" onPress={handlePress} />
          </View>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  wrapperText: {
    color: 'black',
    fontSize: 16,
    marginTop: 14,
    fontFamily: 'DMSans-Medium',
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
