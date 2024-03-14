import * as types from "./types";

export const questionsLoading = () => ({
  type: types.QUESTIONS_LIST_LOADING,
});

export const questionsSuccess = (data) => ({
  type: types.QUESTIONS_LIST_SUCCESS,
  payload: data,
});

export const questionsError = (error) => ({
  type: types.QUESTIONS_LIST_FAILURE,
  payload: error,
});

export const verifyLogin = () => ({
  type: types.USER_LOGIN_LOADING,
});

export const verifyLoginSuccess = (data) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: data,
});

export const verifyLoginError = (error) => ({
  type: types.USER_LOGIN_FAILURE,
  payload: error,
});

export const userToken = (data) => ({
  type: types.USER_TOKEN,
  payload: data,
});

export function userLogout(data) {
  return {
    type: types.USER_LOGOUT,
    payload: data,
  };
}

export const verifyAgree = () => ({
  type: types.AGREE_LOADING,
});

export const verifyAgreeSuccess = (data) => ({
  type: types.AGREE_SUCCESS,
  payload: data,
});

export const verifyAgreeError = (error) => ({
  type: types.AGREE_FAILURE,
  payload: error,
});

export const forgotPassword = () => ({
  type: types.FORGOTPASSWORD_LOADING,
});

export const forgotPasswordSuccess = (data) => ({
  type: types.FORGOTPASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordError = (error) => ({
  type: types.FORGOTPASSWORD_FAILURE,
  payload: error,
});

export const verifyCode = () => ({
  type: types.VERIFY_CODE_LOADING,
});

export const verifyCodeSuccess = (data) => ({
  type: types.VERIFY_CODE_SUCCESS,
  payload: data,
});

export const verifyCodeError = (error) => ({
  type: types.VERIFY_CODE_FAILURE,
  payload: error,
});

export const resetPassword = () => ({
  type: types.RESETPASSWORD_LOADING,
});

export const resetPasswordSuccess = (data) => ({
  type: types.RESETPASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordError = (error) => ({
  type: types.RESETPASSWORD_FAILURE,
  payload: error,
});
