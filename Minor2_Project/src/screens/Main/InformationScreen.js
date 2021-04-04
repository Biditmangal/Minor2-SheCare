import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import VideoCard from '../../components/VideoCard';

const InformationScreen = () => {
  const [data, setData] = useState({
    VideoData: [
      {
        videoId: '3',
        thumbnail: 'https://i.ytimg.com/vi/lVYC1J5vgkI/maxresdefault.jpg',
        videoAuth: 'MEERA VIJAYANN',
        videoTitle: 'Find your voice against gender violence',
        videoURL: 'https://www.youtube.com/watch?v=sLo97Bu8Fo0',
      },
      {
        videoId: '2',
        thumbnail:
          'https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/8b324338-3caa-4cda-af41-4a0010b2b65e/SherylSandberg_2010W-embed.jpg?c=1050%2C550&w=1050',
        videoAuth: 'SHERYL SANDBERG',
        videoTitle: 'Why we have too few women leaders',
        videoURL: 'https://www.youtube.com/watch?v=18uDutylDa4',
      },
      {
        videoId: '1',
        thumbnail: 'https://i.ytimg.com/vi/vhVWzkbAW4I/maxresdefault.jpg',
        videoAuth: 'Paula Johnson',
        videoTitle: 'His and hers ... health care',
        videoURL: 'https://www.youtube.com/watch?v=vhVWzkbAW4I',
      },
      // {
      //   videoId: 4,
      //   thumbnail: 'https://picsum.photos/700',
      //   videoTitle: 'Health Issues',
      //   videoAuthor: 'Nutritionist',
      // },
      // {
      //   videoId: 5,
      //   thumbnail: 'https://picsum.photos/700',
      //   videoTitle: 'Health Issues',
      //   videoAuthor: 'Nutritionist',
      // },
      // {	
      //   videoId: 6,
      //   thumbnail: 'https://picsum.photos/700',
      //   videoTitle: 'Health Issues',
      //   videoAuthor: 'Nutritionist',
      // },
      // {
      //   videoId: 7,
      //   thumbnail: 'https://picsum.photos/700',
      //   videoTitle: 'Health Issues',
      //   videoAuthor: 'Nutritionist',
      // },
    ],
    ArticleData: [
      {
        articleId: '3',
        thumbnail:
          'https://www.globalfundforwomen.org/wp-content/uploads/2015/04/online-violence-hero1-740x450.jpg',
        description:
          'In the Democratic Republic of Congo, two teens’ private photos, taken by a boyfriend, are posted to Facebook without their consent.',
        title:
          'Online violence: Just because it’s virtual doesn’t make it any less real',
        articleURL:
          'https://www.globalfundforwomen.org/online-violence-just-because-its-virtual-doesnt-make-it-any-less-real',
      },

      {
        articleId: '2',
        thumbnail:
          'https://www.outlookindia.com/outlookmoney/public/uploads/article/gallery/9be11da12bb6fe857bdeee166f469912.jpg',
        description:
          'Today, only 64 per cent of women globally have access to an account in a financial institution, compared to about 71 per cent of men.',
        title:
          'Financially Independent Women Create An Evolved and Equitable Society',
        articleURL:
          'https://www.outlookindia.com/outlookmoney/finance/financially-independent-women-create-an-evolved-and-equitable-society-4471',
      },

      // {
      //   articleId: '4',
      //   thumbnail: '2fjkf',
      //   description: '2fskf',
      //   title: '2fesk',
      //   articleURL: '2fbhs',
      // },

      {
        articleId: '1',
        thumbnail:
          'https://s.yimg.com/ny/api/res/1.2/wcSBW3Mo39YDbeWnOvLJUw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTcwNTtoPTI3NS4zOTA2MjU-/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/ee0cbc20-03d9-11ea-9fdf-f77f49ea8016',
        description:
          'One of the greatest needs of women empowerment is to help women hold their ground – at home and at work. And these platforms are helping us in various fields – from job hunting to even corporate training.',
        title:
          'These Women-centric Platforms are Addressing the Need for Education and Career Enhancement',
        articleURL:
          'https://in.makers.yahoo.com/women-platforms-addressing-education-career-enhancement-skill-023031938.html?guccounter=1',
      },
      // {
      //   articleId: 6,
      //   thumbnail: 'https://picsum.photos/700',
      //   title: 'Health Cure',
      //   description: 'LoremIpsum and bla bla',
      // },
      // {
      //   articleId: 7,
      //   thumbnail: 'https://picsum.photos/700',
      //   title: 'Health Cure',
      //   description: 'LoremIpsum and bla bla',
      // },
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
    marginTop: 10,
    marginBottom: 5,
    // margin:5,
  },
});

export default InformationScreen;
