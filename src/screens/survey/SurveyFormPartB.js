import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import {
  CustomTextInputField,
  DatePickerField,
  DropDownField,
  FieldTitle,
  Footer,
  Header,
  MultiLineTextInputField,
  MultiSelectDropDownField,
} from "../../components"; // Custom components
import Styles from "./survey.styles"; // Survey styles
import Vector from "../../constants/Vector"; // Icons
import {
  survey_form,
  storage_key,
  data_type,
  age_validation,
  survey_questions,
  navigation_screens,
} from "../../strings"; // Strings
import {
  getSurveyQuestions,
  getUserInformation,
  setSurveyDetails,
  setSurveyPage2,
} from "../../utils/localStorage"; // Local storage data
import { param_check, validateSpace } from "../../utils/helpers"; // Helper functions
import moment from "moment"; // For formatting date and time
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import {
  survey_a_data,
  survey_b_data,
  survey_c_data,
} from "../../store/actions/surveyActions"; // Survey actiona
import Colors from "../../themes/colors"; // Themes
import * as constant from "../../utils/constant"; // Constant file for API call
import { APIRequest } from "../../network/AxiosUtils"; // For API call
import Loader from "../../utils/Loader"; // Custom loader
import PauseSurvey from "./PauseSurvey"; // Pause survey modal component

var { width } = Dimensions.get("window");

const SurveyFormPartB = ({ navigation, route }) => {
  const styles = Styles();

  const section_list_b_ref = useRef();
  const dispatch = useDispatch();
  const TextBoxRef = useRef([]);
  const TextRef = useRef([]);

  const [pageNum, setPageNum] = useState(1); // Page Number state
  const [loading, SetLoading] = useState(false);
  const [part_b_data, setPart_b_data] = useState([]);
  const [personIndex, SetPersonIndex] = useState(route.params.user);
  console.log("personIndex", personIndex);

  const [pageIndex, SetPageIndex] = useState(route.params.no);
  console.log("pageIndex", pageIndex);

  const [PauseModel, setPauseModel] = useState(false);
  const survey_notes = useSelector(
    (state) => state?.surveyReducer?.survey_notes
  );
  const surveyInputData = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.surveyInputData
  );
  const survey_initialData = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const members = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.members
  );
  const survey_part_a_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.survey_part_a
  );

  const survey_info_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.survey_info
  );
  const survey_part_b_data = useSelector(
    //Array data of part b
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.survey_part_b
  );

  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.survey_part_c
  );
  const household_members = useSelector(
    (state) => state?.surveyReducer?.household_info.household_members
  );
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.household_info.householdlist
  );
  const survey_entry_id = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.survey_entry_id
  );
  const [totalMembers, SetTotalMembers] = useState(householdlist.length);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // console.log("survey_part_b_data", householdlist[0].category[0].page);

  useEffect(() => {
    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });

    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let form_data = JSON.parse(res);
        //console.log(form_data, "FORM DATA");
        setPart_b_data(
          form_data.data.house_hold_member_section
            .filter((it) => it.page === pageNum)
            .map(({ section, ...rest }) => ({
              data: section,
              ...rest,
            }))
        );
        if (survey_part_c_data.length === 0) {
          dispatch(survey_c_data(form_data.data.final_section));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      keyboardHide.remove();
    };
  }, [pageNum]);

  // On click next button
  // const onClickNext = () => {
  // //  console.log("Final Part B Q", JSON.stringify(part_b_data));
  // setTimeout(() => {
  //   section_list_b_ref.current.scrollToPosition(0, 0, { animated: false });
  // }, 500);
  //   if (pageNum === 6) {
  //     navigation.navigate(navigation_screens.SurveyFormPartC);
  //   } else {
  //     if (pageIndex == 5) {
  //       console.log("personIndex", personIndex);
  //       console.log("householdlist", householdlist.length);

  //       if (householdlist.length == personIndex + 1) {
  //         navigation.navigate(navigation_screens.SurveyFormPartC);
  //       } else {
  //         SetPageIndex(0);
  //         SetPersonIndex(personIndex + 1);
  //       }
  //     } else {
  //       SetPageIndex(pageIndex + 1);
  //     }
  //     // if (householdlist.length == totalMembers) {
  //     //  SetPageIndex(0);
  //     //   SetPersonIndex(1);
  //     // } else {

  //     // }
  //     // setPageNum(pageNum + 1 > 6 ? 6 : pageNum + 1);
  //   }
  // };

  //  On click next button
  const onClickNext = () => {
    let partB = [...householdlist];
    partB[personIndex].category[pageIndex].page.forEach((items, index) => {
      items.section.forEach((item, section_index) => {
        item.questions.forEach((it, question_index) => {
          it.answers.forEach((i, ans_index) => {


             if (!param_check(item.is_enable) || item.is_enable) {
              if(it.is_qn_enable !== false){
                if (
                  i.answer_value === null ||
                  i.answer_value === "" ||
                  i.answer_value.length === 0 ||
                  !validateSpace(i.answer_value)
                ) {
                  i.is_error = true;
                  var obj = {
                    ind: index,
                    section_ind: section_index,
                    question_ind: question_index,
                    ans_ind: ans_index,
                  };
  
                  if (
                    i.dtype == "other_textbox" ||
                    i.dtype == "other_datepicker"
                  ) {
                    if (it.others_status) {
                      error_array.push(obj);
                    }
                  } else {
                    error_array.push(obj);
                  }
  
                  // error_array.push(obj);
                  setError_array([...error_array]);
                  if (error_array.length !== 0) {
                    setError_obj({
                      ind: error_array[0].ind,
                      section_ind: error_array[0].section_ind,
                      question_ind: error_array[0].question_ind,
                      ans_ind: error_array[0].ans_ind,
                    });
  
                    let error_rank =
                      partB[personIndex].category[pageIndex].page[
                        error_array[0].ind
                      ]?.section[error_array[0].section_ind]?.questions[
                        error_array[0].question_ind
                      ]?.answers[error_array[0].ans_ind]?.ranking;
                    let qn_error_rank =
                      partB[personIndex].category[pageIndex].page[
                        error_array[0].ind
                      ]?.section[error_array[0].section_ind]?.questions[
                        error_array[0].question_ind
                      ]?.qn_ranking;
                    TextRef.current[qn_error_rank]?.focus();
                    TextBoxRef.current[error_rank]?.focus();
                  }
                  dispatch(survey_b_data(partB));
                } else {
                }
              }
             
            } else {
              i.answer_value = null;
              dispatch(survey_b_data(partB));
            }
          });
        });
      });
    });

    var error_boolean_array = [];

    householdlist[personIndex].category[pageIndex].page.forEach(
      (items, index) => {
        items.section.forEach((item, section_index) => {
          item.questions.forEach((it, question_index) => {
            if (!param_check(item.is_enable) || item.is_enable) {
              if(it.is_qn_enable !== false){
                it.answers.forEach((i, ans_index) => {
                  if (
                    i.dtype == "other_textbox" ||
                    i.dtype == "other_datepicker"
                  ) {
                    if (it.others_status) {
                      error_boolean_array.push(
                        i.answer_value === null ||
                          i.answer_value === "" ||
                          i.answer_value.length === 0 ||
                          !validateSpace(i.answer_value)
                      );
                    }
                  } else {
                    error_boolean_array.push(
                      i.answer_value === null ||
                        i.answer_value === "" ||
                        i.answer_value.length === 0 ||
                        !validateSpace(i.answer_value)
                    );
                  }
                });
              }
              
            }
          });
        });
      }
    );

    console.log(JSON.stringify(partB), 'partB')

    // SetPageIndex(pageIndex + 1);
    console.log(
      error_boolean_array.every((it) => it === false),
      "BOOLEAN STATUS"
    );
    if (error_boolean_array.every((it) => it === false)) {
      setTimeout(() => {
        try {
          if (section_list_b_ref.current == null) {
          } else {
            section_list_b_ref.current.scrollToPosition(0, 0, {
              animated: false,
            });
          }
        } catch (error) {}
      }, 500);

      if (pageIndex === 5) {
        console.log(pageIndex, "pageNum");
        if (householdlist.length == personIndex + 1) {
          householdlist[personIndex].member_passes = true;
          var check = householdlist.findIndex(
            (item) => item.member_passes == false
          );
          console.log("householdlisthouseholdlist", householdlist);

          if (check == -1) {
            navigation.navigate(navigation_screens.SurveyFormPartC, { no: 1 });
          } else {
            SetPersonIndex(check);
            SetPageIndex(0);
          }
        } else {
          SetPersonIndex(personIndex + 1);
          SetPageIndex(0);
          householdlist[personIndex].member_passes = true;
        }

        // navigation.navigate(navigation_screens.SurveyFormPartC);
      } else {
        if (pageIndex == 5) {
          console.log(pageIndex, "pageNum");
          console.log("personIndex", personIndex);
          console.log("householdlist", householdlist.length);

          if (householdlist.length == personIndex + 1) {
            console.log("OVerall Data", JSON.stringify(householdlist));
            householdlist[personIndex].member_passes = true;

            navigation.navigate(navigation_screens.SurveyFormPartC, { no: 1 });
          } else {
            SetPageIndex(0);
            SetPersonIndex(personIndex + 1);
            console.log("Wrong Index", personIndex);
            householdlist[personIndex].member_passes =
              householdlist[personIndex].member_passes === true ? true : false;
          }
        } else {
          // callApi()
          if (pageIndex === 0) {
            let age =
              householdlist[personIndex].category[5].page[2].section[0].age;
            let gender =
              partB[personIndex].category[5].page[2].section[0].gender;
            console.log("AGE", age);
            console.log("GENDER", gender);
            if (gender === "Female") {
              if (age >= 10 && age <= 54) {
                console.log("Female");
                householdlist[
                  personIndex
                ].category[2].page[0].section[1].is_enable = true;
              } else {
                householdlist[
                  personIndex
                ].category[2].page[0].section[1].is_enable = false;
              }
            } else {
              // householdlist[
              //   personIndex
              // ].category[2].page[0].section[1].is_enable = false;
            }
          }
          console.log("pageIndex", pageIndex);
          SetPageIndex(pageIndex + 1);
          householdlist[personIndex].member_passes =
            householdlist[personIndex].member_passes === true ? true : false;
        }
      }
    }
  };
  // Call Api
  const callApi = async () => {
    let survey_num =
      survey_initialData.section[0].questions[0].answers[0].answer_value;

    let data = {
      ...surveyInputData,
      survey_number: survey_num,
      mobile_next_section: {
        page: "page2",
        user: personIndex,
        no: pageIndex + 1,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: members,
      interview_section: survey_part_a_data,
      household_member_count: members.length,
      house_hold_member_section: [],
      notes: survey_notes,
    };

    const response = await APIRequest({
      url: constant.ONGOING_API,
      method: constant.HTTPS_METHOD.POST,
      data: data,
    });
    if (response.status == 1) {
      SetLoading(false);
      navigation.navigate(navigation_screens.MainScreens);
    }
  };
  const callNextApi = async () => {
    let survey_num =
      survey_initialData.section[0].questions[0].answers[0].answer_value;

    let data = {
      ...surveyInputData,
      survey_number: survey_num,
      mobile_next_section: {
        page: "page2",
        user: 0,
        no: 0,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: members,
      interview_section: survey_part_a_data,
      household_member_count: members.length,
      house_hold_member_section: householdlist,
      notes: survey_notes,
    };

    const response = await APIRequest({
      url: constant.ONGOING_API,
      method: constant.HTTPS_METHOD.POST,
      data: data,
    });
    if (response.status == 1) {
      navigation.navigate(navigation_screens.SurveyFormPartC);
    }
  };
  //On click previous button
  const onClickPrevious = () => {
    // if (householdlist.length == (personIndex + 1)){

    // }else{

    setTimeout(() => {
      if (pageIndex !== 0) {
        section_list_b_ref.current.scrollToPosition(0, 0, { animated: false });
      }
    }, 500);
    if (personIndex == 0) {
      if (pageIndex == 0) {
        navigation.navigate(navigation_screens.HouseholdMembers, {
          user: "back",
        });
      } else {
        SetPageIndex(pageIndex - 1);
      }
    } else {
      if (pageIndex == 0) {
        SetPersonIndex(personIndex - 1);
        SetPageIndex(5);
      } else {
        SetPageIndex(pageIndex - 1);
      }
    }

    // if (pageNum === 1) {
    //   navigation.navigate(navigation_screens.MainScreens);
    //   //  navigation.goBack();
    // }

    //else {
    //   setPageNum(pageNum - 1 < 1 ? 1 : pageNum - 1);
    // }
  };

  //Checks error index returns is_error value
  const error_check = (i, index, section_index, question_index, ans_index) => {
    if (
      error_obj.ind === index &&
      error_obj.section_ind === section_index &&
      error_obj.question_ind === question_index &&
      error_obj.ans_ind === ans_index
    ) {
      return i.is_error;
    }
    return false;
  };

  //Text Input Field
  const TextBoxField = (
    i,
    section_index,
    index,
    question_index,
    ans_index,
    isVisible,
    isQnVisible,
  ) => {
    return (
      <CustomTextInputField
        keyboardType={i.keyboard_type === "number" ? "numeric" : "default"}
        maxLength={i.limitation !== null ? i.limitation : 200}
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, section_index, index, question_index, ans_index);
        }}
        //value={i.answer_value}
        //value={!isVisible || !isQnVisible ? null : i.answer_value}
         value={!isVisible ? null : i.answer_value}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        errorText={
          error_check(i, index, section_index, question_index, ans_index)
            ? i.error_message
            : null
        }
        editable={isVisible && isQnVisible}
        textInputRef={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onSubmitEditing={() => onSubmitEditing(i)}
        returnKeyType={"next"}
        blurOnSubmit={TextBoxRef.current[i.ranking + 1] ? false : true}
      />
    );
  };

  //Multi line Text Input Field
  const MultiLineTextBoxField = (
    i,
    section_index,
    index,
    question_index,
    ans_index,
    isVisible,
  ) => {
    return (
      <MultiLineTextInputField
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, section_index, index, question_index, ans_index);
        }}
        value={!isVisible ? null : i.answer_value}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        errorText={
          error_check(i, index, section_index, question_index, ans_index)
            ? i.error_message
            : null
        }
        editable={isVisible}
        textInputRef={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onSubmitEditing={() => onSubmitEditing(i)}
      />
    );
  };
  //Drop Down Field
  const SelectBoxField = (
    i,
    section_index,
    index,
    question_index,
    ans_index,
    isVisible = true,
    isQnVisible = true,
  ) => {
    return (
      <DropDownField
        drop_down_ref={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onFocus={() => Keyboard.dismiss()}
        placeholder={i.placeholder}
        data={i.options}
        onchangeText={(val) => {
          onChangeText(val, section_index, index, question_index, ans_index);
        }}
        isVisible={
          param_check(i.show_dropdown_modal) ? i.show_dropdown_modal : false
        }
        dropDownPress={() => {
          ShowDropDownModal(section_index, index, question_index, ans_index);
        }}
        selectedValue={!isVisible ? null : i.answer_value}
        closeModal={() =>
          onCloseDropDownModal(section_index, index, question_index, ans_index)
        }
        onGetValue={(val) =>
          onTextChange(val, section_index, index, question_index, ans_index)
        }
        dropDownTitle={i.placeholder}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        error_message={
          error_check(i, index, section_index, question_index, ans_index)
            ? i.error_message
            : null
        }
        disabled={!isVisible || !isQnVisible}
      />
    );
  };
  //Multi select Drop Down Field
  const MultiSelectBoxField = (
    i,
    section_index,
    index,
    question_index,
    ans_index,
    isVisible = true
  ) => {
    return (
      <MultiSelectDropDownField
        drop_down_ref={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onFocus={() => Keyboard.dismiss()}
        placeholder={i.placeholder}
        options_data={i.options}
        onchangeText={(val) => {
          onChangeText(val, section_index, index, question_index, ans_index);
        }}
        isVisible={
          param_check(i.show_multi_dropdown_modal)
            ? i.show_multi_dropdown_modal
            : false
        }
        dropDownPress={() => {
          ShowMultiDropDownModal(
            section_index,
            index,
            question_index,
            ans_index
          );
        }}
        getSelectedData={(val) =>
          onTextChange(val, section_index, index, question_index, ans_index)
        }
        closeModal={() =>
          onCloseMultiDropDownModal(
            section_index,
            index,
            question_index,
            ans_index
          )
        }
        editable={isVisible}
        selectedData={!isVisible ? null : i.answer_value}
        dropDownTitle={i.placeholder}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        disabled={!isVisible}
        error_message={
          error_check(i, index, section_index, question_index, ans_index)
            ? i.error_message
            : null
        }
      />
    );
  };

  //DatePicker Field
  const DatePicker = (
    i,
    section_index,
    index,
    question_index,
    ans_index,
    isVisible = true
  ) => {
    return (
      <DatePickerField
        date_picker_ref={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onFocus={() => Keyboard.dismiss()}
        OnDatePicker={() =>
          ShowDatePicker(section_index, index, question_index, ans_index)
        }
        onchangeText={(val) => {
          onChangeText(val, section_index, index, question_index, ans_index);
        }}
        selectedDate={!isVisible ? null : i.answer_value}
        showpicker={param_check(i.show_picker) ? i.show_picker : false}
        placeholder={i.placeholder}
        onCancel={() =>
          onDateCancel(section_index, index, question_index, ans_index)
        }
        onChangeDateChange={(res) =>
          onTextChange(res, section_index, index, question_index, ans_index)
        }
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        disabled={!isVisible}
        error_message={
          error_check(i, index, section_index, question_index, ans_index)
            ? i.error_message
            : null
        }
        datetype={i.dtype}
      />
    );
  };

  const onChangeText = (
    text,
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.answer_value = "";
    dispatch(survey_b_data(partB));
  };

  //On click date picker cancel
  const onDateCancel = (section_index, index, question_index, ans_index) => {
    let partB = [...householdlist];

    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_picker = false;
    console.log("question_payload.show_picker", question_payload.show_picker);
    dispatch(survey_b_data(partB));
  };

  //On press date picker field
  const ShowDatePicker = (section_index, index, question_index, ans_index) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_picker = true;
    console.log("question_payload.show_picker", question_payload.show_picker);
    dispatch(survey_b_data(partB));
  };
  const belowOneAge = (section_names) => {
    switch (section_names.section_name) {
      case age_validation.BELOW_ONE_AGE: {
        section_names.is_enable = true;
        break;
      }
      case age_validation.HOUSE_HOLD_MEMBERS: {
        section_names.is_enable = true;
        break;
      }
      case age_validation.FOR_MIRGRANT_TRANSIT: {
        section_names.is_enable = true;
        break;
      }
      // case age_validation.WOMEN_AGE: {
      //   section_names.is_visible = false;
      //   break;
      // }
      // case age_validation.ABOVE_FIVE: {
      //   section_names.is_visible = false;
      //   break;
      // }
      // case age_validation.FIVIFTY_OLD_ABOVE_AGE: {
      //   section_names.is_visible = false;
      //   break;
      // }
      // case age_validation.THERE_AND_TWENTY_FOUR: {
      //   section_names.is_visible = false;
      //   break;
      // }
      default:
        section_names.is_enable = false;
        break;
    }
    //  console.log("householdlist_list", JSON.stringify(householdlist));
  };

  //Text input field on submit editing
  const onSubmitEditing = (i) => {
    console.log("onSubmitEditing", i);
    if (TextBoxRef.current[i.ranking + 1]) {
      TextBoxRef.current[i.ranking + 1].focus();
      console.log(i.ranking + 1, "num to be focused");
    }
  };

  //On Input Change for field
  const onTextChange = (
    text,
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    setError_array([]);
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    let others_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index];
 //console.log(partB[personIndex].category[2].page[0].section[1].questions[2].answers[1].answer_value,'RRRRRRRRRRRRRRRRRRRRRRR')
    switch (question_payload.dtype) {
      case data_type.text_box: {
        console.log("Text", text);
        // Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        // console.log("Partb", partB)
        // console.log("personIndex", personIndex);
        // console.log("pageIndex", pageIndex);
        // console.log("index", index);
        // console.log("section_index", section_index);

        // partB[personIndex].category[pageIndex].page[index].section[
        //   section_index
        // ].questions[question_index].answers[ans_index].answer_value = text;

        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.datepicker: {
        // Date picker Input On Change
        question_payload.answer_value = moment(text).format("DD/MM/YYYY");
        console.log("datepicker1", question_payload.answer_value);
        question_payload.show_picker = false;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }

      case data_type.age_picker: {
        // Date picker Input On Change
        question_payload.answer_value = moment(text).format("DD/MM/YYYY");
        console.log("datepicker", question_payload.answer_value);
        question_payload.show_picker = false;
        question_payload.is_error = false;
        if (others_payload.title == survey_questions.when_was_born) {
          let ageString = moment(text).format("YYYY/MM/DD");
          let age = moment().diff(ageString, "years", false);
          setAge(age);
          // if (age == 0) {
          //   let months = moment().diff(ageString, "months", false);
          //   console.log("Months", months);
          // }
          // console.log('partb belw',partB[personIndex].category[2].page[0].section[0])
          partB[personIndex].category[0].page[0].section[0].is_enable = true;
          partB[personIndex].category[1].page[0].section[0].is_enable =
            age >= 5 ? true : false;
          partB[personIndex].category[1].page[0].section[1].is_enable =
            age >= 3 && age <= 24 ? true : false;
          partB[personIndex].category[1].page[1].section[0].is_enable =
            age >= 15 ? true : false;
          partB[personIndex].category[2].page[0].section[0].is_enable =
            age < 1 ? true : false;
          partB[personIndex].category[2].page[0].section[1].is_enable =
            age >= 10 && age <= 54 && gender === "Female" ? true : false;
          partB[personIndex].category[3].page[0].section[0].is_enable = true;
          partB[personIndex].category[3].page[1].section[0].is_enable =
            age >= 10 ? true : false;
          partB[personIndex].category[3].page[1].section[1].is_enable =
            age >= 60 ? true : false;
          partB[personIndex].category[3].page[1].section[2].is_enable =
            age >= 15 ? true : false;
          partB[personIndex].category[4].page[0].section[0].is_enable = true;
          // partB[personIndex].category[4].page[1].section[0].is_enable = true;
          // partB[personIndex].category[5].page[0].section[0].is_enable = true;
          partB[personIndex].category[5].page[1].section[0].is_enable =
            age >= 18 ? true : false;
          partB[personIndex].category[5].page[2].section[0].is_enable =
            age >= 15 ? true : false;
          partB[personIndex].category[5].page[2].section[0].age = age;
          console.log("AGE", age);
        }
        dispatch(survey_b_data(partB));
        break;
      }
      // case data_type.age_picker: {
      //   // Date picker Input On Change
      //   question_payload.answer_value = moment(text).format("DD/MM/YYYY");
      //   console.log("datepicker", question_payload.answer_value);
      //   question_payload.show_picker = false;
      //   question_payload.is_error = false;
      //   if (others_payload.title == "5. When was ___ born ?") {
      //     let ageString = moment(text).format("YYYY/MM/DD");
      //     let age = moment().diff(ageString, "years", false);
      //     if (age == 0) {
      //       let months = moment().diff(ageString, "months", false);
      //       console.log("Months", months);
      //       let household_category = householdlist[personIndex].category;
      //       household_category.forEach((category_details, category_index) => {
      //         // console.log('category_details',category_details.page)
      //         category_details.page.forEach((section_detail, section_index) => {
      //           let sectionDetail = section_detail.section;
      //           sectionDetail.forEach((section_names, section_name_index) => {
      //             belowOneAge(section_names);
      //           });
      //           // if(sectionName === age_validation.BELOW_ONE_AGE){
      //           //   section_detail.section[section_index].is_visibility = true
      //           // }
      //         });
      //       });
      //     }
      //     console.log("AGE", age);
      //   }
      //   dispatch(survey_b_data(partB));
      //   break;
      // }
      case data_type.textarea: {
        // Multi line Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.selectbox: {
        // Dropdown Input On Change
        question_payload.answer_value = text;
        console.log("dropdown", question_payload.answer_value);
        if (others_payload.title == survey_questions.male_or_female) {
          setGender(text);
          partB[personIndex].category[5].page[2].section[0].gender = text;
          //partB[personIndex].category[2].page[0].section[1].is_enable = text === "Female" ? true : false;
        } else if (
          others_payload.title ==
          survey_questions.migrant_and_transient
        ) {
          partB[personIndex].category[4].page[0].section[1].is_enable =
            text === "Non-Migrant" ? false : true;
          partB[personIndex].category[5].page[0].section[0].is_enable =
            text === "Non-Migrant" ? false : true;
        } else if (
          others_payload.title == survey_questions.valid_ctc
        ) {
          others_payload.others_status = text === "No" ? true : false;
        } else if (
          others_payload.title ==
          survey_questions.plan_to_return_to_previous_residence
        ) {
          others_payload.others_status = text === "Yes" ? true : false;
        } else if (
          others_payload.title == survey_questions.family_planning_method
        ) {
          if(text === "Not Applicable"){
            partB[personIndex].category[2].page[0].section[1].questions[2].is_qn_enable =  false;
            partB[personIndex].category[2].page[0].section[1].questions[2].answers[0].answer_value = null;
            partB[personIndex].category[2].page[0].section[1].questions[2].answers[1].answer_value = null;
          }else {
            partB[personIndex].category[2].page[0].section[1].questions[2].is_qn_enable =  true;
          }
        }
         else {
          others_payload.others_status =
            text === "Others" || text === "Non-Filipino" ? true : false;
        }
        // others_payload.others_status =
        //   text === "Others" || text === "Non-Filipino" ? true : false;
        question_payload.show_dropdown_modal = false;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.multiselectbox: {
        // Dropdown Input On Change
        question_payload.answer_value = text;
        console.log("multi select dropdown", question_payload.answer_value);
        console.log(text.includes("Others"), "OTHERS STATUS");
        others_payload.others_status = text.includes("Others") ? true : false;
        question_payload.show_multi_dropdown_modal = false;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));

        break;
      }
      case data_type.other_textbox: {
        // Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.other_datepicker: {
        // Date picker Input On Change
        question_payload.answer_value = moment(text).format("DD/MM/YYYY");
        question_payload.show_picker = false;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }

      default:
        break;
    }
  };

  //On press drop down field
  const ShowDropDownModal = (
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = question_payload.show_dropdown_modal
      ? false
      : true;
    console.log(
      "question_payload.show_dropdown_modal",
      question_payload.show_dropdown_modal
    );
    dispatch(survey_b_data(partB));
  };

  //On close drop down modal
  const onCloseDropDownModal = (
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = false;
    console.log(
      "question_payload.show_dropdown_modal",
      question_payload.show_dropdown_modal
    );
    dispatch(survey_b_data(partB));
  };

  //On press multi select drop down field
  const ShowMultiDropDownModal = (
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_multi_dropdown_modal =
      question_payload.show_multi_dropdown_modal ? false : true;
    console.log(
      "question_payload.show_dropdown_modal",
      question_payload.show_multi_dropdown_modal
    );
    dispatch(survey_b_data(partB));
  };

  //On close multi select drop down modal
  const onCloseMultiDropDownModal = (
    section_index,
    index,
    question_index,
    ans_index
  ) => {
    let partB = [...householdlist];
    let question_payload =
      partB[personIndex].category[pageIndex].page[index].section[section_index]
        .questions[question_index].answers[ans_index];
    question_payload.show_multi_dropdown_modal = false;
    console.log(
      "question_payload.show_dropdown_modal",
      question_payload.show_multi_dropdown_modal
    );
    dispatch(survey_b_data(partB));
  };

  const backData = ({ index }) => {
    SetPageIndex(0);
    SetPersonIndex(index);
  };
  const section_index = 0;

  console.log(householdlist.length > 1, "householdlist length");

  const onPauseCancel = () => {
    console.log("onPauseCancel");
    setPauseModel(false);
  };

  const onProceedBtn = async () => {
    let part_a = [...survey_part_a_data];

    let time_end = part_a[1].section[0].questions[3].answers[0].answer_value;
    let date_next_visit =
      part_a[1].section[0].questions[5].answers[0].answer_value;
    let result = part_a[1].section[0].questions[4].answers[0].answer_value;
    if (time_end === null) {
      part_a[1].section[0].questions[3].answers[0].is_error = true;
    } else if (result === null) {
      part_a[1].section[0].questions[4].answers[0].is_error = true;
    } else if (date_next_visit == null) {
      part_a[1].section[0].questions[5].answers[0].is_error = true;
    } else {
      setPauseModel(false);
      setTimeout(async () => {
        SetLoading(true);

        let survey_num =
          survey_initialData.section[0].questions[0].answers[0].answer_value;
        let data = {
          ...surveyInputData,
          survey_number: survey_num,
          mobile_next_section: {
            page: "page2",
            user: personIndex,
            no: pageIndex,
          },
          initial_section: survey_initialData,
          status: "survey_ongoing",
          members: members,
          interview_section: survey_part_a_data,
          household_member_count: members.length,
          house_hold_member_section: householdlist,
          final_section: survey_part_c_data,
          notes: survey_notes,
        };
        let entry_dummy_request = {
          mb_local: data,
        };
        let js = JSON.stringify(entry_dummy_request);
        setSurveyDetails(`${survey_num}`, js);
        SetLoading(false);
        navigation.navigate(navigation_screens.MainScreens);
        // const response = await APIRequest({
        //   url: constant.SURVEY_MB_LOCAL + survey_entry_id + "/",
        //   method: constant.HTTPS_METHOD.POST,
        //   data: entry_dummy_request,
        // });
        // if (response.status == 1) {
        //   // OnGoingSurveyDetailsApi(response)
        //   // setPageNum(pageNum + 1 > 4 ? 4 : pageNum + 1);
        //   // setSurveyPage2(`${survey_num}`, JSON.stringify(householdlist));
        //   setTimeout(() => {
        //     SetLoading(false);
        //     navigation.navigate(navigation_screens.MainScreens);
        //   }, 500);
        // }
      }, 500);
    }

    dispatch(survey_a_data(part_a));
  };

  const pausePress = async () => {
    setPauseModel(true);
  };
  let part_a = [...survey_part_a_data];
  let survey_num =
    survey_initialData.section[0].questions[0].answers[0].answer_value;
  return (
    <View style={styles.container}>
      <Header
        survey_num={survey_num}
        onNotesPress={() => navigation.navigate(navigation_screens.Notes)}
        onPausePress={() => {
          pausePress();
        }}
      />
      <Loader loading={loading} />
      <View style={styles.sub_header_view}>
        <View style={styles.switch_person_parent_view}>
          <View style={styles.person_name_view}>
            <Text
              style={[styles.person_name, { maxWidth: width * 0.42 }]}
              numberOfLines={1}
            >
              {householdlist[personIndex].member_name}
              {"‘s"}{" "}
            </Text>
            <Text style={styles.person_name} numberOfLines={1}>
              {` ${survey_form.questions}`}
            </Text>
          </View>
          {householdlist.length > 1 && (
            <TouchableOpacity
              style={styles.switch_person_view}
              onPress={() => {
                navigation.navigate(navigation_screens.SwitchPerson, { backData });
              }}
            >
              <View style={styles.switch_icon}>{Vector.SwitchPerson}</View>

              <Text style={styles.switch_person_text}>
                {survey_form.switchPerson}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {pageIndex !== 0 && (
          <View style={styles.age_gender_view}>
            <Text style={styles.age}>
              {survey_form.age}{" "}
              {householdlist[personIndex].category[5].page[2].section[0].age}
            </Text>
            <Text style={styles.gender}>
              {survey_form.gender}{" "}
              {householdlist[personIndex].category[5].page[2].section[0].gender}
            </Text>
          </View>
        )}
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        ref={section_list_b_ref}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.form_scroll_view}
      >
        {householdlist[personIndex].category[pageIndex].page.map(
          (item, index) => {
            return (
              <View>
                <View>
                  <Text style={styles.category_name_b}>
                    {item.category_name.toUpperCase()}
                  </Text>
                </View>
                <View key={index}>
                  {/* <Text style={styles.section_name_b}>
                  {item.category_name.toUpperCase()}
                </Text> */}
                  <View>
                    {item.section.map((section, section_index) => {
                      return (
                        <View key={section_index}>
                          {section.section_name !== "" &&
                          section.is_subheader ? (
                            <Text
                              style={[
                                styles.section_name_2,
                                {
                                  color:
                                    param_check(section.is_enable) &&
                                    !section.is_enable
                                      ? Colors.disable_color
                                      : Colors.textGreyColor,
                                },
                              ]}
                            >
                              {section.section_name.toUpperCase()}
                            </Text>
                          ) : null}

                          {section.section_name !== "" &&
                          !section.is_subheader ? (
                            <View style={styles.section_name_view}>
                              <Text
                                style={[
                                  styles.section_name_b,
                                  {
                                    color:
                                      param_check(section.is_enable) &&
                                      !section.is_enable
                                        ? Colors.disable_color
                                        : Colors.text_color_dark,
                                  },
                                ]}
                              >
                                {section.section_name.toUpperCase()}
                              </Text>
                            </View>
                          ) : null}
                          {/* <View style={styles.section_name_view}>
                            <Text
                              style={[
                                styles.section_name_b,
                                {
                                  color:
                                    param_check(section.isVisible) &&
                                    !section.isVisible
                                      ? Colors.disable_color
                                      : Colors.text_color_dark,
                                },
                              ]}
                            >
                              {section.section_name.toUpperCase()}
                            </Text>
                          </View> */}
                          <View style={styles.field_view_top} />
                          {section.questions.map((it, question_index) => (
                            <View key={question_index}>
                              <FieldTitle
                                is_visible={section.is_enable && it.is_qn_enable}
                                fieldTitle={it.title}
                                textRef={(input) => {
                                  TextRef.current[it.qn_ranking] = input;
                                }}
                              />
                              <View>
                                {it.answers.map((i, ans_index) => (
                                  <View key={ans_index}>
                                    {i.dtype == "textbox"
                                      ? TextBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "textarea"
                                      ? MultiLineTextBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable
                                        )
                                      : i.dtype == "selectbox"
                                      ? SelectBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "multiselectbox"
                                      ? MultiSelectBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable
                                        )
                                      : i.dtype == "datepicker" ||
                                        i.dtype == "timepicker"
                                      ? DatePicker(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable
                                        )
                                      : i.dtype == "other_textbox" &&
                                        it.others_status ===
                                          param_check(it.others_status)
                                      ? TextBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "age_picker"
                                      ? DatePicker(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable
                                        )
                                      : i.dtype == "other_datepicker" &&
                                        it.others_status ===
                                          param_check(it.others_status)
                                      ? DatePicker(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable
                                        )
                                      : null}
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }
        )}
        <PauseSurvey
          isVisible={PauseModel}
          OnCancel={onPauseCancel}
          onProcced={onProceedBtn}
          TimeError={part_a[1].section[0].questions[3].answers[0].is_error}
          DateError={part_a[1].section[0].questions[5].answers[0].is_error}
          ResultError={part_a[1].section[0].questions[4].answers[0].is_error}
          time_error_message={
            part_a[1].section[0].questions[3].answers[0].error_message
          }
          result_error_message={
            part_a[1].section[0].questions[4].answers[0].error_message
          }
          date_error_message={
            part_a[1].section[0].questions[5].answers[0].error_message
          }
          time_data={part_a[1].section[0].questions[3].answers[0].answer_value}
          date_data={part_a[1].section[0].questions[5].answers[0].answer_value}
          result_data={
            part_a[1].section[0].questions[4].answers[0].answer_value
          }
          onTimeChange={(res) => {
            console.log("time", res);
            let time = moment(res).format("LT");
            console.log("time", time);
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[3].answers[0].answer_value = time;
            part_a[1].section[0].questions[3].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
          onDateChange={(res) => {
            console.log("date", res);
            let date = moment(res).format("DD/MM/YYYY");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[5].answers[0].answer_value = date;
            part_a[1].section[0].questions[5].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
          onResultChange={(result) => {
            console.log("result", result);
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[4].answers[0].answer_value = result;
            part_a[1].section[0].questions[4].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
        />
      </KeyboardAwareScrollView>
      <Footer
        onPressPreviousButton={onClickPrevious}
        onPressNextButton={onClickNext}
        next_disabled={false}
      />
    </View>
  );
};

export default SurveyFormPartB;
