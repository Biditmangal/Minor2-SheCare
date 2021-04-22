import AsyncStorage from '@react-native-community/async-storage';
import mainApi from '../apis';
import {postRef} from '../../Firebase';
import {getState} from '../store'; // for auth token
import {GET_ARTICLES, GET_VIDEOS, ADD_POST, GET_POSTS} from '../constants';

export const GettingVideos = () => async (dispatch) => {
  try {
    const response = await mainApi.get('/testing/api/getvideos');
    if (response.data && response.data.length > 0) {
      let VideoData = response.data.map((item) => ({
        videoId: item.videoId,
        thumbnail: item.thumbnail,
        videoAuth: item.videoAuth,
        videoTitle: item.videoTitle,
        videoURL: item.videURL,
      }));
      dispatch({type: GET_VIDEOS, payload: VideoData});
    } else {
      console.log('error getting videos');
    }
  } catch (error) {
    console.log('error getting videos ', error);
  }
};

export const GettingArticles = () => async (dispatch) => {
  try {
    const response = await mainApi.get('/testing/api/getarticles');
    if (response.data && response.data.length > 0) {
      let ArticleData = response.data.map((item) => ({
        articleId: item.articleId,
        thumbnail: item.thumbnail,
        description: item.description,
        title: item.title,
        articleURL: item.articleURL,
      }));
      dispatch({type: GET_ARTICLES, payload: ArticleData});
    } else {
      console.log('error getting articles ');
    }
  } catch (error) {
    console.log('error getting articles ', error);
  }
};

export const GettingPosts = () => async (dispatch)=>{
  try{
    const repsonse = await 
  }
}