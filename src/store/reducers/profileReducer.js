const InitialState = {
  profile_data: {
    first_name: "",
    email: "",
    role: "",
    barangay_id: "",
    data_reviewer_id: "",
    profile: {
      official_number: "",
      dob: "",
      gender: "",
      phone_no: "",
      address: "",
    },
    barangay: {
      id: "",
      first_name: "",
    },
    data_reviewer: {
      id: "",
      first_name: "",
    },
    barangay_location: {
      code: "",
      id: "",
      name: "",
    },
    municipality: {
      code: "",
      id: "",
      name: "",
    },
  },
  profile_loading: true,
  legal_doc_data: {
    term_and_conditions: { title: "", meta_value: "", updated_at: "" },
  },
  legal_doc_loading: true,
};

import * as types from "../actions/types";
export default function profileReducer(state = InitialState, action) {
  switch (action.type) {
    case types.PROFILE_INFO_LOADING: {
      return {
        ...state,
        profile_loading: true,
      };
    }
    case types.PROFILE_INFO_SUCCESS: {
      return {
        ...state,
        profile_loading: false,
        profile_data: action.payload,
      };
    }
    case types.PROFILE_INFO_FAILURE: {
      return {
        ...state,
        profile_loading: false,
      };
    }
    case types.LEGAL_DOC_LOADING: {
      return {
        ...state,
        legal_doc_loading: true,
      };
    }
    case types.LEGAL_DOC_SUCCESS: {
      return {
        ...state,
        legal_doc_loading: false,
        legal_doc_data: action.payload,
      };
    }
    case types.LEGAL_DOC_FAILURE: {
      return {
        ...state,
        legal_doc_loading: false,
      };
    }

    default:
      return state;
  }
}
