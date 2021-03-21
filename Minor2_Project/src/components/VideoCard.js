import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const borderRadius = 15;
const VideoCard = (props) => {
  return (
    <>
      <Card style={styles.postCardStyle}>
        <Card.Cover
          source={{uri: props.item.thumbnail}}
          style={{
            borderTopRightRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
          }}
        />
        <Card.Title
          title={props.item.videoTitle + " "+ props.item.videoId}
          subtitle={props.item.videoAuthor}
          titleStyle={{
            color: '#263238',
            fontSize: 20,
          }}
          subtitleStyle={{
            fontSize: 14,
            color: '#b5b5b5',
          }}
        />
      </Card>
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
