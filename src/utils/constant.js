export const _URL = {
  DEVELOPMENT: "https://122.49.208.51:443/api/",
  UAT: "https://122.49.208.51:443/api/",
  PRODUCTION: "https://122.49.208.51:443/api/",
};

export const HTTPS_METHOD = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};

export const CONTENT_TYPE = {
  application_json: "application/json",
  formdata: "multipart/form-data",
};

export const Environment = {
  dev: "ead996d89696afb6f144",
  prod: "5251c798e98236711fab",
  test: "ead996d89696afb6f144",
};

export const pusherconfiguration = (json) => {
  return {
    dev: {
      appId: "1324097",
      secret: "311a29286da62822cec0",
      cluster: "ap2",
      encrypted: true,
    },
    prod: {
      appId: "1367030",
      secret: "e1bb8dbae13e0e1ea435",
      cluster: "ap2",
      encrypted: true,
    },
  };
};
export const PusherConfig = (json) => {
  return pusherconfiguration(json).prod;
};
export const PUSHER_ENV = Environment.prod; // Not Confignerd

export const BASE_URL = _URL.UAT;

export const TIME_OUT = 250000000;

export const LOGIN = BASE_URL + "dc-login/"; // - Verify the User

export const LOGOUT = BASE_URL + "logout/"; // - User Logout

export const AGREE_LEGAL = BASE_URL + "legal-document-agree/";

export const FORGOT_PASSWORD = BASE_URL + "forgot-password/";

export const VERIFY_FORGOTPASSWORD_CODE = BASE_URL + "verify-code/";

export const RESET_PASSWORD = BASE_URL + "reset-password/";

export const PROFILE_VIEW = BASE_URL + "token-user-view/";

export const RESEND_VERIFICAFICATION_CODE = BASE_URL + "resend-code/";

export const ASSIGNED_TASK_DETAILS = BASE_URL + "home-task-details/";

export const ASSIGNED_TASK_LIST = BASE_URL + "data-collector-task-list/";

export const SURVEY_QUESTION_LIST =
  BASE_URL + "get-suvery-static-all-questions/";

export const UPDATE_SURVEY_QUESTION_STATUS =
  BASE_URL + "data-collector-task-list/";

export const LEGAL_DOC = BASE_URL + "legal-and-documentation/";

export const SURVEY_LIST = BASE_URL + "home-dashboard-details/";

export const RECORRECTION_SURVEY_DETAILS =
  BASE_URL + "view-suvery-entry-question/";

export const RECORRECTION_SURVEY = BASE_URL + "suvery-recorrection-list/";
export const SURVEY_FINAL_SUBMIT = BASE_URL + "create-survey-entry/";

export const RECORRECTION_SURVEY_FINAL_SUBMIT =
  BASE_URL + "survey-recorrection-submit/";

export const ONGOING_API = BASE_URL + "ongoing-survey-entry-submit/";

export const SURVEY_DETAILS = BASE_URL + "get-mb-survey-list/";

export const SURVEY_MB_LOCAL = BASE_URL + "survey-mb-local/";

export const NOTIFICATION_LIST = BASE_URL + "get-notification-list/";

export const NOTIFICATION_CLEAR_ALL = BASE_URL + "clear-all-notification/";

export const NOTIFICATION_COUNT = BASE_URL + "get-notification-header-count/";

export const NOTIFICATION_SEEN_ALL = BASE_URL + "seen-all-notification/";
