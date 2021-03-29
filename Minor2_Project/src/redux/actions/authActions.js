import AsyncStorage from '@react-native-community/async-storage';
import mainApi from '../apis';
import {getState} from '../store'; // for auth token
import {GET_ARTICLES,GET_VIDEOS} from '../constants';


export const GettingVideos = ()=> async(dispatch)=>{
    try{
        const response = await mainApi.get('');
        dispatch({type:GET_VIDEOS,payload: response.data});
    }catch(error){
        console.log('error getting videos ',error);
    }
};

export const GettingArticles = () => async (dispatch) => {
  try {
    const response = await mainApi.get('');
    dispatch({type: GET_ARTICLES, payload: response.data});
  } catch (error) {
    console.log('error getting articles ', error);
  }
};
