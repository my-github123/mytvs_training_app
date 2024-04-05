import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Notification from '../../../assets/images/notification.svg';
import Account from '../../../assets/images/account.svg';
import Total from '../../../assets/images/total.svg';
import Completed from '../../../assets/images/Completed.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Incompleted from '../../../assets/images/InCompleted.svg';
import {apiGetWithoutToken} from '../api/Api';

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
//     description: 'Battery Jump Start',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail.jpg',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 2,
//     description: 'Incredible drone footage',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail2.jpg',
//     like_count: 50,
//     comment_count: 10,
//     viewers_count: 250,
//   },
//   {
//     id: 3,
//     description: 'Battery Jump Start',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail.jpg',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 4,
//     description: 'Battery Jump Start',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail.jpg',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 5,
//     description: 'Battery Jump Start',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail.jpg',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
//   {
//     id: 6,
//     description: 'Battery Jump Start',
//     date_created: formattedDate,
//     video_url:
//       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     thumbnail_url: 'https://example.com/thumbnail.jpg',
//     like_count: 100,
//     comment_count: 20,
//     viewers_count: 500,
//   },
// ];

const VideoList = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.log(data, 'data is there......');
      setDashboardDetails(data);
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const getVideos = async () => {
    const userID = await AsyncStorage.getItem('userID');
    try {
      const data = await apiGetWithoutToken(`getVideos/${userID}`);
      setVideos(data);
      setLoading(false);
      console.log(data, 'data is there......');
    } catch (error) {
      console.error('POST error:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(214, 214, 214, 0.5)',
          borderRadius: 8,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <TouchableWithoutFeedback onPress={() => handleVideoPress(item)}>
          <View style={[styles.itemContainer]}>
            <Image source={{uri: item.TumbNailImage}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.Title}</Text>
              <Text style={styles.content}>{item.Description}</Text>
              {/* <Text style={styles.date}>{item.date_created}</Text> */}
            </View>
          </View>
        </TouchableWithoutFeedback>

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
            <Text style={styles.date}>{item.date_created}</Text>
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
          <Notification
            onPress={() => navigation.navigate('Notification')}
            width={30}
            height={29}
            //  source={images.notification}
            style={{marginRight: '8%'}}
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
              {dashboardDetails.length > 0
                ? dashboardDetails[0]?.total_count
                : 0}
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
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{fontSize: 26, fontFamily: 'DMSans-Bold', color: 'black'}}>
            No videos available
          </Text>
        </View>
      )}
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
