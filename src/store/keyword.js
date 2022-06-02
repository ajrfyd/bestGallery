const GET_KEYWORD = 'keyword/GET_KEYWORD';
const SET_KEYWORD = 'keyword/SET_KEYWORD';
const DEL_KEYWORD = 'keyword/DEL_KEYWORD';

export const getKeyword = () => dispatch => {
  const localData = localStorage.getItem('keywords');

  // 로컬스토리지에서
  // 키워드가 있거나, 빈배열이 아닌 경우
  // 로컬 스토어를 최신화 해 준다.
  // ! 어떤 컴퓨터에서든 로컬스토리지에 기록이 있다면 
  // ! 기록을 보존 할 수 있다.
  if(localData && localData !== '[]') {
    const keywords = JSON.parse(localData);
    // console.log(keywords);
    dispatch({ type: SET_KEYWORD, payload: keywords });
  }

  // 로컬스토리지에 키워드가 없다면
  // 항상 빈 배열로 세팅
  if(!localData) {
    localStorage.setItem('keywords', '[]');
    dispatch({ type: GET_KEYWORD });
  }
  
  // 빈 배열만 있다면 리턴
  if(localData === '[]') {
    return;
  }
}

export const setKeyword = (keyword) => dispatch =>{
  if(keyword) {
    const payload = [keyword];
    const localData = localStorage.getItem('keywords');
    if(localData) {
      const keywords = JSON.parse(localData);
      keywords.unshift(keyword);
      localStorage.setItem('keywords', JSON.stringify(keywords));
      dispatch({ type: SET_KEYWORD, payload });
    }
  }
}

export const delKeyword = (id) => (dispatch, getState) => {
  const localData = localStorage.getItem('keywords');
  if(localData) {
    const keywords = JSON.parse(localData);
    console.log(keywords);
    const newKeywords = keywords.filter(item => item.id !== id);
    console.log(newKeywords);
    localStorage.setItem('keywords', JSON.stringify(newKeywords));
    dispatch({ type: SET_KEYWORD, payload: newKeywords });
  }
}

const initialState = {
  keywords: []
}

export default function keywordReducer(state = initialState, action) {
  switch(action.type) {
    case GET_KEYWORD:
      return {
        ...state
      }
    case SET_KEYWORD:
      return {
        ...state,
        keywords: [...action.payload]
      }
    case DEL_KEYWORD:
      return {
        ...state,
        keywords: [...action.payload]
      }
    default: 
      return state;
  }
}




// import axios from 'axios';
// import utils from '../utils';


// const GET_DATA = 'keyword/GET_DATA';
// const GET_DATA_SUCCESS = 'keyword/GET_DATA_SUCCESS';
// const GET_DATA_ERROR = 'keyword/GET_DATA_ERROR';

// const GET_PAGE = 'keyword/GET_PAGE';
// const GET_PAGE_SUCCESS = 'keyword/GET_PAGE_SUCCESS';
// const GET_PAGE_ERROR = 'keyword/GET_PAGE_ERROR';

// export const searchData = (key, page = 1) => async dispatch => {
//   const history = localStorage.getItem(key + page);
//   if(history) {
//     const payload = JSON.parse(history);
//     dispatch({ type: GET_DATA_SUCCESS, payload })
    
//     return 
//   }

//   dispatch({ type: GET_DATA });
  
//   try {
//     const API = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
//     const { data } = await axios.get(API, {
//       headers: {
//         "Cache-Control": "public, max-age=600",
//       }
//     });
//     // console.log(data)
//     if(data) {
//       const imgData = utils.keywordSearch(data);

//       const payload = {
//         keyword : key,
//         imgData,
//         page
//       }

//       localStorage.setItem(key + page, JSON.stringify(payload));
  
//       dispatch({ type: GET_DATA_SUCCESS, payload });
//     }

//   } catch(e) {
//     const payload = e;
//     dispatch({ type: GET_DATA_ERROR, payload });
//   }
// }

// export const getPage = (page) => async (dispatch, getState) => {
//   const { keywordReducer } = getState();
//   const { keyword } = keywordReducer.data;

//   const history = localStorage.getItem(keyword + page);
//   if(history) {
//     const payload = JSON.parse(history);
//     dispatch({ type: GET_DATA_SUCCESS, payload })    
//     return 
//   }
  
//   dispatch({ type: GET_DATA });
  

//   try {
//     const API = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=30&client_id=${process.env.REACT_APP_ACCESS_KEY}`
//     const { data } = await axios.get(API);

//     if(data) {
//       const imgData = utils.keywordSearch(data);
//       console.log('why did not working???????')

//       const payload = {
//         keyword : keyword,
//         imgData,
//         page
//       }

//       localStorage.setItem(keyword + page, JSON.stringify(payload));
  
//       dispatch({ type: GET_DATA_SUCCESS, payload });
//     }

//   } catch(e) {
//     const payload = e;
//     dispatch({ type: GET_DATA_ERROR, payload });
//   }


//   // dispatch({ type: GET_PAGE });
// }

// const initialState = {
//   loading: false,
//   data: null,
//   pageNum: 1,
//   keyword: null,
//   error: null
// };

// export default function keywordReducer(state = initialState, action) {
//   switch(action.type) {
//     case GET_DATA:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         data: null,
//         keyword: null,
//       }
//     case GET_DATA_SUCCESS:
//       return {
//         ...state, 
//         loading: false,
//         data: action.payload,
//         pageNum: action.payload.page,
//         keyword: action.payload.keyword
//       }
//     case GET_DATA_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         data: null,
//         keyword: null,
//       }
//     case GET_PAGE:
//       return {
//         ...state, 
//       }
//     default:
//       return state;
//   }
// }
