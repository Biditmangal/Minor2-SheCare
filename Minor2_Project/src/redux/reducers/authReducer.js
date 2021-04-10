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
    default:
      return state;
  }
};
export default authReducer;
