import { combineReducers } from "redux";
import dataReducer from "./data";
import keywordReducer from "./keyword";
import userReducer from "./user";
import notifyReducer from "./notify";
import globalReducer from "./global.js";

const rootReducer = combineReducers({
  dataReducer,
  keywordReducer,
  userReducer,
  notifyReducer,
  globalReducer,
});

export default rootReducer;
