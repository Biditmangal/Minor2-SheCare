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

export const AddingPosts = (
  imageURL,
  likes,
  description,
  timestamp,
  user,
  postId,
) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    postRef
      .doc(postId)
      .set({
        imageURL: imageURL,
        likes: likes,
        description: description,
        timestamp: timestamp,
        user: user,
      })
      .then(() => {
        dispatch({type: ADD_POST, payload: null});
        console.log('post added successfully');
      })
      .catch((error) => {
        dispatch({type: USER_ERROR, payload: null});
        console.log('Error in adding the post', error);
      });
  } catch (error) {
    console.log('error posting the content', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    let arr = [];
    // const query = db.collection('posts').orderBy('timestamp');
    const query = db.collection('posts');
    let obj = {};
    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          // arr.push(doc.data());
          // console.log(doc.data().user);
          // db.collection('users')
          //   .doc(doc.data().user)
          //   .get()
          //   .then((userData) => {
          //     // console.log(userData)
          //     obj = {
          //       userid: userData.uid,
          //       profilePic: userData.profilePic,
          //       name: userData.name,
          //       posted: doc.data().timestamp,
          //       description: doc.data().description,
          //     };
          //   });
          // arr = [...arr, obj];
          arr = [...arr,doc.data()]
        });

        //   postD = response.querySnapshot.map((item) => ({
        //     imageURL: item.imageURL,
        //     likes: item.likes,
        //     description: item.description,
        //     timestamp:item.timestamp,
        //     user: item.user.uid
        //   }));
        // console.log(arr);
        dispatch({type: GET_POSTS, payload: arr});
      })
      .catch((error) => {
        dispatch({type: USER_ERROR, payload: null});
        console.log('Error in adding the post', error);
      });
  } catch (error) {
    console.log('error getting the post', error);
    dispatch({type: USER_ERROR, payload: null});
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
            description: null,
            profilePic: null,
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
