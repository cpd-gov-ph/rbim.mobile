const InitialState = {
  notification_data: [],
  notification_loading: true,
  notification_clear_all_loading: false,
  next_page: "",
  notification_header_count: 0,
};

import * as types from "../actions/types";
export default function notificationReducer(state = InitialState, action) {
  switch (action.type) {
    case types.NOTIFICATION_LOADING: {
      return {
        ...state,
        notification_loading: true,
      };
    }
    case types.NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notification_loading: false,
        notification_data: action.payload,
        next_page: action.next_page,
      };
    }
    case types.NOTIFICATION_LOAD_MORE: {
      return {
        ...state,
        notification_loading: false,
        notification_data: [...state.notification_data, ...action.payload],
        next_page: action.next_page,
      };
    }
    case types.NOTIFICATION_FAILURE: {
      return {
        ...state,
        notification_loading: false,
        notification_data: action.payload,
      };
    }
    case types.NOTIFICATION_CLEAR_ALL_LOADING: {
      return {
        ...state,
        notification_clear_all_loading: true,
      };
    }
    case types.NOTIFICATION_CLEAR_ALL: {
      return {
        ...state,
        notification_clear_all_loading: false,
        notification_data: [],
      };
    }
    case types.NOTIFICATION_CLEAR_ALL_FAILURE: {
      return {
        ...state,
        notification_clear_all_loading: false,
      };
    }
    case types.NOTIFICATION_GET_COUNT: {
      return {
        ...state,
        notification_header_count: action.payload,
      };
    }
    case types.NOTIFICATION_SEEN_ALL: {
      return {
        ...state,
        notification_header_count: 0,
      };
    }

    default:
      return state;
  }
}
