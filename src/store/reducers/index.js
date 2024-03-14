import * as types from "../actions/types";
import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import homeReducer from "./homeReducer";
import surveyReducer from "./surveyReducer";
import notificationReducer from "./notificationReducer";
import syncReducer from "./syncReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appReducer = combineReducers({
  navigationReducer,
  authReducer,
  profileReducer,
  homeReducer,
  surveyReducer,
  syncReducer,
  notificationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.USER_LOGOUT) {
    Object.keys(state).forEach((key) => {
      console.log("Object keys", key);
      if (key !== "navigationReducer") {
        //    state = undefined;
        AsyncStorage.removeItem(`persist:${key}`);
      }
    });
    const { navigationReducer } = state;
    state = { navigationReducer };
  }
  return appReducer(state, action);
};
export default rootReducer;
