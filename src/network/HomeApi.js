import { APIRequest } from "./AxiosUtils"; // API request
import * as constant from "../utils/constant"; // Constant file for API calls
import { snackBar } from "../utils/helpers"; // UI elements
import {
  assignedTaskLoading,
  assignedTaskSuccess,
  assignedTaskFailure,
  assignedTaskListLoading,
  assignedTaskListSuccess,
  assignedTaskListFailure,
  surveyListLoading,
  surveyListSuccess,
  surveyDetailsLoading,
  surveyDetailsSuccess,
  surveyDetailsFailure,
} from "../store/actions/homeActions"; // Home actions
import {
  getOnSyncReCorrectionData,
  getOnSyncReCorrectionLocalData,
  getUserInformation,
  setOnSyncReCorrectionLocalData,
} from "../utils/localStorage"; // Local storage data
import { storage_key } from "../strings"; // Strings

export const AssignedTaskAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(assignedTaskLoading());
    return APIRequest({
      url: constant.ASSIGNED_TASK_DETAILS,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(assignedTaskSuccess(res));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        dispatch(assignedTaskFailure(error));
      });
  };

export const AssignedTaskListAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(assignedTaskListLoading());
    return APIRequest({
      url: constant.ASSIGNED_TASK_LIST,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(assignedTaskListSuccess(res));
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(assignedTaskListFailure(error));
      });
  };

export const SurveyListAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(surveyListLoading());
    return APIRequest({
      url: constant.RECORRECTION_SURVEY,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          getUserInformation(storage_key.user_information)
            .then((resp) => {
              let payload_info = JSON.parse(resp);
              let id = storage_key.survey_localData + payload_info.id;
              let id1 = storage_key.survey_reCorrection + payload_info.id;
              getOnSyncReCorrectionData(id1)
                .then((res1) => {
                  let recorrection_unsync = JSON.parse(res1);
                  if (recorrection_unsync != null) {
                    let conv = res.data.filter(
                      (item) =>
                        !recorrection_unsync.includes(item.survey_number)
                    );
                    dispatch(surveyListSuccess(conv));
                    let json = JSON.stringify(conv);
                    setOnSyncReCorrectionLocalData(id, json);
                  } else {
                    dispatch(surveyListSuccess(res?.data));
                    let json = JSON.stringify(res.data);
                    setOnSyncReCorrectionLocalData(id, json);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.log("Err", error);
            });
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        getUserInformation(storage_key.user_information)
          .then((res) => {
            let payload_info = JSON.parse(res);
            let id = storage_key.survey_localData + payload_info.id;

            getOnSyncReCorrectionLocalData(id)
              .then((json) => {
                let js = JSON.parse(json);
                if (js != null) {
                  if (js.length > 0) {
                    dispatch(surveyListSuccess(js));
                  } else {
                    dispatch(surveyListSuccess([]));
                  }
                }
              })
              .catch((error) => {
                console.log("Err", error);
              });
          })
          .catch((error) => {
            console.log("Err", error);
          });
      });
  };

export const SurveyDetailsAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(surveyDetailsLoading());
    return APIRequest({
      url: constant.SURVEY_DETAILS,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(surveyDetailsSuccess(res.data));
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(surveyDetailsFailure(error));
      });
  };
