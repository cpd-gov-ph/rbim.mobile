import { NativeModules } from "react-native";
import { APIRequest } from "./AxiosUtils"; // API request
import * as constant from "../utils/constant"; // Constant file for API call
import { navigate } from "../navigation/NavigationService"; // For navigating between screens
import { snackBar } from "../utils/helpers"; // UI elements
import {
  verifyLogin,
  verifyLoginSuccess,
  verifyLoginError,
  userLogout,
  verifyAgree,
  verifyAgreeSuccess,
  verifyAgreeError,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordError,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeError,
  questionsLoading,
  questionsError,
  questionsSuccess,
} from "../store/actions/authActions"; // Auth actions
import { navigationTarget } from "../store/actions/navigationActions"; // Navigation actions
import { setSurveyQuestions, setUserInformation } from "../utils/localStorage"; // Local storage data
import { navigation_screens, storage_key } from "../strings"; // Strings
import { survey_initial_section } from "../store/actions/surveyActions"; // Survey actions

// Login Verification API

export const LoginAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(verifyLogin());

    return APIRequest({
      url: constant.LOGIN,
      data: input,
      method: constant.HTTPS_METHOD.POST,
    })
      .then((res) => {
        if (res.status === 1) {
          if (res.data.is_agree === 0) {
            setUserInformation(
              storage_key.user_information,
              JSON.stringify(res.data)
            );
            dispatch(verifyLoginSuccess(res));
            navigate(navigation_screens.TermsAndConditions, { terms_data: res.data });
          } else {
            setUserInformation(
              storage_key.user_information,
              JSON.stringify(res.data)
            );

            dispatch(verifyLoginSuccess(res));
            dispatch(navigationTarget(1));
          }
        } else {
          snackBar(res.message);
          dispatch(verifyLoginError());
        }
      })
      .catch((error) => {
        dispatch(verifyLoginError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };

export const LogoutAPI =
  (input = {}) =>
  (dispatch) => {
    return APIRequest({
      url: constant.LOGOUT,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        NativeModules.Heartbeat.stopService();
        dispatch(navigationTarget(0));
        dispatch(userLogout(res));
      })
      .catch((error) => {
        console.log("LogoutAPI Error", error);
      });
  };

export const AgreeAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(verifyAgree());

    return APIRequest({
      url: constant.AGREE_LEGAL,
      data: input,
      method: constant.HTTPS_METHOD.POST,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(navigationTarget(1));
          dispatch(verifyAgreeSuccess());
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        dispatch(verifyAgreeError());
      });
  };

export const ForgotPasswordAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(forgotPassword());
    return APIRequest({
      url: constant.FORGOT_PASSWORD,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          navigate(navigation_screens.CodeVerification, { email: input.email });
          dispatch(forgotPasswordSuccess());
        } else {
          dispatch(forgotPasswordError());
          snackBar(error.message);
        }
      })
      .catch((error) => {
        dispatch(forgotPasswordError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };

export const VerifyCodeAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(verifyCode());
    return APIRequest({
      url: constant.VERIFY_FORGOTPASSWORD_CODE,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          navigate(navigation_screens.ResetPassword, { payload_data: input });
          dispatch(verifyCodeSuccess());
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        dispatch(verifyCodeError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };
export const ResendVerifyCodeAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(verifyCode());
    return APIRequest({
      url: constant.RESEND_VERIFICAFICATION_CODE,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          setTimeout(() => {
            snackBar(res.message);
          }, 500);

          dispatch(verifyCodeSuccess());
        } else {
          setTimeout(() => {
            snackBar(res.message);
          }, 500);
        }
      })
      .catch((error) => {
        dispatch(verifyCodeError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };
export const ResetPasswordAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(resetPassword());
    return APIRequest({
      url: constant.RESET_PASSWORD,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          navigate(navigation_screens.PasswordChanged);
          snackBar(res.message);
          dispatch(resetPasswordSuccess());
        } else {
          snackBar(error.message);
        }
      })
      .catch((error) => {
        dispatch(resetPasswordError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };
export const SurveyQuestionsAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(questionsLoading());
    return APIRequest({
      url: constant.SURVEY_QUESTION_LIST,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          setSurveyQuestions(storage_key.survey_questions, JSON.stringify(res));
          dispatch(survey_initial_section(res.data.initial_section));
          dispatch(questionsSuccess());
        }
      })
      .catch((error) => {
        console.log("questionsError", error);
        dispatch(questionsError());
      });
  };

export const UpdateSurveyQuestionsAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(questionsLoading());
    return APIRequest({
      url: constant.SURVEY_QUESTION_LIST,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(questionsSuccess());
        }
      })
      .catch((error) => {
        dispatch(questionsError());
        setTimeout(() => {
          snackBar(error.message);
        }, 500);
      });
  };
