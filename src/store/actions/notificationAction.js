import * as types from "./types";

// - Notification Action

export const notificationLoading = () => ({
  type: types.NOTIFICATION_LOADING,
});

export const notificationSuccess = (data,next_page) => ({
  type: types.NOTIFICATION_SUCCESS,
  payload: data,
  next_page: next_page,
});

export const notificationLoadMore = (data,next_page) => ({
    type: types.NOTIFICATION_LOAD_MORE,
    payload: data,
    next_page: next_page,
  });

export const notificationFailure = (data) => ({
  type: types.NOTIFICATION_FAILURE,
  payload: data,
});

// - Notification Clear all Action

export const notificationClearAllLoading = () => ({
  type: types.NOTIFICATION_CLEAR_ALL_LOADING,
});

export const notificationClearAll = () => ({
  type: types.NOTIFICATION_CLEAR_ALL,
});

export const notificationClearAllFailure = (data) => ({
  type: types.NOTIFICATION_CLEAR_ALL_FAILURE,
});

export const notificationGetCount = (data) => ({
  type: types.NOTIFICATION_GET_COUNT,
  payload: data,
});

export const notificationSeenAll = () => ({
  type: types.NOTIFICATION_SEEN_ALL,
});

