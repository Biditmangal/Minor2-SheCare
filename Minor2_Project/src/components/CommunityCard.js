import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import { FAB } from 'react-native-paper';
//import {IconButton} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  useResponsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../constants/Colors';
//import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
//import { faThumbsUp, faThumbsDown } from "@fontawesome/free-solid-svg-icons";

const CommunityCard = (props) => {
  const [isLiked, updateLike] = useState(false);

  const handleLike = () => {
    //let currentLikedPosts = props.likedPosts;
    if (!isLiked) {
      updateLike(true);
      console.log(isLiked);
    } else {
      updateLike(false);
      console.log(isLiked);
    }
  };

  return (
    
    <Card containerStyle={styles.container}>
      
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 5,
          
        }}>
        <View
          style={{
            flex: 1,
            
            //marginLeft: 5,
            // marginTop: 10,
            //flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: props.item.thumbnail}}
          />
        </View>

        <View
          style={{
            flex: 5,
            // marginLeft: 15,
            // marginRight: 45,
            
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
            alignItems:'center',
            
            //marginRight: 10,
            //marginBottom:10,
          }}>
          <TouchableOpacity 
            onPress={handleLike}>
            <Icon
              name="heart"
              size={responsiveHeight(3)}
              type="font-awesome-5"
              solid={isLiked? true:false}
              color={isLiked? Colors.likeColor: Colors.tabIconDefault}
              style={{paddingRight: 5}}
            />
          </TouchableOpacity>

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
          //marginRight: 40,
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
    marginHorizontal:5,
    padding: 10,
  },
  image: {
    height: responsiveHeight(8),
    width: responsiveWidth(8),
    borderRadius: 2 * responsiveWidth(8),
    
  },
  description: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.textColor,
    //marginTop: 30,
    //marginLeft: 10,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CommunityCard;
