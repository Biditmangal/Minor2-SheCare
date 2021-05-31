import {
  GET_ARTICLES,
  GET_VIDEOS,
  ADD_POST,
  GET_POSTS,
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  USER_LOADING,
  USER_ERROR,
  ERROR_RESET,
  GET_PROFILE,
  UDPATE_LIKE,
  GET_LIKES,
  RESET_PASS,
} from '../constants';

const initialState = {
  error: false,
  loading: false,
  isLoggedIn: false,
  navigate: false,
  token: null,
  status: false,
  uidLoggedIn: null,
  username: null,
  profilePic: null,
  name: null,
  description: null,
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_LOADING: {
      const loading = true;
      const error = false;
      return {
        ...state,
        loading,
        error,
      };
    }
    case USER_ERROR: {
      const loading = false;
      const error = true;
      return {
        ...state,
        loading,
        error,
      };
    }
    case GET_VIDEOS: {
      const {VideoData} = payload;
      const error = false;
      const loading = false;
      return {
        ...state,
        VideoData,
        error,
        loading,
      };
    }
    case GET_ARTICLES: {
      const {ArticleData} = payload;
      const error = false;
      const loading = false;
      return {
        ...state,
        ArticleData,
        error,
        loading,
      };
    }
    case ADD_POST: {
      const error = false;
      const loading = false;

      return {
        ...state,
        error,
        loading,
      };
    }
    case GET_POSTS: {
      const POSTS = payload;
      const error = false;
      const loading = false;
      return {
        ...state,
        POSTS,
        error,
        loading,
      };
    }

    case SIGN_IN: {
      const loading = false;
      const error = false;
      const isLoggedIn = true;
      const uidLoggedIn = payload.uid;
      const username = payload.username;
      const profilePic = payload.profilePic;
      const name = payload.name;
      const description = payload.description;
      return {
        ...state,
        loading,
        error,
        uidLoggedIn,
        isLoggedIn,
        username,
        profilePic,
        name,
        description,
      };
    }
    case SIGN_UP: {
      const loading = false;
      const error = false;
      return {
        ...state,
        loading,
        error,
      };
    }
    case LOGOUT: {
      const loading = false;
      const error = false;
      const isLoggedIn = false;
      const uidLoggedIn = null;
      const username = null;
      const profilePic = null;
      const name = null;
      const description = null;
      const POSTS=null;
      return {
        ...state,
        loading,
        error,
        username,
        profilePic,
        name,
        description,
        isLoggedIn,
        uidLoggedIn,
        POSTS,
      };
    }
    case ERROR_RESET: {
      const error = false;
      return {
        ...state,
        error,
      };
    }
    case GET_PROFILE: {
      const error = false;
      const userDetails = payload;
      return {
        ...state,
        error,
        userDetails,
      };
    }

    case UDPATE_LIKE: {
      const error= false;
      return {
        ...state,
        error,
      };
    }
    case GET_LIKES: {
      const likeList = payload;
      return{
        ...state,
        likeList,
      }
    }

    case RESET_PASS: {
      const loading = false;
      const error = false;
      return{
        ...state,
        loading,
        error,
      }
    }
    default:
      return state;
  }

};
export default authReducer;
