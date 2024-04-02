import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  Text,
  StatusBar,
  Platform,
  Modal,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Heart from '../../../assets/images/heart.svg';
import Comment from '../../../assets/images/comment.svg';
import Close from '../../../assets/images/close.svg';
import User from '../../../assets/images/user.svg';
import Notification from '../../../assets/images/notification.svg';
import Account from '../../../assets/images/account.svg';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

import Video from 'react-native-video';
import images from '../../components/images';

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

const VideoPlay = ({route, navigation}) => {
  const {videoData} = route.params;
  console.log(videoData, 'Video URL is theree.');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeModal, setIsLikeModal] = useState(false);
  const [selectVideo, setSelectVideo] = useState(videoData.video_url); // Initialize with the first video URI

  const handleCommentPress = () => {
    console.log('logging........');
    setIsModalVisible(true);
  };

  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const backAction = () => {
      if (fullScreen) {
        Orientation.lockToPortrait();
        setFullScreen(!fullScreen);
        return true;
      } else {
        navigation.goBack();
        setFullScreen(!fullScreen);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [fullScreen]);

  // const handleLikePress = () => {
  //   setIsLikeModal(true);
  // };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeLikeModal = () => {
    setIsLikeModal(false);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  console.log(formattedDate, 'formatted date in the ofifve');

  const DummyData = [
    {
      id: 1,
      description: 'Battery Jump Start',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      like_count: 100,
      comment_count: 20,
      viewers_count: 500,
    },
    {
      id: 2,
      description: 'Incredible drone footage',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail_url: 'https://example.com/thumbnail2.jpg',
      like_count: 50,
      comment_count: 10,
      viewers_count: 250,
    },
    {
      id: 3,
      description: 'Battery Jump Start',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      like_count: 100,
      comment_count: 20,
      viewers_count: 500,
    },
    {
      id: 4,
      description: 'Battery Jump Start',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      like_count: 100,
      comment_count: 20,
      viewers_count: 500,
    },
    {
      id: 5,
      description: 'Battery Jump Start',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      like_count: 100,
      comment_count: 20,
      viewers_count: 500,
    },
    {
      id: 6,
      description: 'Battery Jump Start',
      date_created: formattedDate,
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      like_count: 100,
      comment_count: 20,
      viewers_count: 500,
    },
  ];

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
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
        <TouchableWithoutFeedback
          onPress={() => setSelectVideo(item.video_url)}>
          <View style={[styles.itemContainer]}>
            <Image source={images.thumbnail} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.content}>
                The goal is to help viewers understand what the content is about
                future.
              </Text>
              {/* <Text style={styles.date}>{item.date_created}</Text> */}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 11,
            marginBottom: 10,
          }}>
          <Heart
            //   source={images.heart}
            // tintColor={'#f45b69'}
            width={16.7}
            height={14.7}
          />

          <Text style={styles.wrapperLike}>Like</Text>
          <Comment
            // source={images.comment}
            // tintColor={'#f45b69'}
            style={{marginTop: 1, marginLeft: 5}}
            width={16.7}
            height={14.7}
          />
          <Text style={styles.wrapperLike}>Comment</Text>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.wrapperCommentCount}>{item.like_count}</Text>
            <Text style={styles.wrapperComment}>Likes</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.wrapperCommentCount}>{item.comment_count}</Text>
            <Text style={styles.wrapperComment}>Comment</Text>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '55%',
            }}>
            <Text style={styles.date}>{item.date_created}</Text>
          </View>
        </View>
      </View>
    );
  };

  const [showIcons, setShowIcons] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {!fullScreen && (
        <View style={styles.profileContainer}>
          <User
            //   source={images.profile}
            width={30}
            height={33}
            style={{marginTop: 8}}
          />
          <View style={styles.userProfile}>
            <Text style={styles.wrapperText}>Welcome</Text>
            <Text style={styles.wrapperTextforUser}>Ajay</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Notification
              //  source={images.notification}
              width={30}
              height={29}
              style={{marginRight: '5%'}}
            />
            <Account width={30} height={29} />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={{width: '100%', height: fullScreen ? '100%' : 200}}
        onPress={() => {
          setClicked(true);
          setShowIcons(!showIcons);
        }}>
        <Video
          paused={puased}
          source={{
            uri: selectVideo,
          }}
          ref={ref}
          onProgress={x => {
            console.log(x);
            setProgress(x);
          }}
          // Can be a URL or a local file.
          //  ref={(ref) => {
          //    this.player = ref
          //  }}                                      // Store reference
          //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
          //  onError={this.videoError}

          // Callback when video cannot be loaded
          // muted
          style={{width: '100%', height: fullScreen ? '100%' : 200}}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress?.currentTime) - 10);
                }}>
                <Image
                  source={require('../../../assets/images/backward.png')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!puased);
                }}>
                <Image
                  source={
                    puased
                      ? require('../../../assets/images/play-button.png')
                      : require('../../../assets/images/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress?.currentTime) + 10);
                }}>
                <Image
                  source={require('../../../assets/images/forward.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {format(progress?.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={x => {
                  ref.current.seek(x);
                }}
              />
              <Text style={{color: 'white'}}>
                {format(progress?.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape();
                  }
                  setFullScreen(!fullScreen);
                }}>
                <Image
                  source={
                    fullScreen
                      ? require('../../../assets/images/minimize.png')
                      : require('../../../assets/images/full-size.png')
                  }
                  style={{width: 24, height: 24, tintColor: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        {liked ? (
          <TouchableOpacity onPress={() => handleLikePress()}>
            <Image
              source={require('../../../assets/images/like.png')}
              style={{width: 18, height: 15}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleLikePress()}>
            <Heart width={20} height={17.7} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => handleLikePress()}>
          <Text style={styles.wrapperLike}>{liked ? 'Liked' : 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Comment width={20} height={20} style={{marginLeft: 8}} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.wrapperLike}>Comment</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.videoTopContainer}>
        <View style={styles.videoContainer}>
          <Text style={styles.videoHeadingText}>{videoData.description}</Text>
          <View style={styles.videoPlayingContainer}>
            <Video
              source={{
                uri: selectVideo,
              }}
              style={styles.video}
              controls={true}
              resizeMode="cover"
              onError={error => console.log('Video error:', error)}
              repeat={true}
              muted={false}
              paused={false}
            
            />
          </View>
        
          <View style={styles.bottomContainer}>
            {liked ? (
              <TouchableOpacity onPress={() => handleLikePress()}>
                <Image
                  source={require('../../../assets/images/like.png')}
                  style={{width: 18, height: 15}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleLikePress()}>
                <Heart width={20} height={17.7} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => handleLikePress()}>
              <Text style={styles.wrapperLike}>{liked ? 'Liked' : 'Like'}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Comment width={20} height={20} style={{marginLeft: 8}} />
            </TouchableOpacity>
          
            <TouchableOpacity>
              <Text style={styles.wrapperLike}>Comment</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Your modal content here */}
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,

                justifyContent: 'space-between',
              }}>
              <Text style={styles.titleModel}>Comments</Text>
              <TouchableWithoutFeedback onPress={closeModal}>
                <Close
                  // source={require('../../../assets/images/close.png')}
                  width={24}
                  height={24}
                  style={{marginTop: 18}}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>
            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>
            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>

            {/* <TouchableOpacity onPress={closeModal}>
             
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={likeModal}
        onRequestClose={closeLikeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Your modal content here */}
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,

                justifyContent: 'space-between',
              }}>
              <Text style={styles.titleModel}>Likes</Text>
              <TouchableWithoutFeedback onPress={closeLikeModal}>
                <Image
                  source={require('../../../assets/images/close.png')}
                  style={{width: 24, height: 24, marginTop: 18}}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>
            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>
            <View style={styles.commentContainer}>
              <Image
                source={require('../../../assets/images/commentProfile.png')}
                style={{width: 40, height: 40}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Text style={styles.commentUser}>Venkatesh</Text>
                <Text style={styles.commentDate}>Chennai Dec 13,2021</Text>
              </View>
            </View>

            {/* <TouchableOpacity onPress={closeModal}>
             
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      <Text style={styles.wrapperPendingVideosText}>Next Videos</Text>
      <FlatList
        style={{marginTop: 20}}
        data={DummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  video: {
    flex: 1,
    width: '100%', // Use '100%' to stretch the video to the full width
    //height: 420, // Use '100%' to stretch the video to the full height
    borderRadius: 8,
    aspectRatio: 16 / 11.4,
    height: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 16,
    height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
  userProfile: {
    flexDirection: 'column',
    marginTop: 4,
    marginRight: '17%',
  },
  wrapperText: {
    fontSize: 12,
    marginRight: '30%',
    color: 'grey',
    fontWeight: 'normal',
    fontFamily: 'DMSans-Medium',
  },
  wrapperTextforUser: {
    // paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',

    color: 'black',
  },
  notificationContainer: {
    // justifyContent: 'flex-end',
    //  width: '60%',
    marginTop: 10,
    flexDirection: 'row',
  },
  videoHeadingText: {
    color: '#22240f',

    letterSpacing: 0.03,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    marginTop: 15,
    letterSpacing: 0.03,
    fontFamily: 'DMSans-Bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#22240f',
  },
  videoContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(214, 214, 214, 0.5)',
    borderRadius: 10,
    width: '100%',
    // backgroundColor: 'black',

    //height: 250,
  },
  videoTopContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  videoPlayingContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    height: 220,
    borderRadius: 10,
    width: '90%',

    backgroundColor: 'black',
  },
  bottomContainer: {
    paddingHorizontal: 12,
    marginVertical: 8,
    //   bottom: 5,

    flexDirection: 'row',
    justifyContent: ' flex-start',
  },
  wrapperLike: {
    fontSize: 11,
    color: '#22240f',
    // marginLeft: 8,
    marginTop: 1,
    fontFamily: 'DMSans-Medium',
    marginLeft: 3,
  },
  wrapperComment: {
    color: '#999999',
    fontSize: 12,
    marginLeft: 4,
  },
  wrapperCommentCount: {
    fontSize: 12,
    color: 'black',
    // marginTop: 2,
  },
  wrapperPendingVideosText: {
    color: '#22240f',
    fontSize: 14,
    letterSpacing: 0.03,
    paddingHorizontal: 18,
    marginTop: 18,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
  },
  listContainer: {
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(214, 214, 214, 0.5)',
    borderWidth: 1,
    marginVertical: 10,
    //  backgroundColor: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    //  padding: 10,
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
    //justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    //  marginBottom: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // padding: 100,
    width: '100%',
    height: 518,
  },
  titleModel: {
    color: '#22240f',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.03,
    marginTop: 22,
  },
  commentContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    paddingTop: 35,
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderColor: '#d0d2d3',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  commentUser: {
    color: '#414042',
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentDate: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'rgba(60, 60, 67, 0.5)',
  },
  commentPost: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'black',
  },
  content: {
    fontSize: 12,
  },
});

export default VideoPlay;
