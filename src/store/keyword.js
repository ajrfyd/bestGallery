import axios from 'axios';
import utils from '../utils';


const GET_DATA = 'keyword/GET_DATA';
const GET_DATA_SUCCESS = 'keyword/GET_DATA_SUCCESS';
const GET_DATA_ERROR = 'keyword/GET_DATA_ERROR';

export const searchData = (key, page = 1) => async dispatch => {
  const history = localStorage.getItem(key + page);
  if(history) {
    const payload = JSON.parse(history);
    dispatch({ type: GET_DATA_SUCCESS, payload })
    
    return 
  }
  dispatch({ type: GET_DATA });
  
  try {
    const API = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    const { data } = await axios.get(API);
    const payload = utils.keywordSearch(data);

    localStorage.setItem(key + page, JSON.stringify(payload));
    console.log(payload)

    dispatch({ type: GET_DATA_SUCCESS, payload });

  } catch(e) {
    const payload = e;
    dispatch({ type: GET_DATA_ERROR, payload });
  }
}

const initialState = {
  loading: false,
  data: null,
  error: null
};

export default function keywordReducer(state = initialState, action) {
  switch(action.type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        data: null
      }
    case GET_DATA_SUCCESS:
      return {
        ...state, 
        loading: false,
        data: action.payload
      }
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null
      }
    default:
      return state;
  }
}