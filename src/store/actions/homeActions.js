import * as types from "./types";

// - Assigned Task Action

export const assignedTaskLoading = () => ({
  type: types.ASSIGNED_TASKS_LOADING,
});

export const assignedTaskSuccess = (data) => ({
  type: types.ASSIGNED_TASKS_SUCCESS,
  payload: data,
});
export const assignedTaskFailure = (data) => ({
  type: types.ASSIGNED_TASKS_FAILURE,
  payload: data,
});

// - Assigned Task List Action

export const assignedTaskListLoading = () => ({
  type: types.ASSIGNED_LIST_TASKS_LOADING,
});

export const assignedTaskListSuccess = (data) => ({
  type: types.ASSIGNED_TASKS_LIST_SUCCESS,
  payload: data,
});
export const assignedTaskListFailure = (data) => ({
  type: types.ASSIGNED_TASKS_LIST_FAILURE,
  payload: data,
});

// - Survey List Action

export const surveyListLoading = () => ({
  type: types.SURVEY_LIST_LOADING,
});

export const surveyListSuccess = (data) => ({
  type: types.SURVEY_LIST_SUCCESS,
  payload: data,
});
export const surveyListFailure = (data) => ({
  type: types.SURVEY_LIST_FAILURE,
  payload: data,
});

// - Survey Details Action

export const surveyDetailsLoading = () => ({
  type: types.SURVEY_DETAILS_LOADING,
});

export const surveyDetailsSuccess = (data) => ({
  type: types.SURVEY_DETAILS_SUCCESS,
  payload: data,
});
export const surveyDetailsFailure = (data) => ({
  type: types.SURVEY_DETAILS_FAILURE,
  payload: data,
});
