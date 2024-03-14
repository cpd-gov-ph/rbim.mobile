const InitialState = {
  assigned_task_response: {
    message: "",
    recent_task: {},
    status: 1,
    total_task_count: 0,
  },
  assigned_task_loading: true,
  assigned_task_list: { data: [] },
  assigned_list_loading: true,
  survey_list_loading: true,
  survey_list: [],
  survey_details_loading: true,
  survey_details: [],
};

import * as types from "../actions/types";

export default function homeReducer(state = InitialState, action) {
  switch (action.type) {
    case types.ASSIGNED_TASKS_LOADING: {
      return {
        ...state,
        assigned_task_loading: true,
      };
    }
    case types.ASSIGNED_TASKS_SUCCESS: {
      return {
        ...state,
        assigned_task_loading: false,
        assigned_task_response: action.payload,
      };
    }
    case types.ASSIGNED_TASKS_FAILURE: {
      return {
        ...state,
        assigned_task_loading: false,
        assigned_task_response: action.payload,
      };
    }

    case types.ASSIGNED_LIST_TASKS_LOADING: {
      return {
        ...state,
        assigned_list_loading: true,
      };
    }
    case types.ASSIGNED_TASKS_LIST_SUCCESS: {
      return {
        ...state,
        assigned_list_loading: false,
        assigned_task_list: action.payload,
      };
    }
    case types.ASSIGNED_TASKS_LIST_FAILURE: {
      return {
        ...state,
        assigned_list_loading: false,
        assigned_task_list: action.payload,
      };
    }

    case types.SURVEY_LIST_LOADING: {
      return {
        ...state,
        survey_list_loading: true,
      };
    }
    case types.SURVEY_LIST_SUCCESS: {
      return {
        ...state,
        survey_list_loading: false,
        survey_list: action.payload,
      };
    }
    case types.SURVEY_LIST_FAILURE: {
      return {
        ...state,
        survey_list_loading: false,
        survey_list: action.payload,
      };
    }

    case types.SURVEY_DETAILS_LOADING: {
      return {
        ...state,
        survey_details_loading: true,
      };
    }
    case types.SURVEY_DETAILS_SUCCESS: {
      return {
        ...state,
        survey_details_loading: false,
        survey_details: action.payload,
      };
    }
    case types.SURVEY_DETAILS_FAILURE: {
      return {
        ...state,
        survey_details_loading: false,
        survey_details: action.payload,
      };
    }
    default:
      return state;
  }
}
