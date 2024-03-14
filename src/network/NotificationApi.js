import { APIRequest } from "./AxiosUtils"; // API request
import * as constant from "../utils/constant"; // Constant file for API calls
import { snackBar } from "../utils/helpers"; // UI elements
import {
  notificationClearAll,
  notificationClearAllFailure,
  notificationClearAllLoading,
  notificationFailure,
  notificationGetCount,
  notificationGetCountFailure,
  notificationLoading,
  notificationLoadMore,
  notificationSeenAll,
  notificationSeenAllFailure,
  notificationSuccess,
} from "../store/actions/notificationAction"; // Notification actions

export const NotificationAPI =
  (input = {}, currentPage) =>
  (dispatch) => {
    dispatch(notificationLoading());
    return APIRequest({
      url: constant.NOTIFICATION_LIST,
      method: constant.HTTPS_METHOD.POST,
      data: input,
    })
      .then((res) => {
        if (res.status === 1) {
          if (currentPage == 1) {
            dispatch(notificationSuccess(res.data, res.paginator.next_page));
          } else {
            dispatch(notificationLoadMore(res.data, res.paginator.next_page));
          }
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(notificationFailure(""));
      });
  };

export const NotificationClearAllAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(notificationClearAllLoading());
    return APIRequest({
      url: constant.NOTIFICATION_CLEAR_ALL,
      method: constant.HTTPS_METHOD.DELETE,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(notificationClearAll());
          snackBar(res.message);
        } else {
          snackBar(res.message);
        }
      })
      .catch((error) => {
        snackBar(error.message);
        dispatch(notificationClearAllFailure(""));
      });
  };

export const NotificationCountAPI =
  (input = {}) =>
  (dispatch) => {
    return APIRequest({
      url: constant.NOTIFICATION_COUNT,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(notificationGetCount(res.notification_header_count));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {});
  };

export const NotificationSeenAllAPI =
  (input = {}) =>
  (dispatch) => {
    return APIRequest({
      url: constant.NOTIFICATION_SEEN_ALL,
      method: constant.HTTPS_METHOD.PUT,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(notificationSeenAll());
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {});
  };
