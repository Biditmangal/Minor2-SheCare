import {GET_ARTICLES, GET_VIDEOS} from '../constants';

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
      const getVideos = payload;
      return {
        ...state,
        getVideos,
      };
    }
    case GET_ARTICLES: {
      const getArticles = payload;
      return {
        ...state,
        getArticles,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
