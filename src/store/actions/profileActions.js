import * as types from "./types";

// - Profile View Action

export const profileView = () => ({
  type: types.PROFILE_INFO_LOADING
});

export const profileViewSuccess = (data) => ({
  
  type: types.PROFILE_INFO_SUCCESS,
  payload: data,
});
export const profileViewFailure = (data) => ({
  
    type: types.PROFILE_INFO_FAILURE,
    payload: data,
  });

  // - Legal Documentation Action

export const LegalDocLoading = () => ({
  type: types.LEGAL_DOC_LOADING,
});

export const LegalDocSuccess = (data) => ({
  type: types.LEGAL_DOC_SUCCESS,
  payload: data,
});
export const LegalDocFailure = (data) => ({
  type: types.LEGAL_DOC_FAILURE,
  payload: data,
});