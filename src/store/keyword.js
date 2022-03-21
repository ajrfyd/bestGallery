import axios from 'axios';
import utils from '../utils';


const GET_DATA = 'keyword/GET_DATA';
const GET_DATA_SUCCESS = 'keyword/GET_DATA_SUCCESS';
const GET_DATA_ERROR = 'keyword/GET_DATA_ERROR';

const GET_PAGE = 'keyword/GET_PAGE';
const GET_PAGE_SUCCESS = 'keyword/GET_PAGE_SUCCESS';
const GET_PAGE_ERROR = 'keyword/GET_PAGE_ERROR';

// TODO: use semi-colon
export const searchData = (key, page = 1) => async dispatch => {
  console.log(page, '112512451245125123')
  const history = localStorage.getItem(key + page);
  if(history) {
    // TODO: use try / catch block
    const payload = JSON.parse(history);
    dispatch({ type: GET_DATA_SUCCESS, payload })
    
    return 
  }

  dispatch({ type: GET_DATA });
  
  try {
    const API = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    const { data } = await axios.get(API);

    if(data) {
      const imgData = utils.keywordSearch(data);
      console.log(page, 'why did not working???????')

      const payload = {
        keyword : key,
        imgData,
        page
      }

      localStorage.setItem(key + page, JSON.stringify(payload));
  
      dispatch({ type: GET_DATA_SUCCESS, payload });
    }

  } catch(e) {
    const payload = e;
    dispatch({ type: GET_DATA_ERROR, payload });
  }
}

export const getPage = (page) => async (dispatch, getState) => {
  const { keywordReducer } = getState();
  const { keyword } = keywordReducer.data;

  const history = localStorage.getItem(keyword + page);
  if(history) {
    // TODO: use try / catch block
    const payload = JSON.parse(history);
    dispatch({ type: GET_DATA_SUCCESS, payload })    
    return 
  }
  
  dispatch({ type: GET_DATA });
  

  try {
    const API = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    const { data } = await axios.get(API);

    if(data) {
      const imgData = utils.keywordSearch(data);
      console.log('why did not working???????')

      const payload = {
        keyword : keyword,
        imgData,
        page
      }

      localStorage.setItem(keyword + page, JSON.stringify(payload));
  
      dispatch({ type: GET_DATA_SUCCESS, payload });
    }

  } catch(e) {
    const payload = e;
    dispatch({ type: GET_DATA_ERROR, payload });
  }


  // dispatch({ type: GET_PAGE });
}

const initialState = {
  loading: false,
  data: null,
  pageNum: 1,
  keyword: null,
  error: null
};

export default function keywordReducer(state = initialState, action) {
  switch(action.type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
        keyword: null,
      }
    case GET_DATA_SUCCESS:
      return {
        ...state, 
        loading: false,
        data: action.payload,
        pageNum: action.payload.page,
        keyword: action.payload.keyword
      }
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
        keyword: null,
      }
    case GET_PAGE:
      return {
        ...state, 
      }
    default:
      return state;
  }
}