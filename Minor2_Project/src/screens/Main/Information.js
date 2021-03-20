import React from 'react';
import {StyleSheet, View} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import VideoCard from '../../components/VideoCard';

const Information = () => {
    const videoItem = {
      thumbnail: 'https://picsum.photos/700',
      videoTitle: 'Health Issues',
      videoAuthor: 'Nutritionist',
    };
    const articleItem = {
      thumbnail: 'https://picsum.photos/700',
      title: 'Health Cure',
      description: 'LoremIpsum and bla bla',
    };
  return (
    <>
      <View style={styles.container}>
          {VideoCard(videoItem)}
          {ArticleCard(articleItem)}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    margin:10,
  },
});

export default Information;
