import axios from "axios";
// const API = 'http://127.0.0.1:4000/dataTen3';
// TODO: make count query param dynamic for responsive design
const API = `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_ACCESS_KEY}&count=30`

const REQ_DATA = 'images/REQ_DATA';
const REQ_DATA_SUCCESS = 'images/REQ_DATA_SUCCESS';
const REQ_DATA_ERROR = 'images/REQ_DATA_ERROR';

const initialState = {
  loading: false,
  data: null,
  error: null,
}

console.log(process.env.NODE_ENV)

export const getImg = () => async dispatch => {
  const localData = localStorage.getItem('data');
  if(localData) {
    console.log('Request to Local')
    // TODO: use try / catch block
    const payload = JSON.parse(localData);
    dispatch({ type: REQ_DATA_SUCCESS, payload })
    return
  }

  dispatch({ type: REQ_DATA })

  try {
    const res = await axios.get(API);
    const payload = res.data;
    
    console.log('Request to server')
    if(payload) {
      localStorage.setItem('data', JSON.stringify(payload))
    }

    dispatch({ type: REQ_DATA_SUCCESS, payload })
  } catch(e) {
    console.log(e, 'images/reducer')
    const payload = e;
    dispatch({ type: REQ_DATA_ERROR, payload })
  }
  
}

const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQ_DATA:
      return {
        ...state,
        loading: true
      }
    case REQ_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case REQ_DATA_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state;
  }
}

export default dataReducer;