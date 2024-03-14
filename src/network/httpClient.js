import axios from "axios"; // To make API request
import { store } from "../../App"; // Redux store
import { getUserInformation } from "../utils/localStorage"; // Local storage data
import * as constant from "../utils/constant"; // Constant file for API calls
import { snackBar } from "../utils/helpers"; // UI elements
import { auth_content, storage_key } from "../strings"; // Strings

const httpClient = axios.create({
  baseURL: constant.BASE_URL,
  timeout: constant.TIME_OUT,
});
httpClient.interceptors.request.use(
  async function (config) {
    const UserInfo = await getUserInformation(storage_key.user_information);
    const parsepayload = JSON.parse(UserInfo);
    if (parsepayload !== null) {
      config.headers["Authorization"] = parsepayload.token
        ? `Token ${parsepayload.token}`
        : null;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        store.dispatch(navigationTarget(0));
        let data = { Success: 1 };
        store.dispatch(userLogout(data));
        setTimeout(() => {
          snackBar(auth_content.logout_error);
        }, 1000);
      }
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
