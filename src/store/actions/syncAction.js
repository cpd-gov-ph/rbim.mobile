import * as types from "./types";

// - Sync  Action

export const isSyncing = () => ({
  // Sync Started
  type: types.PROFILE_INFO_LOADING,
});

export const SyncSuccess = (data) => ({
  type: types.PROFILE_INFO_SUCCESS,
  payload: data,
});
export const SyncFailure = (data) => ({
  type: types.PROFILE_INFO_FAILURE,
  payload: data,
});

export const InternetLisitner = (data) => ({
  type: types.INTERNET_LISITENER,
  payload: data,
});
export const BoardCastListener = (data) => ({
  type: types.BROADCAST_LISTNER,
  payload: data,
});
export const SyncLoading = (data) =>({
  type: types.IS_SYNC_LOADING,
  payload: data,
})

export const RecorrectionSyncLoading = (data) =>({
  type: types.IS_RECORRECTION_SYNC_LOADING,
  payload: data,
})