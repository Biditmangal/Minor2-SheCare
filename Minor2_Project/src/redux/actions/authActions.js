import AsyncStorage from '@react-native-community/async-storage';
import mainApi from '../apis';
import {postRef, Firebase, db} from '../../Firebase';
import {getState} from '../store'; // for auth token
import {
  GET_ARTICLES,
  GET_VIDEOS,
  ADD_POST,
  GET_POSTS,
  SIGN_UP,
  SIGN_IN,
  LOGOUT,
  USER_LOADING,
  USER_ERROR,
  ERROR_RESET,
} from '../constants';

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

export const Login = (email, password) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        let user = userCredentials.user.uid;
        dispatch({
          type: SIGN_IN,
          payload: {
            uid: user,
          },
        });
        console.log('userCredentials after login => ', userCredentials.user);
      })
      .catch((error) => {
        dispatch({type: USER_ERROR, payload: null});
        console.log('Error in logging in the user', error.message, error.code);
      });
  } catch (error) {
    console.log('error logging user', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const Register = (
  email,
  password,
  gender,
  name,
  username,
  mobile_number,
  aadhar_number,
) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        let uid = Firebase.auth().currentUser.uid;
        db.collection('users')
          // .doc(userCredentials.user.uid)
          .doc(uid)
          .set({
            email: email,
            gender: gender,
            name: name,
            username: username,
            mobile_number: mobile_number,
            aadhar_number: aadhar_number,
          })
          .catch((error) => {
            dispatch({type: USER_ERROR, payload: null});
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
        dispatch({type: SIGN_UP, payload: null});
      })
      .catch((error) => {
        dispatch({type: USER_ERROR, payload: null});
        console.log('Error in registering the user', error);
      });
  } catch (error) {
    console.log('error registering user', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};
export const Logout = () => async (dispatch) => {
  console.log('loggin out the user .....');
  dispatch({type: LOGOUT, payload: null});
};

export const ResetError = () => ({
  type: ERROR_RESET,
  payload: null,
});
