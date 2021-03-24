import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import VideoCard from '../../components/VideoCard';

const InformationScreen = () => {
  const [data, setData] = useState({
    VideoData: [
      {
        videoId: 1,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 2,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 3,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 4,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 5,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 6,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
      {
        videoId: 7,
        thumbnail: 'https://picsum.photos/700',
        videoTitle: 'Health Issues',
        videoAuthor: 'Nutritionist',
      },
    ],
    ArticleData: [
      {
        articleId: 1,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 2,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 3,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 4,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 5,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 6,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
      {
        articleId: 7,
        thumbnail: 'https://picsum.photos/700',
        title: 'Health Cure',
        description: 'LoremIpsum and bla bla',
      },
    ],
  });

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            // borderWidth: 1,
            // borderColor: '#FF0000',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={(item) => `${item.videoId}`}
            data={[...data.VideoData]}
            renderItem={({item}) => <VideoCard item={item} />}
            style={{
              flex: 2,
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          keyExtractor={(item) => `${item.articleId}`}
          data={[...data.ArticleData]}
          renderItem={({item}) => <ArticleCard item={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop:10,
    marginBottom:5,
    // margin:5,
  },
});

export default InformationScreen;
