import axios from "axios";
// const API = 'http://127.0.0.1:4000/dataTen3';

const REQ_DATA = 'images/REQ_DATA';
const REQ_DATA_SUCCESS = 'images/REQ_DATA_SUCCESS';
const REQ_DATA_ERROR = 'images/REQ_DATA_ERROR';

// const API = `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_ACCESS_KEY}&count=30`

const initialState = {
  loading: false,
  data: null,
  error: null,
  page: 1
}

console.log(process.env.NODE_ENV)

export const getImgs = () => async (dispatch, getState) => {
  const localData = localStorage.getItem('data');
  let { page } = getState().dataReducer;
  const API = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=30`
  console.log('here')
  if(localData && page !== 1) {
    console.log('Request to Local');
    console.log(page)
    console.log(API);
    const prevData = JSON.parse(localData);
    try {
      // console.log(page);
      // const API = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=30`

      const { data } = await axios.get(API);
      const payload = [...prevData, ...data];
      localStorage.setItem('data', JSON.stringify(payload))

      dispatch({ type: REQ_DATA_SUCCESS, payload })
    } catch(e) {
      const payload = e;
      dispatch({ type: REQ_DATA_ERROR, payload })
    }
    // const payload = JSON.parse(localData);
    // dispatch({ type: REQ_DATA_SUCCESS, payload })
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
        data: action.payload,
        page: state.page + 1
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