import {
  Dimensions,
  Animated,
  Platform,
  PixelRatio,
  Easing,
  Alert,
  Linking,
} from "react-native";
import Snackbar from "react-native-snackbar"; // UI elements
import Colors from "../themes/colors"; // Themes
import messaging from "@react-native-firebase/messaging"; // For integrating Firebase Cloud Messaging (FCM)
import Moment from "moment"; // For formatting date and time
import AsyncStorage from "@react-native-async-storage/async-storage"; // Local storage
import DeviceInfo from "react-native-device-info"; // To get device information

import { uuid } from 'uuid';

const { height, width } = Dimensions.get("window");
var result;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const font_size = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
const lineHeight = (fontSize) => {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return parseInt(fontSize + fontSize * multiplier, 10);
};
const dimen_size_height = (size) => {
  return (height / 100) * size;
};

const dimen_size_width = (size) => {
  return (width / 100) * size;
};

const validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePassword = (password) => {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
};

const validateSpace = (text) => {
  var char = text.toString();
  if (char.startsWith(" ")) {
    return false;
  } else {
    return true;
  }
};

const allownumonly = (num) => {
  return num.replace(/[^0-9]/g, "");
};
const containsOnlyNumbers = (str) => {
  return /^\d+$/.test(str);
};
const restrict_sc = (text) => {
  return text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};

const restrict_space = (text) => {
  return text.replace(/^\s+|\s+$/gm, "");
};

const snackBar = (txt, duration, color = Colors.red_color) => {
  Snackbar.show({
    text: txt,
    duration: duration,
    backgroundColor: color,
  });
};
const validatePhoneno = (data) => {
  return data.replace(/\D/g, "");
};

function fetchApiCall(url, params) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((responseData) => {
      result = JSON.stringify(responseData);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
* https://stackoverflow.com/questions/54662999/react-native-how-to-store-object-in-asyncstorage
*/
const ACCESS_TOKEN = "adba8ba2-9bfe-4ed6-9c8c-6eef1396cdd1";

function saveTheToken(token) {
    AsyncStorage.setItem(ACCESS_TOKEN, token, (err)=> {
        if(err){
            console.log("an error");
            throw err;
        }
        console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
}

const getTheToken = async() => {
    try {
        const value = await AsyncStorage.getItem(ACCESS_TOKEN);
        return value;
    } catch (error) {
        console.log("error in token");
        // Error retrieving data
        return null;
    }
}

const getFcmToken = async () => {
    fcmToken = await getTheToken();
    if (fcmToken === null) {
        try {
            fcmToken = await messaging().getToken();
            console.log("from firebase messaging: " + fcmToken);
        } catch (error) {
          console.log("caught:" + JSON.stringify(error), null, 2);
          fcmToken = uuid();
        }
      saveTheToken(fcmToken);
      return fcmToken;
    } else {
        return fcmToken;
    }
};

function isIphoneX() {
  const dimension = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimension.height === 780 ||
      dimension.width === 780 ||
      dimension.height === 812 ||
      dimension.width === 812 ||
      dimension.height === 844 ||
      dimension.width === 844 ||
      dimension.height === 896 ||
      dimension.width === 896 ||
      dimension.height === 926 ||
      dimension.width === 926)
  );
}
function VerifyTablet() {
  return DeviceInfo.isTablet();
}
function getBottomSpace(data) {
  return isIphoneX() ? data : 0;
}
function getGreetingTime(m) {
  var g = null; //return g
  if (!m || !m.isValid()) {
    return;
  } //if we can't find a valid or filled moment, we return.

  var split_afternoon = 12; //24hr time to split the afternoon
  var split_evening = 17; //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "Good Afternoon";
  } else if (currentHour >= split_evening) {
    g = "Good Evening";
  } else {
    g = "Good Morning";
  }

  return g;
}
const stringValPatternValidation = (val) => {
  return /\s/g.test(val);
};
const rotate_image = (isFocused) => {
  let spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 100,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: isFocused ? ["90deg", "45deg"] : ["45deg", "90deg"],
  });
  return spin;
};
const parseMessage = (str) => {
  let match = str.match(/\b\d{4}\b/);
  return match && match[0];
};

const getuuid = () => {
  //return Math.floor(Math.random() * (0 - 9999)) + 9999;
  return uuid();
};
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
const addhtml_content = (fontFileName, fileFormat, description) => {
  const fontfamily = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
  });

  return `<html><meta name="viewport" content="initial-scale=1, maximum-scale=0.5"> <head> 

  <style  type="text/css"> img { display: block; max-width: 100%; height: auto; }  @font-face {     font-family: ${fontFileName};     src: url(${fontfamily}) } body {   margin: 25px;    font-size: 35px;   font-family:  ${fontFileName}; } </style> </head>${description} </html>`;
};
const showPermmisonalert = (title, description) => {
  Alert.alert(
    title,
    description,
    [
      { text: "ok", onPress: () => console.log("Do nothing") },
      {
        text: "go to settings",
        onPress: () => Linking.openSettings(),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
};

const showAlert = (title, description, onReport) => {
  Alert.alert(
    title,
    description,
    [
      { text: "cancel", onPress: () => console.log("Do nothing") },
      { text: "Report", onPress: { onReport }, style: "cancel" },
    ],
    {
      cancelable: true,
    }
  );
};

const getMonthList = () => {
  var month_list = Moment.months();
  var result = [];
  month_list.forEach((item, index) => {
    var output = parseInt(index, 10) + 1;
    output += "";
    result.push({
      name: item,
      month: output.length < 2 ? "0" + output : output,
    });
  });
  return result;
};
const getYearList = () => {
  var year_list = new Date().getFullYear();
  var min = year_list - 100;
  var years = [];
  for (var i = year_list; i >= min; i--) {
    years.push({
      name: i - 18,
    });
  }

  return years;
};

function getDays() {
  var date = new Date(2021, 4, 1);
  var days = [];
  while (date.getMonth() === 4) {
    days.push({
      name: String(date.getDate()).padStart(2, "0"),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
}
const SignatureStyle = `body,html {height: ${height * 0.48}px; width: ${
  width - 24
}px; border-radius: 25px border-width : 2px}
.m-signature-pad--footer {display: none; margin: 0px;}.m-signature-pad {
  position: absolute;
  font-size: 10px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
}`;

const TabSignatureStyle = `body,html {height: ${height * 0.48}px; width: ${
  width - 24
}px; border-radius: 25px border-width : 2px}
.m-signature-pad--footer {display: none; margin: 0px;}.m-signature-pad {
  position: absolute;
  font-size: 10px;
  top: -22%;
  left: -10%;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
}`;

function param_check(params) {
  if (params == undefined) {
    return false;
  } else {
    return true;
  }
}
const removeAsyncItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

function isResponseIsValid(response) {
  if (response.status === 200 || response.status === 201) {
    if (response.data.status === 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export {
  dimen_size_height,
  dimen_size_width,
  validateEmail,
  allownumonly,
  snackBar,
  fetchApiCall,
  isIphoneX,
  validatePhoneno,
  font_size,
  getGreetingTime,
  rotate_image,
  lineHeight,
  parseMessage,
  getFcmToken,
  addhtml_content,
  getMonthList,
  getYearList,
  getDays,
  restrict_sc,
  showPermmisonalert,
  getBottomSpace,
  showAlert,
  isEmpty,
  stringValPatternValidation,
  validatePassword,
  SignatureStyle,
  param_check,
  getuuid,
  containsOnlyNumbers,
  removeAsyncItemValue,
  restrict_space,
  validateSpace,
  TabSignatureStyle,
  isResponseIsValid,
  VerifyTablet,
};
