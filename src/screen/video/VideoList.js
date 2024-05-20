import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions,
  Platform,
  BackHandler,
  Alert,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import images from '../../components/images';
import Heart from '../../../assets/images/heart.svg';
import Comment from '../../../assets/images/comment.svg';
import User from '../../../assets/images/user.svg';

import Notification from '../../../assets/images/notification.svg';
import Account from '../../../assets/images/account.svg';
import Total from '../../../assets/images/total.svg';
import Completed from '../../../assets/images/Completed.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Incompleted from '../../../assets/images/InCompleted.svg';
import {apiGetWithoutToken} from '../api/Api';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

// Define the base width and height
const baseWidth = 375; // For example, iPhone 11 width
const baseHeight = 812; // For example, iPhone 11 height

// Calculate the scaling factor
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scaleFactor = Math.min(scaleWidth, scaleHeight);

// Calculate the dynamic width and height
const dynamicWidth = 157 * scaleFactor;
const dynamicHeight = 107 * scaleFactor;

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

console.log(formattedDate, 'formatted date in the ofifve');

// const DummyData = [
//   {
//     id: 1,
//     Title: 'Battery Jump Start',
//     Date: formattedDate,
//     VideoUrl:
//       'https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/EV%20Jump%20Start.mp4',
//     TumbNailImage:
//       'https://media.istockphoto.com/id/1131515213/photo/a-mechanic-is-repairing-motor-bike.jpg?s=1024x1024&w=is&k=20&c=vK6U429PRx1wCeXxQki0dy7H4LaoQRPd2luhkpefDzM=',
//     Description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 2,
//     Title: 'Incredible drone footage',
//     Date: formattedDate,
//     VideoUrl:
//       'https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/EV%20Gun%20Stuck.mp4',
//     TumbNailImage:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0rmkZZQpUPvOxklgtTUnabtcrcp_NHxWlAb2zfsZ2Ag&s',
//     Description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 50,
//     comment_count: 10,
//     viewers_count: 250,
//   },
//   {
//     id: 3,
//     Title: 'Vehicle Service Technician',
//     Date: formattedDate,
//     VideoUrl:
//       'https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Key%20lock%20inside%20or%20key%20lost.mp4',
//     TumbNailImage:
//       'https://c0.wallpaperflare.com/preview/980/505/305/car-mechanic-automobile-mechanical-thumbnail.jpg',
//     Description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 4,
//     Title: 'cars and perform oil changes',
//     Date: formattedDate,
//     VideoUrl:
//       'https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Smart%20Key%20out%20of%20range%20keep%20in%20console.mp4',
//     TumbNailImage:
//       'https://media.gettyimages.com/id/944047118/video/dolly-shot-to-close-up-asian-senior-car-mechanic-move-to-under-vehicle-from-working.jpg?s=640x640&k=20&c=-5-2gotfKf_uP0xbttZBLP9YCRYlQZxJjVidqQt3iOY=',
//     Description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 5,
//     Title: 'Performs preventive maintenance ',
//     Date: formattedDate,
//     VideoUrl:
//       'https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Smart%20Key%20out%20of%20range%20cell%20replacement.mp4',
//     TumbNailImage:
//       'https://www.shutterstock.com/image-photo/mechanic-using-wrench-while-working-600nw-2184125681.jpg',
//     Description:
//       'Perform basic care and maintenance, including changing oil, checking fluid levels, and rotating tires.',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
// ];

//https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/EV%20Jump%20Start.mp4
//https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/EV%20Gun%20Stuck.mp4
//https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Key%20lock%20inside%20or%20key%20lost.mp4
//https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Smart%20Key%20out%20of%20range%20cell%20replacement.mp4
//https://storage.googleapis.com/bkt-gobumper-stag-02/RSA/Smart%20Key%20out%20of%20range%20keep%20in%20console.mp4

const VideoList = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
    getDashboard();
    getVideos();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getVideos();
  };

  // const getData = async () => {
  //   try {
  //     const username = await AsyncStorage.getItem('username');

  //     if (username !== null) {
  //       setUsername(username);
  //     }
  //   } catch (e) {
  //     console.log(e, 'fyy');
  //   }
  // };
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userID = await AsyncStorage.getItem('userID');
      const username = await AsyncStorage.getItem('username');

      if (token !== null && userID !== null && username !== null) {
        console.log('Token:', token);
        console.log('UserID:', userID);
        setUsername(username);
      } else {
        console.log('Token or userID is null');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const getDashboard = async () => {
    const userID = await AsyncStorage.getItem('userID');
    try {
      const data = await apiGetWithoutToken(`getDashboard/${userID}`);
      // console.log(data, 'data is there......');
      setDashboardDetails(data);
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const getVideos = async () => {
    const userID = await AsyncStorage.getItem('userID');
    //  const userID = parseInt(userIDString, 10);

    console.log(userID, 'USERid is there........');
    try {
      const data = await apiGetWithoutToken(`getVideos/${userID}`);
      setVideos(data);
      setRefreshing(false);
      setLoading(false);
      console.log(data, 'data is there......');
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const renderItem = ({item}) => {
    const formattedDate = moment(item.Date).format('MMM D, YYYY');

    const currentTime = moment();
    const difference = moment(currentTime).diff(moment(item.Date));

    const duration = moment.duration(difference);
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(214, 214, 214, 0.5)',
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity onPress={() => handleVideoPress(item)}>
          <View style={[styles.itemContainer]}>
            <Image source={{uri: item.TumbNailImage}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.Title}</Text>
              <Text style={styles.content}>{item.Description}</Text>
              {/* <Text style={styles.date}>{item.date_created}</Text> */}
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 7,
            marginBottom: 10,
          }}>
          <Heart
            // source={images.heart}
            width={16.7}
            height={14.7}
            // tintColor={'#f45b69'}
            style={{marginTop: 1, marginLeft: 5}}
          />

          <Text style={styles.wrapperLike}>Like</Text>
          <Comment
            // source={images.comment}
            // tintColor={'#f45b69'}
            style={{marginTop: 1, marginLeft: 5}}
            width={16.7}
            height={16.7}
          />
          <Text style={styles.wrapperLike}>Comment</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '55%',
            }}>
            {/* <Text style={styles.date}>
              {formattedDate} {duration.hours()} hours {duration.minutes()} min{' '}
              {duration.seconds()} sec
            </Text> */}
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.wrapperCommentCount}>{item.comment_count}</Text>
            <Text style={styles.wrapperComment}>Comment</Text>
          </View> */}
        </View>
      </View>
    );
  };

  const handleVideoPress = item => {
    navigation.navigate('VideoPlay', {
      videoData: item,
      username: username,
      videos: videos,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.profileContainer, {height: 55}]}>
        <User
          // source={images.profile}
          style={{width: 30, height: 33, marginTop: 8}}
        />
        <View style={styles.userProfile}>
          <Text style={styles.wrapperText}>Welcome</Text>
          <Text style={styles.wrapperTextforUser}>{username}</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableWithoutFeedback onPress={() => onRefresh()}>
            <Image
              source={images.refresh}
              style={{width: 20, height: 22, marginTop: 3, marginRight: '8%'}}
            />
          </TouchableWithoutFeedback>
          <Notification
            onPress={() => navigation.navigate('Notification')}
            width={30}
            height={29}
            //  source={images.notification}
          />
          <Account
            width={30}
            height={29}
            onPress={() => navigation.navigate('Account')}
          />
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Total
            //source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Total</Text>

            <Text style={styles.statusCount}>
              {/* {dashboardDetails.length > 0
                ? dashboardDetails[0]?.total_count
                : 0} */}
              {videos.length}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Completed
            //  source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Completed</Text>

            <Text style={styles.statusCountForCompleted}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.completed_count
                : 0}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Incompleted
            //   source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>Unwatched</Text>

            <Text style={styles.statusCountForUnwatched}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.unwatched_count
                : 0}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.statusSubContainer}>
            <Completed
            //source={images.total}
            // style={{marginTop: 10, marginLeft: 6}}
            />
            <Text style={styles.statusText}>In Complete</Text>

            <Text style={styles.statusCountForInCompleted}>
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.complete_count
                : 0}
            </Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : videos.length > 0 ? (
        <FlatList
          style={{marginTop: 20}}
          data={videos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['black']}
              tintColor="black"
            />
          }
          ListEmptyComponent={
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: 'DMSans-Bold',
                  color: 'black',
                }}>
                No videos available
              </Text>
              <TouchableOpacity onPress={onRefresh} style={{marginTop: 20}}>
                <Text
                  style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
                  Refresh
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //   <Text
        //     style={{fontSize: 26, fontFamily: 'DMSans-Bold', color: 'black'}}>
        //     No videos available
        //   </Text>
        // </View>
        <></>
      )}
      {/* <FlatList
        style={{marginTop: 20}}
        data={videos}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      /> */}
    </View>
  );
};

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
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
  userProfile: {
    flexDirection: 'column',
    marginTop: 4,
    marginRight: '17%',
  },
  wrapperText: {
    //paddingHorizontal: 15,
    fontSize: 12,
    marginRight: '30%',
    color: 'grey',
    fontWeight: 'normal',
    fontFamily: 'DMSans-Medium',
  },
  wrapperTextforUser: {
    // paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    fontWeight: 'bold',

    color: 'black',
  },
  wrapperLike: {
    fontSize: 13,
    fontFamily: 'DMSans-Medium',
    color: '#22240f',
    fontWeight: '500',
    marginLeft: 3,
    letterSpacing: -0.03,
    //  marginRight: 16,
  },
  notificationContainer: {
    //  justifyContent: 'flex-end',
    // width: '60%',
    marginTop: 10,
    flexDirection: 'row',
  },
  statusContainer: {
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subContainer: {
    backgroundColor: '#f5faff',
    width: '45%',
    height: '75%',
    marginVertical: 20,
    flexDirection: 'row',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 6,
    fontFamily: 'DMSans-Regular',
    //alignSelf: 'center',
  },
  statusSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statusCount: {
    left: 70,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForUnwatched: {
    left: 34,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForInCompleted: {
    left: 26,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  statusCountForCompleted: {
    left: 39,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    //   padding: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    //   borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //  marginBottom: 20,
  },
  image: {
    width: dynamicWidth, // 30% of the screen width
    aspectRatio: 1, // Aspect ratio 1:1 for square images
    marginRight: 10,
    borderRadius: 8,
    height: dynamicHeight,
  },
  textContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  description: {
    fontSize: 14,
    //fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    //  bottom: 57,
  },
  content: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: '#22240f',
    // marginTop: 10,
    fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  wrapperCommentCount: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'DMSans-Medium',
    fontWeight: 'normal',
  },
  wrapperComment: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
});

export default VideoList;
