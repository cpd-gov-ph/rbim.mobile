import { onApiCall } from "./CommonApi"; // Common API
import * as constant from "../utils/constant"; // Constant file for API calls

export const onSyncSurveyAPICall = (survey_info) => {
    return onApiCall({
      url: constant.SURVEY_FINAL_SUBMIT,
      data: survey_info,
      method: constant.HTTPS_METHOD.POST,
    });
  };

  export const onSyncRecorrectionSurveyAPICall = (survey_info) => {
    return onApiCall({
      url: constant.RECORRECTION_SURVEY_FINAL_SUBMIT,
      data: survey_info,
      method: constant.HTTPS_METHOD.POST,
    });
  };