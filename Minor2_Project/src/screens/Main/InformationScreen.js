import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ArticleCard from '../../components/ArticleCard';
import VideoCard from '../../components/VideoCard';
import mainApi from '../../redux/apis';
import axios from 'axios';

const requestOne = mainApi.get('/testing/api/getvideos');
const requestTwo = mainApi.get('/testing/api/getarticles');

const InformationScreen = (props) => {

    const [data, setData] = useState({
      VideoData: [],
      ArticleData: [],
    });

    useEffect(() => {
      axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
          const videos = responses[0];
          const articles = responses[1];
          let listv = [];
          let lista = [];
          for (let i in videos.data) {
            listv = [...listv, videos.data[i]];
          }
          for (let i in articles.data) {
            lista = [...lista, articles.data[i]];
          }
          setData({
            VideoData: listv,
            ArticleData: lista,
          });
        })).catch(error=>{
  		  console.log("error in fetching videos and articles" + error);
  	  })
    }, []);

//   useEffect(() => {
//     console.log('loading articles and videos');
//     props.GettingArticles();
//     props.GettingVideos();
//   }, []);

//   let data = props.VideoList && props.VideoList.map((list,index)=>{
// 	  let {videoId, thumbnail, videoAuth, videoTitle, videoURL} = list;
// 	  return(
		  
// 	  )
//   })

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
// const mapStateToProps = (state) => ({
//   loading: state.auth.loading,
//   error: state.auth.error,
//   VideoList: state.auth.VideoData,
//   ArticleList: state.auth.ArticleData,
// });
export default InformationScreen;
// export default connect(mapStateToProps, {GettingVideos, GettingArticles})(
//   InformationScreen,
// );
