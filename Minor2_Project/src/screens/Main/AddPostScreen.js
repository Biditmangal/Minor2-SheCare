import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import Snackbar from 'react-native-snackbar';

import {FAB} from 'react-native-paper';


import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback, Button} from 'react-native';

import {getPosts, addPost, postRef} from '../../Firebase';
import moment from 'moment';
import {TouchableHighlight} from 'react-native-gesture-handler';

let post_id; // for unique post number

const AddPostScreen = (props) => {
  const [postData, setData] = useState({
    imageURL: '',
    likes: 0,
    description: '',
    timestamp: '',
    user: 'user_1',
  });

  const handleClick = () => {
    post_id = props.route.params.postId;
    console.log(postData.description);
    addPosts(`post_${post_id}`);
  };

  const addPosts = (id) => {
    let date = moment(date).format('DD-MM-YYYY');
    // setData({
    //   ...postData,
    //   timestamp: date,
    // });
    console.log(postData);

    addPost(id, postData)
      .then(() => {
        // setData({
        //   ...postData,
        //   description: '',
        // });
        console.log('Added post successfully',postData);
        Snackbar.show({
          text: 'Post Added Successfully',
          duration: Snackbar.LENGTH_SHORT,
          textColor: Colors.tabIconDefault,
          fontFamily: 'Montserrat-Bold',
          backgroundColor: Colors.primaryColor,
        });
        // Toast.showWithGravity(
        //   'Post Added successfully',
        //   Toast.SHORT,
        //   Toast.BOTTOM,
        // );
        props.navigation.navigate('Community');
      })
      .catch((error) => {
        console.log('error in posting data ', error);
      });
  };

  // useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableHighlight
  //         style={{
  //           backgroundColor: Colors.tintColor,
  //           padding: 7,
  //           paddingHorizontal:10,
  //           marginRight:10,
  //           borderRadius: 5,
  //           justifyContent: 'center',
  //         }}
  //         onPress={handleClick}
  //         >
  //         <Text
  //           style={{
  //             color: Colors.noticeText,
  //             fontSize: responsiveFontSize(2),
  //             fontFamily: 'Montserrat-Bold',
  //           }}>
  //           Post
  //         </Text>
  //       </TouchableHighlight>
  //     ),
  //   });
  // }, [props.navigation]);

  return (
    <View
      style={{
        flex:1,
        // borderColor: 'red',
        // borderWidth: 2,
      }}>
      <KeyboardAvoidingView>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="What's on your mind?"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
            value={postData.description}
            onChangeText={(text) =>
              setData({
                ...postData,
                description: text,
              })
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 40,
          }}>
          <TouchableHighlight
            style={{
              backgroundColor: Colors.tintColor,
              borderRadius: 30,
            }}
            onPress={handleClick}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                width: responsiveWidth(80),
              }}>
              <Icon
                name="image"
                size={responsiveHeight(3)}
                type="font-awesome-5"
                color={Colors.noticeText}
              />
              <Text style={styles.btntext}>Add image</Text>
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          // borderColor: 'red',
          // borderWidth: 2,
        }}>
        <TouchableOpacity onPress={handleClick}>
          <FAB
            style={styles.fabIcon}
            icon="send"
            color="white"
            onPress={handleClick}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
    // paddingHorizontal: responsiveWidth(3),
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  textArea: {
    color: Colors.tabIconDefault,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Medium',
    height: responsiveHeight(30),
    textAlignVertical: 'top',
    padding: 10,
  },
  btntext: {
    marginLeft: 10,
    color: Colors.noticeText,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
  fabIcon: {
    backgroundColor: Colors.tintColor,
  },
});

export default AddPostScreen;
