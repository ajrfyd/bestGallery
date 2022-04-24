import { combineReducers } from "redux";
import dataReducer from "./data";
import keywordReducer from "./keyword";
import userReducer from "./user";
import notifyReducer from "./notify";

const rootReducer = combineReducers({
  dataReducer,
  keywordReducer,
  userReducer,
  notifyReducer
})

export default rootReducer;