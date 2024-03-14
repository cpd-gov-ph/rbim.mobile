/* eslint-disable no-unused-vars */
import AsyncStorage from "@react-native-async-storage/async-storage"; // Local storage
const setUserInformation = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getUserInformation = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setSurveyQuestions = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getSurveyQuestions = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setSurveyPage2 = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getSurveyPage2 = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
const setSurveyPage3 = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getSurveyPage3 = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
const setPageStatus = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getPageStatus = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setSurveyDetails = async (USER_KEY, value) => {
  try {
    await AsyncStorage.setItem(USER_KEY, value);
  } catch (error) {
    console.log("SetItem error ", error);
    return null;
  }
};

const getSurveyDetails = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setOngoingSurveyDetails = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getOngoingSurveyDetails = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setOnSyncSurveyDetails = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getOnSyncSurveyDetails = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setOnSyncReCorrectionData = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getOnSyncReCorrectionData = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setOnSyncReCorrectionLocalData = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getOnSyncReCorrectionLocalData = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

export {
  setUserInformation,
  getUserInformation,
  setPageStatus,
  getPageStatus,
  setSurveyQuestions,
  getSurveyQuestions,
  setSurveyPage2,
  getSurveyPage2,
  setSurveyPage3,
  getSurveyPage3,
  setSurveyDetails,
  getSurveyDetails,
  setOngoingSurveyDetails,
  getOngoingSurveyDetails,
  setOnSyncSurveyDetails,
  getOnSyncSurveyDetails,
  setOnSyncReCorrectionData,
  getOnSyncReCorrectionData,
  setOnSyncReCorrectionLocalData,
  getOnSyncReCorrectionLocalData,
};
