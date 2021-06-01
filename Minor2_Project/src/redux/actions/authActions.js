import AsyncStorage from '@react-native-community/async-storage';
import mainApi from '../apis';
import {postRef, Firebase, db} from '../../Firebase';
import {getState} from '../store'; // for auth token
import {Alert} from 'react-native';
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
  RESET_PASS,
  UPDATE_PROFILE,
  UPLOAD_IMAGE,
  RETRIEVE_IMAGE,
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
  image,
  imageName,
  likes,
  description,
  timestamp,
  user,
  postId,
) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    // // uploadImage(image, imageName);
    // const storage = Firebase.storage().ref();
    // const folderRef = storage.child('Posts_Images');
    // const imageRef = folderRef.child(imageName);

    // const res = await fetch(image.uri);
    // const blob = await res.blob();

    // const metadata = {
    //   contentType: 'image/jpeg',
    // };
    // await imageRef
    //   .put(blob, metadata)
    //   .then((snapshot) => {
    //     console.log('Image uploaded successfully...');

    //     dispatch({type: UPLOAD_IMAGE, payload: null});
    //   })
    //   .catch((error) => {
    //     console.log('Error in uploading post image==>', error);
    //   });

    // //creating refrence for the retrieval of the image
    // let uploadImageURL = '';
    // await imageRef.getDownloadURL().then((url) => {
    //   uploadImageURL = url;
    // });

    postRef
      .doc(postId)
      .set({
        imageURL: image,
        likes: likes,
        description: description,
        timestamp: timestamp,
        user: user,
      })
      .then(() => {
        dispatch({type: ADD_POST, payload: null});
        console.log('post added successfully...');
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

export const retrieveImage = (imageName) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    const storage = Firebase.storage().ref();
    const folderRef = storage.child('Posts_Images');
    const imageRef = folderRef.child(imageName);

    let uploadImageURL = '';

    await imageRef.getDownloadURL().then((url) => {
      uploadImageURL = url;
    });
    dispatch({type: RETRIEVE_IMAGE, payload: uploadImageURL});
  } catch (error) {
    console.log('error retrieving the image', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const uploadImage = (image, imageName) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    const storage = Firebase.storage().ref();
    const folderRef = storage.child('Posts_Images');
    const imageRef = folderRef.child(imageName);

    const res = await fetch(image.uri);
    const blob = await res.blob();

    const metadata = {
      contentType: 'image/jpeg',
    };
    await imageRef
      .put(blob, metadata)
      .then((snapshot) => {
        console.log('Image uploaded successfully...');
        let uploadImageURL = '';
        imageRef.getDownloadURL().then((url) => {
          uploadImageURL = url;
        });
        dispatch({type: UPLOAD_IMAGE, payload: uploadImageURL});
      })
      .catch((error) => {
        console.log('Error in uploading post image==>', error);
        dispatch({type: USER_ERROR, payload: null});
      });
  } catch (error) {
    console.log('error uplaoding image==>', error);
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

      const uri =
        postarr[post].imageURL == false ? false : postarr[post].imageURL;
      arr = [
        ...arr,
        {
          userid: postarr[post].user,
          profilePic: userData.data().profilePic,
          name: userData.data().name,
          posted: postarr[post].timestamp,
          description: postarr[post].description,
          imageUri: uri,
          postid: postids[post],
        },
      ];
    }

    if (arr.length > 0) {
      dispatch({type: GET_POSTS, payload: arr});
    } else if (arr.length === 0) {
      arr = [];
      dispatch({type: GET_POSTS, payload: arr});
    }
    // if (arr.length > 0) {
    //   dispatch({type: GET_POSTS, payload: arr});
    // } else {
    //   console.log('error getting the post', error);
    //   dispatch({type: USER_ERROR, payload: null});
    // }
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
        // let description = userData.data().description;
        dispatch({
          type: SIGN_IN,
          payload: {
            uid: user,
            username: username,
            profilePic: profilePic,
            name: name,
            // description: description,
          },
        });
        // console.log('userCredentials after login => ', userCredentials.user);
      })
      .catch((error) => {
        dispatch({type: USER_ERROR, payload: null});
        console.log('Error in logging in the user===>', error);
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
        userCredentials.user.sendEmailVerification();
        Alert.alert(
          'Verification email sent. Please verify your email address.',
        );

        if (gender == 'Female') {
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
              description: 'Tell about yourself',
              profilePic:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnxCZSSChVVoLuwjMjLNHi98OaCDn17gqig&usqp=CAU',
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
        } else {
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
              description: 'Tell about yourself',
              profilePic:
                'data:image/jpeg;base64,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',
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
        }
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

export const handlePasswordReset = (email) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
  // const { email } = values

  try {
    await Firebase.auth().sendPasswordResetEmail(email);
    console.log('Password reset email sent successfully');
    dispatch({type: RESET_PASS, payload: null});
    // this.props.navigation.navigate('Login')
  } catch (error) {
    console.log('error in resetting password', error);
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

    console.log('successfully got profileData', userData.data());

    let username = userData.data().username;
    let profilePic = userData.data().profilePic;
    let name = userData.data().name;
    let description = userData.data().description;

    dispatch({
      type: GET_PROFILE,
      payload: {
        username: username,
        profilePic: profilePic,
        name: name,
        description: description,
      },
    });
  } catch (error) {
    console.log('error getting user details', error);
    dispatch({type: USER_ERROR, payload: null});
  }
};

export const updateLike = (postid, state) => async (dispatch) => {
  dispatch({type: USER_LOADING, payload: null});
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
  dispatch({type: USER_LOADING, payload: null});
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

export const updateProfile = (username, name, description) => async (
  dispatch,
) => {
  dispatch({type: USER_LOADING, payload: null});
  try {
    const user = Firebase.auth().currentUser.uid;
    await db
      .collection('users')
      .doc(user)
      .update({
        username: username,
        name: name,
        description: description,
      })
      .then(() => {
        console.log('Updated the profile');
        dispatch({type: UPDATE_PROFILE, payload: true});
      })
      .catch(() => {
        console.log('error updating profile==>', error);
        dispatch({type: USER_ERROR, payload: null});
      });
  } catch (error) {
    console.log('error updating profile==>', error);
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
