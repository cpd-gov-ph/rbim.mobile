import { APIRequest } from "./AxiosUtils"; // API request
import * as constant from "../utils/constant"; // Constant file for API calls
import { navigate } from "../navigation/NavigationService"; // For navigating between screens
import { snackBar } from "../utils/helpers"; // UI elements
import {
  recorrection_survey_a_loading,
  recorrection_survey_a_data,
  recorrection_survey_failure,
  recorrection_survey_b_data,
  recorrection_survey_c_data,
  recorrection_initital_section,
  recorrection_household_info,
  recorrection_overall_data,
  survey_submit_loading,
  survey_submit_success,
  survey_submit_failure,
  recorrection_survey_notes,
  recorrection_survey_submit_loading,
  recorrection_survey_submit_success,
  recorrection_survey_submit_failure,
  recorrection_survey_signature,
} from "../store/actions/surveyActions"; // Survey actions
import { navigation_screens } from "../strings";

export const RecorrectionSurveyDetailAPI =
  (id = 0) =>
  (dispatch) => {
    dispatch(recorrection_survey_a_loading());
    return APIRequest({
      url: `${constant.RECORRECTION_SURVEY_DETAILS}${id}/`,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(recorrection_survey_a_data(res.data.interview_section));
          dispatch(
            recorrection_survey_b_data(res.data.house_hold_member_section)
          );
          dispatch(recorrection_survey_c_data(res.data.final_section));
          dispatch(recorrection_initital_section(res.data.initial_section));
          dispatch(
            recorrection_survey_signature(res.data.data_collector_signature)
          );
          dispatch(recorrection_overall_data(res.data));
          let notes = res.data.notes;
          // console.log('recorrection_survey_res',JSON.stringify(res))

          dispatch(recorrection_survey_notes(notes === null ? "" : notes));

          let household_data = {
            household_members: res.data.household_member_count,
            householdlist: res.data.house_hold_member_section,
          };
          //  console.log('household_data',JSON.stringify(household_data))
          dispatch(recorrection_household_info(household_data));
          setTimeout(() => {
            navigate(navigation_screens.RecorrectionSurveyNumber);
          }, 100);
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(recorrection_survey_failure());
      });
  };

export const SurveyFinalSubmitAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(survey_submit_loading());
    return APIRequest({
      url: constant.SURVEY_FINAL_SUBMIT,
      data: input,
      method: constant.HTTPS_METHOD.POST,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(survey_submit_success(res));
          setTimeout(() => {
            snackBar(res.message);
          }, 1000);
          navigate(navigation_screens.MainScreens);
        } else {
          dispatch(survey_submit_success(res));
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(survey_submit_failure());
      });
  };

export const RecorrectionSurveyFinalSubmitAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(recorrection_survey_submit_loading());
    return APIRequest({
      url: constant.RECORRECTION_SURVEY_FINAL_SUBMIT,
      data: input,
      method: constant.HTTPS_METHOD.POST,
    })
      .then((res) => {
        if (res.status === 1) {
          snackBar(res.message);
          navigate(navigation_screens.MainScreens);
          dispatch(recorrection_survey_submit_success(res));
        } else {
          dispatch(recorrection_survey_submit_success(res));
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(recorrection_survey_submit_failure());
      });
  };
