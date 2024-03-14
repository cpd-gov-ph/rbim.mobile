import * as types from "./types";

// Survey Actions

export const survey_info = (data) => ({
  type: types.SURVEY_INFO,
  payload: data,
});

export const household_info = (data) => ({
  type: types.HOUSE_HELD_INFO,
  payload: data,
});

export const survey_info_data = (data) => ({
  type: types.SURVEY_INPUT_DATA,
  payload: data,
});
// Survey_entry_id

export const survey_entry_id = (data) => ({
  type: types.SURVEY_ENTRY_ID,
  payload: data,
});

// - Survey PartA Action

export const total_household_members = (data) => ({
  type: types.TOTAL_HOUSEHOLD_MEMBERS,
  payload: data,
});

export const survey_a_loading = () => ({
  type: types.SURVEY_A_QUESTIONS,
});

export const survey_a_data = (data) => ({
  type: types.SURVEY_A_QUESTIONS_DATA,
  payload: data,
});
export const survey_a_failure = (data) => ({
  type: types.SURVEY_A_QUESTIONS_FAILURE,
  payload: data,
});

export const survey_a_data_update = (data) => ({
  type: types.SURVEY_A_QUESTIONS_UPDATE_DATA,
  payload: data,
});

export const survey_part_a_section = (data) => ({
  type: types.SURVEY_A_QUESTIONS_SECTION,
  payload: data,
});

export const survey_b_data = (data) => ({
  type: types.SURVEY_B_QUESTIONS_DATA,
  payload: data,
});

export const survey_b_members = (data) => ({
  type: types.SURVEY_MEMBERS,
  payload: data,
});

export const survey_c_loading = () => ({
  type: types.SURVEY_C_QUESTIONS,
});
export const survey_c_data = (data) => ({
  type: types.SURVEY_C_QUESTIONS_DATA,
  payload: data,
});
export const survey_c_failure = (data) => ({
  type: types.SURVEY_C_QUESTIONS_FAILURE,
  payload: data,
});

// Submit api type
export const survey_submit_type = (data) => ({
  type: types.SURVEY_SUBMIT_TYPE,
  payload: data,
});

export const surveyPartC = (data) => ({
  type: types.SURVEY_PART_C_DATA,
  payload: data,
});

// ReCorrection Survey Actions

export const recorrection_survey_info = (data) => ({
  type: types.RECORRECTION_SURVEY_INFO,
  payload: data,
});

export const recorrection_household_info = (data) => ({
  type: types.RECORRECTION_HOUSE_HELD_INFO,
  payload: data,
});

export const survey_initial_section = (data) => ({
  type: types.SURVEY_INITIAL_SECTION,
  payload: data,
});

// - ReCorrection Survey PartA Action

export const recorrection_survey_a_loading = () => ({
  type: types.RECORRECTION_SURVEY_A_QUESTIONS,
});

export const recorrection_initital_section = (data) => ({
  type: types.RECORRECTION_INITIAL_SECTION,
  payload: data,
});

export const recorrection_survey_a_data = (data) => ({
  type: types.RECORRECTION_SURVEY_A_QUESTIONS_DATA,
  payload: data,
});
export const recorrection_overall_data = (data) => ({
  type: types.RECORRECTION_SURVEY_OVERALL_DATA,
  payload: data,
});
export const recorrection_survey_a_failure = (data) => ({
  type: types.RECORRECTION_SURVEY_A_QUESTIONS_FAILURE,
  payload: data,
});

export const recorrection_survey_a_data_update = (data) => ({
  type: types.RECORRECTION_SURVEY_A_QUESTIONS_UPDATE_DATA,
  payload: data,
});

export const recorrection_survey_part_a_section = (data) => ({
  type: types.RECORRECTION_SURVEY_A_QUESTIONS_SECTION,
  payload: data,
});

export const recorrection_survey_b_data = (data) => ({
  type: types.RECORRECTION_SURVEY_B_QUESTIONS_DATA,
  payload: data,
});

export const recorrection_survey_c_loading = () => ({
  type: types.RECORRECTION_SURVEY_C_QUESTIONS,
});
export const recorrection_survey_c_data = (data) => ({
  type: types.RECORRECTION_SURVEY_C_QUESTIONS_DATA,
  payload: data,
});
export const recorrection_survey_c_failure = (data) => ({
  type: types.RECORRECTION_SURVEY_C_QUESTIONS_FAILURE,
  payload: data,
});

export const recorrection_survey_failure = (data) => ({
  type: types.RECORRECTION_SURVEY_QUESTIONS_FAILURE,
  payload: data,
});

export const survey_signature = (data) => ({
  type: types.SURVEY_SIGNATURE,
  payload: data,
});

export const recorrection_survey_signature = (data) => ({
  type: types.RECORRECTION_SURVEY_SIGNATURE,
  payload: data,
});

export const survey_notes = (data) => ({
  type: types.SURVEY_NOTES,
  payload: data,
});

export const recorrection_survey_notes = (data) => ({
  type: types.RECORRECTION_SURVEY_NOTES,
  payload: data,
});

export const survey_submit_loading = () => ({
  type: types.SURVEY_SUBMIT_LOADING,
});

export const survey_submit_success = (data) => ({
  type: types.SURVEY_SUBMIT_SUCESS,
  payload: data,
});

export const survey_submit_failure = (data) => ({
  type: types.SURVEY_SUBMIT_FAILURE,
  payload: data,
});

export const recorrection_survey_submit_loading = () => ({
  type: types.RECORRECTION_SURVEY_SUBMIT_LOADING,
});

export const recorrection_survey_submit_success = (data) => ({
  type: types.RECORRECTION_SURVEY_SUBMIT_SUCESS,
  payload: data,
});

export const recorrection_survey_submit_failure = (data) => ({
  type: types.RECORRECTION_SURVEY_SUBMIT_FAILURE,
  payload: data,
});

export const on_going_list = (data) => ({
  type: types.ONGOING_SURVEY_LIST,
  payload: data,
});

// user id

export const user_id = (data) => ({
  type: types.USER_ID,
  payload: data
})