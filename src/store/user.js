import axios from "axios";

const REQ_USER = 'user/REQ_USER';
const REQ_USER_SUCCESS = 'user/REQ_USER_SUCCESS';
const REQ_USER_ERROR = 'user/REQ_USER_ERROR';
const REQ_USER_LOGOUT = 'user/REQ_USER_LOGOUT';

export const reqUser = (token) => async (dispatch, getState) => {
  dispatch({ type: REQ_USER });

  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        // withCredentials: true
      }
    )

    const payload = {
      id: data.id,
      profileImg: data.profile_image.medium,
      username: data.username
    }
    dispatch({ type: REQ_USER_SUCCESS, payload })
  } catch(e) {
    const payload = e;
    dispatch({ type: REQ_USER_ERROR, payload })
  }
}

export const reqLogout = () => dispatch => {
  dispatch({ type: REQ_USER_LOGOUT })
}

const initialState = {
  loading: false,
  isLogin: false,
  user: null,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQ_USER:
      return {
        ...state,
        loading: true,
      }
    case REQ_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLogin: true,
        error: null,
      }
    case REQ_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        isLogin: false,
        error: action.payload
      }
    case REQ_USER_LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        isLogin: false,
        error: null
      }
    default: 
      return state;
  }
}

export default userReducer;