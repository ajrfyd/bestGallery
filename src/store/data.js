import axios from "axios";

const REQ_DATA = 'images/REQ_DATA';
const REQ_DATA_SUCCESS = 'images/REQ_DATA_SUCCESS';
const REQ_DATA_ERROR = 'images/REQ_DATA_ERROR';


const initialState = {
  loading: false,
  data: null,
  error: null,
}


export const getImgs = (page) => async (dispatch, getState) => {
  const localData = localStorage.getItem('data') || [];
  let { storeData } = getState().dataReducer;
  const API = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=30`
  // const API = `http://localhost:4000/imgs${page}`
  // if(localData) {
  //   console.log('Request to Local');

  //   try {
      
  //     const prevData = [...JSON.parse(localData)];
  //     const { data } = await axios.get(API);
  //     console.log(prevData, data);
  //     const payload = [...prevData, ...data];
  //     localStorage.setItem('data', JSON.stringify(payload))

  //     dispatch({ type: REQ_DATA_SUCCESS, payload })
  //   } catch(e) {
  //     const payload = e;
  //     dispatch({ type: REQ_DATA_ERROR, payload })
  //   }
  //   // const payload = JSON.parse(localData);
  //   // dispatch({ type: REQ_DATA_SUCCESS, payload })
  //   return
  // }

  //!
  // if(localData) {
  //   console.log('aasdas');
  //   console.log(page);
  //   console.log(JSON.parse(localData));
  //   const payload = JSON.parse(localData);
  //   dispatch({ type: REQ_DATA_SUCCESS, payload })
  // }
  // if(!localData) {
  //   dispatch({ type: REQ_DATA })
  //   console.log('this sec is req server')
  //   try {
  //     const res = await axios.get(API);
  //     const payload = res.data;
      
  //     console.log('Request to server')
  //     if(payload) {
  //       localStorage.setItem('data', JSON.stringify(payload))
  //     }
  
  //     dispatch({ type: REQ_DATA_SUCCESS, payload })
  //   } catch(e) {
  //     console.log(e, 'images/reducer')
  //     const payload = e;
  //     dispatch({ type: REQ_DATA_ERROR, payload })
  //   }
  // }

  //?
  // if(localData.length === 0) {
  //   dispatch({ type: REQ_DATA })
  //   try {
  //     const { data } = await axios.get(API)
  //     const payload = data;
  //     console.log(payload)
  //     localStorage.setItem('data', JSON.stringify(payload))
  
  //     dispatch({ type: REQ_DATA_SUCCESS, payload })
  //   } catch(e) {
  //     const payload = e;
  //     dispatch({ type: REQ_DATA_ERROR, payload })
  //   }
  // } else {
  //   const prevData = [...JSON.parse(localData)];
  //   console.log('heoolo?')
  //   console.log(page)
  //   try {
  //     const { data } = await axios.get(API);
  //     console.log(data);
  //     console.log(prevData);
  //     const payload = [...prevData, ...data];
  //     console.log(payload)
  //     dispatch({ type: REQ_DATA_SUCCESS, payload })
  //   } catch(e) {
  //     const payload = e;
  //     dispatch({ type: REQ_DATA_ERROR, payload })
  //   }
    
  // }
  // console.log(storeData);  

  if(storeData && page !== 1) {
    console.log('hello?')
    return
  } 
  if(!storeData && page === 1) {
    dispatch({ type: REQ_DATA })
    try {
      const { data } = await axios.get(API)
      const payload = data;
      // console.log(payload)
      // localStorage.setItem('data', JSON.stringify(payload))
  
      dispatch({ type: REQ_DATA_SUCCESS, payload })
    } catch(e) {
      const payload = e;
      dispatch({ type: REQ_DATA_ERROR, payload })
    }
  }
} 


const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQ_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REQ_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
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