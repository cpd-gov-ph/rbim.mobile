const InitialState = {
  // Survey
  survey_info: {
    survey_no: "",
    is_single: 0,
    quarter_type: "",
  },
  survey_submit_type: "normal",
  survey_entry_id: "",
  userId: "",
  household_info: {
    household_members: 0,
    householdlist: [],
  },
  total_household_members: 0,
  surveyInputData: {},
  survey_notes: "",
  recorrection_notes: "",
  survey_initial_section: [],
  recorrection_initial_section: [],
  survey_part_a: [],
  survey_part_b: [],
  survey_part_c: [],
  members: [],
  survey_c_loading: false,
  survey_a_loading: false,
  survey_part_a_section: [],
  // Recorection
  recorrection_survey_info: {
    survey_no: "",
    is_single: 0,
    quarter_type: "",
  },
  recorrection_household_info: {
    household_members: 0,
    householdlist: [],
  },
  recorrection_survey_part_a: [],
  recorrection_survey_part_b: [],
  recorrection_survey_part_c: [],
  recorrection_survey_c_loading: false,
  recorrection_survey_a_loading: false,
  recorrection_survey_part_a_section: [],
  recorrection_overall_data: [],
  survey_signature: "",
  recorrection_survey_signature: "",
  survey_submit_loading: false,
  survey_submit_response: {},
  recorrection_survey_submit_loading: false,
  ongoing_survey_list: [],
};
import * as types from "../actions/types";
export default function surveyReducer(state = InitialState, action) {
  switch (action.type) {
    case types.USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case types.TOTAL_HOUSEHOLD_MEMBERS: {
      return {
        ...state,
        total_household_members: action.payload,
      };
    }
    case types.SURVEY_ENTRY_ID: {
      return {
        ...state,
        survey_entry_id: action.payload,
      };
    }

    case types.SURVEY_SUBMIT_LOADING: {
      return {
        ...state,
        survey_submit_loading: true,
      };
    }
    case types.SURVEY_SUBMIT_TYPE: {
      return {
        ...state,
        survey_submit_type: action.payload,
      };
    }
    case types.SURVEY_INPUT_DATA: {
      return {
        ...state,
        surveyInputData: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_SUBMIT_SUCESS: {
      return {
        ...state,
        recorrection_survey_submit_loading: false,
      };
    }
    case types.RECORRECTION_SURVEY_SUBMIT_FAILURE: {
      return {
        ...state,
        recorrection_survey_submit_loading: false,
      };
    }
    case types.RECORRECTION_SURVEY_SUBMIT_LOADING: {
      return {
        ...state,
        recorrection_survey_submit_loading: true,
      };
    }
    case types.SURVEY_SUBMIT_SUCESS: {
      return {
        ...state,
        survey_notes: "",
        survey_part_a: [],
        survey_part_b: [],
        survey_part_c: [],
        survey_signature: "",
        members: [],
        household_info: [],
        survey_info: [],
      };
    }
    case types.SURVEY_SUBMIT_FAILURE: {
      return {
        ...state,
        survey_submit_loading: false,
      };
    }
    // Start - Survey Reducer

    case types.HOUSE_HELD_INFO: {
      return {
        ...state,
        household_info: action.payload,
      };
    }
    case types.SURVEY_MEMBERS: {
      return {
        ...state,
        members: action.payload,
      };
    }
    case types.SURVEY_INFO: {
      return {
        ...state,
        survey_info: action.payload,
      };
    }
    // Part - A
    case types.SURVEY_A_QUESTIONS: {
      return {
        ...state,
        survey_a_loading: true,
      };
    }
    case types.SURVEY_A_QUESTIONS_SECTION: {
      return {
        ...state,
        survey_a_loading: false,
        survey_part_a_section: action.payload,
      };
    }
    case types.SURVEY_B_QUESTIONS_DATA: {
      return {
        ...state,
        survey_part_b: action.payload,
      };
    }
    case types.SURVEY_A_QUESTIONS_DATA: {
      return {
        ...state,
        survey_a_loading: false,
        survey_part_a: action.payload,
      };
    }
    case types.SURVEY_A_QUESTIONS_FAILURE: {
      return {
        ...state,
        survey_a_loading: false,
        survey_part_a: action.payload,
      };
    }
    case types.SURVEY_A_QUESTIONS_UPDATE_DATA: {
      return {
        ...state,
        survey_a_loading: false,
      };
    }
    // PART - C
    case types.SURVEY_C_QUESTIONS: {
      return {
        ...state,
        survey_c_loading: true,
      };
    }
    case types.SURVEY_C_QUESTIONS_DATA: {
      return {
        ...state,
        survey_c_loading: false,
        survey_part_c: action.payload,
      };
    }
    case types.SURVEY_PART_C_DATA: {
      return {
        ...state,
        survey_part_c: action.payload,
      };
    }
    case types.SURVEY_C_QUESTIONS_FAILURE: {
      return {
        ...state,
        survey_c_loading: false,
        survey_part_c: action.payload,
      };
    }
    // End - Survey Reducer

    // Start - Recorrection Survey Reducer
    case types.RECORRECTION_HOUSE_HELD_INFO: {
      return {
        ...state,
        recorrection_household_info: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_INFO: {
      return {
        ...state,
        recorrection_survey_info: action.payload,
      };
    }
    // Part - A
    case types.RECORRECTION_SURVEY_A_QUESTIONS: {
      return {
        ...state,
        recorrection_survey_a_loading: true,
      };
    }
    case types.RECORRECTION_SURVEY_A_QUESTIONS_SECTION: {
      return {
        ...state,
        recorrection_survey_a_loading: false,
        recorrection_survey_part_a_section: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_B_QUESTIONS_DATA: {
      return {
        ...state,
        recorrection_survey_part_b: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_A_QUESTIONS_DATA: {
      return {
        ...state,
        recorrection_survey_a_loading: false,
        recorrection_survey_part_a: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_A_QUESTIONS_FAILURE: {
      return {
        ...state,
        recorrection_survey_a_loading: false,
        recorrection_survey_part_a: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_A_QUESTIONS_UPDATE_DATA: {
      return {
        ...state,
        recorrection_survey_a_loading: false,
      };
    }
    // PART - C
    case types.RECORRECTION_SURVEY_C_QUESTIONS: {
      return {
        ...state,
        recorrection_survey_c_loading: true,
      };
    }
    case types.RECORRECTION_SURVEY_C_QUESTIONS_DATA: {
      return {
        ...state,
        recorrection_survey_c_loading: false,
        recorrection_survey_part_c: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_C_QUESTIONS_FAILURE: {
      return {
        ...state,
        recorrection_survey_c_loading: false,
        recorrection_survey_part_c: action.payload,
      };
    }
    case types.RECORRECTION_INITIAL_SECTION: {
      return {
        ...state,
        recorrection_initial_section: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_OVERALL_DATA: {
      return {
        ...state,
        recorrection_overall_data: action.payload,
      };
    }
    case types.SURVEY_INITIAL_SECTION: {
      return {
        ...state,
        survey_initial_section: action.payload,
      };
    }
    case types.SURVEY_NOTES: {
      return {
        ...state,
        survey_notes: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_NOTES: {
      return {
        ...state,
        recorrection_notes: action.payload,
      };
    }
    case types.SURVEY_SIGNATURE: {
      return {
        ...state,
        survey_signature: action.payload,
      };
    }
    case types.RECORRECTION_SURVEY_SIGNATURE: {
      return {
        ...state,
        recorrection_survey_signature: action.payload,
      };
    }
    case types.ONGOING_SURVEY_LIST: {
      return {
        ...state,
        ongoing_survey_list: action.payload,
      };
    }

    default:
      return state;
  }
}
