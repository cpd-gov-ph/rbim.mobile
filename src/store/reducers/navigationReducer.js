const InitialState = {
  navigation_target: 0,
  show_intro: 0,
  drawer_survey_show: 0,
};
import * as types from "../actions/types";
export default function navigationReducer(state = InitialState, action) {
  switch (action.type) {
    case types.NAVIGATION_TYPE: {
      return {
        ...state,
        navigation_target: action.payload, // Navigation Target: 0- Get Started 1 - Auth  2 - Home
      };
    }
    case types.SHOW_INTRO: {
      return {
        ...state,
        show_intro: action.payload,
      };
    }
    case types.DRAWER_SURVEY_SHOW: {
      return {
        ...state,
        drawer_survey_show: action.payload,
      };
    }
    default:
      return state;
  }
}
