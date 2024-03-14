const InitialState = {
  broad_cast_listener: "0",
  is_sync_loading: 3, // 1 - upload success, 0 - upload failed, 2 - upload started(on progress), 3 - not started
  is_recorrection_sync_loadign: 3,
};

import * as types from "../actions/types";
export default function syncReducer(state = InitialState, action) {
  switch (action.type) {
    case types.BROADCAST_LISTNER: {
      return {
        ...state,
        broad_cast_listener: action.payload,
      };
    }
    case types.IS_SYNC_LOADING: {
      return {
        ...state,
        is_sync_loading: action.payload,
      };
    }

    case types.IS_RECORRECTION_SYNC_LOADING: {
      return {
        ...state,
        is_recorrection_sync_loadign: action.payload,
      };
    }

    default:
      return state;
  }
}
