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
  GET_PROFILE,
  UDPATE_LIKE,
  GET_LIKES,
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

export const getposts = () => {
  return async (dispatch) => {
    dispatch({type: USER_LOADING, payload: null});

    const response = await postRef.get();
    let postarr = [];
    let postids = [];

    response.forEach((post) => {
      postids = [...postids, post.id];
      postarr = [...postarr, post.data()];
    });

    let arr = [];

    for (let post = postarr.length - 1; post >= 0; post--) {
      const userData = await db
        .collection('users')
        .doc(postarr[post].user)
        .get();

      arr = [
        ...arr,
        {
          userid: postarr[post].user,
          profilePic: userData.data().profilePic,
          name: userData.data().name,
          posted: postarr[post].timestamp,
          description: postarr[post].description,
          postid: postids[post],
        },
      ];
    }

    if (arr.length > 0) {
      dispatch({type: GET_POSTS, payload: arr});
    } else {
      console.log('error getting the post', error);
      dispatch({type: USER_ERROR, payload: null});
    }
  };
};

export const Login = (email, password) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        let user = userCredentials.user.uid;
        const userData = await db.collection('users').doc(user).get();

        let username = userData.data().username;
        let profilePic = userData.data().profilePic;
        let name = userData.data().name;
        let description = userData.data().description;
        dispatch({
          type: SIGN_IN,
          payload: {
            uid: user,
            username: username,
            profilePic: profilePic,
            name: name,
            description: description,
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
        db.collection('postLikes').doc(uid).set({});
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

export const getProfile = () => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    const userData = await db
      .collection('users')
      .doc(Firebase.auth().currentUser.uid)
      .get();

    console.log(userData.data());

    dispatch({type: GET_PROFILE, payload: userData.data()});
  } catch (error) {
    console.log('error getting user details', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const updateLike = (postid, state) => async (dispatch) => {
  try {
    const post = await db.collection('posts').doc(postid).get();
    const like = post.data().likes;
    if (state == 1) {
      await db
        .collection('posts')
        .doc(postid)
        .update({
          likes: like + 1,
        })
        .then(async () => {
          console.log('likes updated');

          await db
            .collection('postLikes')
            .doc(Firebase.auth().currentUser.uid)
            .update({
              [postid]: true,
            });
        });
    } else {
      await db
        .collection('posts')
        .doc(postid)
        .update({
          likes: like - 1,
        })
        .then(async () => {
          console.log('likes updated');

          await db
            .collection('postLikes')
            .doc(Firebase.auth().currentUser.uid)
            .update({
              [postid]: false,
            });
        });
    }
    dispatch({type: UDPATE_LIKE, payload: null});
  } catch (error) {
    console.log('error updating like count', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const getLikes = () => async (dispatch) => {
  try {
    const response = await db
      .collection('postLikes')
      .doc(Firebase.auth().currentUser.uid)
      .get();
    console.log('list of liked posts ====> ', response.data());
    dispatch({type: GET_LIKES, payload: response.data()});
  } catch (error) {
    console.log('error getting like list', error);
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
