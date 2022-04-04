import { combineReducers } from "redux";
import dataReducer from "./data";
import keywordReducer from "./keyword";
import userReducer from "./user";

const rootReducer = combineReducers({
  dataReducer,
  keywordReducer,
  userReducer
})

export default rootReducer;