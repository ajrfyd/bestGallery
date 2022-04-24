export const NOTIFY = 'notify/NOTIFY';
export const ENQ_NOTIFICATION = 'notify/ENQ_NOTI';
export const DEQ_NOTIFICATION = 'notify/DEQ_NOTI';



export const notify = (msg, disappearTime = 3000) => dispatch => {
  const uuid = Math.random(); 

  dispatch(enqNotification(msg, disappearTime, uuid));
  
  setTimeout(() => {
    dispatch(deqNotification())
  }, disappearTime)

}

const enqNotification = (msg, disappearTime, uuid) => {
  return {
    type: ENQ_NOTIFICATION,
    payload: {
      msg,
      disappearTime,
      uuid
    }
  }
}

const deqNotification = () => {
  return {
    type: DEQ_NOTIFICATION
  }
}

const initialState = {
  notification: []
}

const notifyReducer = (state = initialState, action) => {
  switch(action.type) {
    case ENQ_NOTIFICATION:
      return {
        ...state,
        notification: [...state.notification, action.payload]
      }
    case DEQ_NOTIFICATION:
      return {
        ...state,
        notification: [...state.notification.slice(0, state.notification.length - 1)]
      }
    default:
      return state;
  }
}

export default notifyReducer;