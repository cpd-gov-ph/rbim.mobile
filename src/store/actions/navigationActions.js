import * as types from "./types";

// - navigationTarget

export const navigationTarget = (data) => ({
  type: types.NAVIGATION_TYPE,
  payload: data,

});

export const show_intro = (data) => ({
  
  type: types.SHOW_INTRO,
  payload: data,
});

export const DrawerSurveyShow = (data) =>({
  type: types.DRAWER_SURVEY_SHOW,
  payload: data,
})


