import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBLsH0QfeJ7HiytCETfZkgz54c-xfdNIfc',
  authDomain: 'shecare.firebaseapp.com',
  projectId: 'shecare',
  storageBucket: 'shecare.appspot.com',
  messagingSenderId: '572773039254',
  appId: '1:572773039254:web:c1c62f50943f07a605d6b7',
  measurementId: 'G-95E23JLK48',
};

export const Firebase = firebase.default.initializeApp(firebaseConfig);
// console.log(Firebase);

// db initialization
const db = firebase.default.firestore();
const postRef = db.collection('posts');
const postLikedRef = db.collection('postLikes');

//posts collection methods
export const addPost = async (id, data) => {
  postRef.doc(id).add(data);
};
export const deletePost = async (id) => {
  postRef.doc(id).delete();
};
export const likePost = async (id, data) => {
  postLikedRef.doc(id).add(data);
};

export const getPosts = async () => postRef.get();

export const getLikes = async (id) => {
  postRef.doc(id).get();
};
