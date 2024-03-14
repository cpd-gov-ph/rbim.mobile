const InitialState = {
  login_response: {},
  login_loading: false,
  forgot_password_loading: false,
  forgot_response: {},
  reset_password_loading: false,
  reset_response: {},
  verify_code_response: {},
  verify_code_loading: false,
  legel_c_loading: false,
  question_response: {},
  question_loading: false,
};

import * as types from "../actions/types";
export default function authReducer(state = InitialState, action) {
  switch (action.type) {
    case types.QUESTIONS_LIST_LOADING: {
      return {
        ...state,
        question_loading: true,
      };
    }
    case types.QUESTIONS_LIST_SUCCESS: {
      return {
        ...state,
        question_loading: false,
        question_response: action.payload,
      };
    }
    case types.QUESTIONS_LIST_FAILURE: {
      return {
        ...state,
        question_loading: false,
        question_response: action.payload,
      };
    }
    case types.USER_LOGIN_LOADING: {
      return {
        ...state,
        login_loading: true,
      };
    }
    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        login_loading: false,
        login_data: action.payload,
      };
    }
    case types.USER_LOGIN_FAILURE: {
      return {
        ...state,
        login_loading: false,
        login_data: action.payload,
      };
    }
    case types.AGREE_LOADING: {
      return {
        ...state,
        legel_c_loading: true,
      };
    }
    case types.AGREE_SUCCESS: {
      return {
        ...state,
        legel_c_loading: false,
      };
    }
    case types.AGREE_FAILURE: {
      return {
        ...state,
        legel_c_loading: false,
      };
    }
    case types.FORGOTPASSWORD_LOADING: {
      return {
        ...state,
        forgot_password_loading: true,
      };
    }
    case types.FORGOTPASSWORD_SUCCESS: {
      return {
        ...state,
        forgot_password_loading: false,
        verify_code_response: action.payload,
      };
    }
    case types.FORGOTPASSWORD_FAILURE: {
      return {
        ...state,
        forgot_password_loading: false,
        verify_code_response: action.payload,
      };
    }
    case types.VERIFY_CODE_LOADING: {
      return {
        ...state,
        verify_code_loading: true,
      };
    }
    case types.VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        verify_code_loading: false,
        reset_response: action.payload,
      };
    }
    case types.VERIFY_CODE_FAILURE: {
      return {
        ...state,
        verify_code_loading: false,
        reset_response: action.payload,
      };
    }
    case types.RESETPASSWORD_LOADING: {
      return {
        ...state,
        reset_password_loading: true,
      };
    }
    case types.RESETPASSWORD_SUCCESS: {
      return {
        ...state,
        reset_password_loading: false,
        reset_response: action.payload,
      };
    }
    case types.RESETPASSWORD_FAILURE: {
      return {
        ...state,
        reset_password_loading: false,
        reset_response: action.payload,
      };
    }
    case types.USER_LOGOUT: {
      return {
        ...state,
        payload: action.payload,
      };
    }
    default:
      return state;
  }
}
