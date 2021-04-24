import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Card} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';

import InputField from '../../components/InputField';
//import Textarea from 'react-native-textarea';
import TextButton from '../../components/TextButton';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback, Button} from 'react-native';

import {getPosts, addPost, postRef} from '../../Firebase';
import moment from 'moment';
import { TouchableHighlight } from 'react-native-gesture-handler';

let post_id; // for unique post number

const AddPostScreen = (props) => {
  const [postData, setData] = useState({
    imageURL: '',
    likes: 0,
    description: '',
    timestamp: '',
    user: 'user_1',
  });

  // useEffect(() => {
  //   postRef.get().then((snap) => (post_id = snap.size));
  //   console.log(post_id);
  // }, []);

  const handleClick = () => {
    post_id = props.route.params.postId;
    console.log(post_id);
    addPosts(`post_${post_id}`);
  };
  const addPosts = (id) => {
    let date = moment(date).format('DD-MM-YYYY');
    setData({
      ...postData,
      timestamp: date,
    });
    // console.log(postData);
    addPost(id, postData)
      .then(() => {
        setData({
          ...postData,
          description: '',
        });

        console.log('Added post successfully');
        Toast.showWithGravity('Post Added', Toast.SHORT, Toast.BOTTOM);
        props.navigation.navigate('Community');
      })
      .catch((error) => {
        console.log('error in posting data ', error);
      });
  };

  //var Button = require('react-native-icon-button');
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        
          <TouchableHighlight
            style={{color: Colors.tintColor}}
            onPress={handleClick}>
            <Text style={styles.btntext}>Post</Text>
          </TouchableHighlight>
       
      ),
    });
  }, [navigation]);

  return (
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
          //flex: ,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 40,
        }}>
        <TouchableWithoutFeedback
          style={{color: Colors.tintColor}}
          onPress={handleClick}>
          <Icon
            name="image"
            size={responsiveHeight(3)}
            type="font-awesome-5"
            //marginTop={15}

            //solid={isLiked ? true : false}
            color={Colors.likeColor}
            //style={{paddingRight: 5}}
          />
          <Text style={styles.btntext}>Add image</Text>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
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
    color: Colors.tintColor,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Medium',
    height: responsiveHeight(30),
    textAlignVertical: 'top',
    padding: 10,
  },
  btntext: {
    color: Colors.noticeText,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
});

export default AddPostScreen;
