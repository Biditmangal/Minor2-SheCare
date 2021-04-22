import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet,Linking,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const borderRadius = 15;
const VideoCard = (props) => {
  return (
    <>
      <TouchableOpacity onPress={() => Linking.openURL(props.item.videoURL)}>
        <Card style={styles.postCardStyle}>
          <Card.Cover
            source={{uri: props.item.thumbnail}}
            style={{
              borderTopRightRadius: borderRadius,
              borderTopLeftRadius: borderRadius,
            }}
          />
          <Card.Title
            title={props.item.videoTitle + ' ' + props.item.videoId}
            subtitle={props.item.videoAuth}
            titleStyle={{
              color: Colors.textColor,
              fontSize: responsiveFontSize(2.5),
            }}
            subtitleStyle={{
              fontSize: responsiveFontSize(1.8),
              color: Colors.placeholderColor,
            }}
          />
        </Card>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  postCardStyle: {
    width: 170,
    height: 270,
    margin: 5,
    borderRadius: borderRadius,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
export default VideoCard;
