import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../constants/Colors';

const CommunityCard = (props) => {
  const [isLiked, updateLike] = useState(false);

  const handleLike = () => {
    //let currentLikedPosts = props.likedPosts;
    if (!isLiked) {
      updateLike(true);
    } else {
      updateLike(false);
    }
  };

  return (
    <Card containerStyle={styles.container}>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: props.item.profilePic}}
          />
        </View>

        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Text style={styles.name}>
            {props.item.name + ' ' + props.item.userid}
          </Text>
          <Text style={styles.posted}>{props.item.posted}</Text>
        </View>

        <View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity onPress={handleLike}> */}
          <TouchableWithoutFeedback onPress={handleLike}>
            <Icon
              name="heart"
              size={responsiveHeight(3)}
              type="font-awesome-5"
              solid={isLiked ? true : false}
              color={isLiked ? Colors.likeColor : Colors.tabIconDefault}
              style={{paddingRight: 5}}
            />
          </TouchableWithoutFeedback>
          {/* </TouchableOpacity> */}
          {/* <Icon
            name="thumbs-down"
            type="font-awesome-5"
            style={{paddingLeft: 5}}
          /> */}
        </View>
      </View>
      <View
        style={{
          flex: 5,
          margin: 5,
        }}>
        <Text style={styles.description}>{props.item.description}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  image: {
    height: responsiveHeight(8),
    width: responsiveWidth(12),
    borderRadius:responsiveWidth(12),
  },
  description: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.textColor,
  },
  name: {
    fontSize: 24,
    color: Colors.textColor,
    marginTop: 2,
  },
  posted: {
    fontSize: 12,
    color: Colors.textColor,
    marginTop: 2,
  },
});

export default CommunityCard;
