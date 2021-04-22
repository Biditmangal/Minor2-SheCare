import {GET_ARTICLES, GET_VIDEOS, ADD_POST, GET_POSTS} from '../constants';

const initialState = {
  error: false,
  loading: false,
  isLoggedIn: false,
  navigate: false,
  token: null,
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
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
      const {POSTS} = payload;
      const error = false;
      const loading = false;
      return {
        ...state,
        POSTS,
        error,
        loading,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
