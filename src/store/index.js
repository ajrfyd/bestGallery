import { combineReducers } from "redux";
import dataReducer from "./data";
import keywordReducer from "./keyword";

const rootReducer = combineReducers({
  dataReducer,
  keywordReducer
})

export default rootReducer;