import { NativeModules } from "react-native";
import axios from "axios"; // To make API request
import * as constant from "../utils/constant"; // Constant file for API calls
import { snackBar } from "../utils/helpers"; // UI elements
import { navigationTarget } from "../store/actions/navigationActions"; // Navigation actions
import { auth_content, storage_key } from "../strings"; // Strings
import Colors from "../themes/colors"; // Themes
import { getUserInformation } from "../utils/localStorage"; // Local storage data
import { store } from "../../App"; // Redux store
import { userLogout } from "../store/actions/authActions"; // Auth actions
const axiosApiInstance = axios.create({
  baseURL: constant.BASE_URL,
  timeout: constant.TIME_OUT,
});

const APIRequest = async (options, content_type = 0) => {
  const onSuccess = (response) => {
    try {
      if (response.data.status === 1) {
        return response.data; // Return Success Response
      } else {
        setTimeout(() => {
          snackBar(response.data.message, 1500, Colors.red_color);
        }, 500);
      }
    } catch (err) {
      //  console.log("error---<", err);
    }
  };

  // Axios Auth Header
  axiosApiInstance.interceptors.request.use(async (request) => {
    const UserInfo = await getUserInformation(storage_key.user_information);
    const parsePayload = JSON.parse(UserInfo);
    if (parsePayload !== null) {
      request.headers["Authorization"] = parsePayload.token
        ? `Token ${parsePayload.token}`
        : null;
    }
    request.headers["Content-Type"] =
      content_type === 0
        ? constant.CONTENT_TYPE.application_json
        : constant.CONTENT_TYPE.formdata;

    return request;
  });

  const onError = function (error) {
    switch (error.response.status) {
      case 420: {
        break;
      }
      case 401: {
        store.dispatch(navigationTarget(0));
        let data = { Success: 1 };
        store.dispatch(userLogout(data));
        NativeModules.Heartbeat.stopService();

        setTimeout(() => {
          snackBar(auth_content.logout_error);
        }, 1000);

        break;
      }
    }
    return Promise.reject(
      error.response.data || error.message || error.config || error.request
    );
  };

  return axiosApiInstance(options).then(onSuccess).catch(onError);
};

export { APIRequest };
