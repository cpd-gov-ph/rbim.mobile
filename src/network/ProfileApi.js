import { APIRequest } from "./AxiosUtils"; // API request
import * as constant from "../utils/constant"; // Constant file for API calls
import {
  profileView,
  profileViewSuccess,
  profileViewFailure,
  LegalDocLoading,
  LegalDocSuccess,
  LegalDocFailure,
} from "../store/actions/profileActions"; // Profile actions

export const ProfileViewAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(profileView());
    return APIRequest({
      url: constant.PROFILE_VIEW,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(profileViewSuccess(res.data));
        } else {
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(profileViewFailure());
      });
  };

export const LegalDocAPI =
  (input = {}) =>
  (dispatch) => {
    dispatch(LegalDocLoading());
    return APIRequest({
      url: constant.LEGAL_DOC,
      method: constant.HTTPS_METHOD.GET,
    })
      .then((res) => {
        if (res.status === 1) {
          dispatch(LegalDocSuccess(res.data));
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(LegalDocFailure(error));
      });
  };
