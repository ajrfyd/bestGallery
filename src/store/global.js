const OVERLAY_OPEN = "global_OVERLAY_OPEN";
const OVERLAY_CLOSE = "global_OVERLAY_CLOSE";
const SET_URL = "global_SET_URL";

export const openOverlay = () => ({ type: OVERLAY_OPEN });
export const closeOverlay = () => ({ type: OVERLAY_CLOSE });
export const setUrl = (url) => ({ type: SET_URL, payload: url });

const initialState = {
  open: false,
  url: "",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OVERLAY_OPEN:
      return {
        ...state,
        open: true,
      };
    case OVERLAY_CLOSE:
      return {
        ...state,
        open: false,
      };
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
