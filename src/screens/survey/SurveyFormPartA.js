import {
  Text,
  View,
  SectionList,
  Alert,
  BackHandler,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import moment from "moment"; // For formatting date and time
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import {
  CustomTextInputField,
  DatePickerField,
  DropDownField,
  FieldTitle,
  Footer,
  Header,
} from "../../components"; // Custom components
import Styles from "./survey.styles"; // Survey styles
import { getSurveyQuestions, setSurveyDetails } from "../../utils/localStorage"; // Local storage data
import {
  auth_content,
  common_content,
  household_members,
  storage_key,
  data_type,
  navigation_screens,
} from "../../strings"; // Strings
import { param_check, snackBar, validateSpace } from "../../utils/helpers"; // Helper functions
import {
  survey_a_data,
  total_household_members,
} from "../../store/actions/surveyActions"; // Survey actions
import Loader from "../../utils/Loader"; // Custom loader
import PauseSurvey from "./PauseSurvey"; // Pause survey modal component

const SurveyFormPartA = ({ navigation, route }) => {
  const styles = Styles();

  const dispatch = useDispatch();
  const TextBoxRef = useRef([]);
  const TextRef = useRef([]);

  const section_list_a_ref = useRef();
  const [loading, SetLoading] = useState(false);
  const [PauseModel, setPauseModel] = useState(false);
  const [blur, setBlur] = useState(false);
  const [edit, setEdit] = useState(true);

  const [pageNum, setPageNum] = useState(route.params.no + 2); // Page Number state

  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});

  const [part_a_data, setPart_a_data] = useState([]);
  const surveyInputData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.surveyInputData
  );
  const survey_notes = useSelector(
    (state) => state?.surveyReducer?.survey_notes
  );
  const survey_initialData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const survey_part_a_data = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_part_a
  );
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.household_info.householdlist
  );
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.survey_part_c
  );

  useEffect(() => {
    const backAction = () => {
      onClickPrevious();
      return true;
    };

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });

    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let survey_a = survey_part_a_data;
        setPart_a_data(
          survey_a
            .filter((it) => it.page === pageNum)
            .map(({ section, ...rest }) => ({
              data: section,
              ...rest,
            }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      try {
        if (section_list_a_ref.current !== null) {
          section_list_a_ref.current.scrollToPosition(0, 0, {
            animated: false,
          });
        }
      } catch (error) {}
    }, 500);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      keyboardHide.remove();
    };
  }, [pageNum]);

  //On click date picker cancel
  const onDateCancel = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_picker = false;
    setPart_a_data(part_a);
  };

  //On press date picker field
  const ShowDatePicker = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_picker = question_payload.show_picker ? false : true;
    setPart_a_data(part_a);
  };

  //On click time picker cancel
  const onTimeCancel = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_time_picker = false;
    setPart_a_data(part_a);
  };

  //On press time picker field
  const ShowTimePicker = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_time_picker = question_payload.show_time_picker
      ? false
      : true;
    setPart_a_data(part_a);
  };
  //On Input Change for field
  const onTextChange = (text, index, question_index, ans_index) => {
    setError_array([]);
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    let question_title = part_a[0].data[index].questions[question_index].title;
    switch (question_payload.dtype) {
      case data_type.text_box: {
        // Text Input On Change
        if (question_title === "Total no.of Household Members") {
          if (text > 10) {
            question_payload.is_error = false;
            snackBar(household_members.members_more_than_10);
          } else {
            dispatch(total_household_members(text));
            question_payload.is_error = false;
            question_payload.answer_value = text;
          }
        } else {
          question_payload.answer_value = text;
          question_payload.is_error = false;
        }
        setPart_a_data(part_a);
        break;
      }
      case data_type.datepicker: {
        // Date picker Input On Change
        question_payload.answer_value = moment(text).format("DD/MM/YYYY");
        question_payload.show_picker = false;
        question_payload.is_error = false;
        setPart_a_data(part_a);
        break;
      }
      case data_type.timepicker: {
        // Time picker Input On Change
        question_payload.answer_value = moment(text).format("LT");
        question_payload.show_time_picker = false;
        question_payload.is_error = false;
        setPart_a_data(part_a);
        break;
      }
      case data_type.selectbox: {
        // Dropdown Input On Change
        question_payload.answer_value = text;
        question_payload.show_dropdown_modal = false;
        question_payload.is_error = false;
        setPart_a_data(part_a);
        break;
      }
      default:
        break;
    }
  };

  //On press drop down field
  const ShowDropDownModal = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = question_payload.show_dropdown_modal
      ? false
      : true;
    setPart_a_data(part_a);
  };

  //On close drop down modal
  const onCloseDropDownModal = (index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = false;
    setPart_a_data(part_a);
  };

  // On click next button
  const onClickNext = () => {
    let part_a = [...part_a_data];
    part_a[0].data.forEach((item, index) => {
      item.questions.forEach((it, question_index) => {
        it.answers.forEach((i, ans_index) => {
          if (!it.is_read_only) {
            if (
              i.answer_value === null ||
              i.answer_value === "" ||
              i.answer_value.length === 0 ||
              !validateSpace(i.answer_value)
            ) {
              i.is_error = true;
              var obj = {
                ind: index,
                question_ind: question_index,
                ans_ind: ans_index,
              };

              error_array.push(obj);
              setError_array([...error_array]);
              setError_obj({
                ind: error_array[0].ind,
                question_ind: error_array[0].question_ind,
                ans_ind: error_array[0].ans_ind,
              });

              let error_rank =
                part_a[0]?.data[error_array[0].ind]?.questions[
                  error_array[0].question_ind
                ]?.answers[error_array[0].ans_ind]?.ranking;
              let qn_error_rank =
                part_a[0]?.data[error_array[0].ind]?.questions[
                  error_array[0].question_ind
                ]?.qn_ranking;
              console.log(qn_error_rank, error_rank, "ERROR RANK");
              TextRef.current[qn_error_rank]?.focus();
              TextBoxRef.current[error_rank]?.focus();
              setPart_a_data(part_a);
            } else {
            }
          } else {
          }
        });
      });
    });

    var error_boolean_array = [];
    part_a_data[0].data.forEach((item) => {
      item.questions.forEach((it) => {
        if (!it.is_read_only) {
          it.answers.forEach((i) => {
            error_boolean_array.push(
              i.answer_value === null ||
                i.answer_value === "" ||
                i.answer_value.length === 0 ||
                !validateSpace(i.answer_value)
            );
          });
        }
      });
    });

    if (error_boolean_array.every((it) => it === false)) {
      if (pageNum === 4) {
        navigation.navigate(navigation_screens.HouseholdMembers, {
          user: "next",
        });
      } else {
        setPageNum(pageNum + 1 > 4 ? 4 : pageNum + 1);
      }
    }
  };

  const onPauseCancel = () => {
    dispatch(survey_a_data(part_a));
    setPauseModel(false);
  };

  const onProceedBtn = () => {
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
      setTimeout(() => {
        if (pageNum == 2) {
          callApi0();
        } else if (pageNum === 3) {
          callApi();
        } else if (pageNum === 4) {
          callApi1();
        }
      }, 500);
    }

    dispatch(survey_a_data(part_a));
  };

  const pausePress = async () => {
    setPauseModel(true);
  };

  // Call Api
  const callApi0 = async () => {
    SetLoading(true);
    let survey_num =
      survey_initialData.section[0].questions[0].answers[0].answer_value;
    let data = {
      ...surveyInputData,
      survey_number: survey_num,
      mobile_next_section: {
        page: "page1",
        no: 0,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: [],
      household_member_count: 0,
      interview_section: survey_part_a_data,
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
  };

  // Call Api
  const callApi = async () => {
    SetLoading(true);
    let survey_num =
      survey_initialData.section[0].questions[0].answers[0].answer_value;
    let first = [survey_part_a_data[0]];
    let second = [...first];
    let data = {
      ...surveyInputData,
      survey_number: survey_num,
      mobile_next_section: {
        page: "page1",
        no: 1,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: [],
      interview_section: second,
      household_member_count: 0,
      interview_section: survey_part_a_data,
      house_hold_member_section: householdlist,
      final_section: survey_part_c_data,
      notes: survey_notes,
    };
    let entry_dummy_request = {
      mb_local: data,
    };
    let js = JSON.stringify(entry_dummy_request);
    setSurveyDetails(survey_num, js);
    SetLoading(false);
    navigation.navigate(navigation_screens.MainScreens);
  };
  const callApi1 = async () => {
    SetLoading(true);
    let survey_num =
      survey_initialData.section[0].questions[0].answers[0].answer_value;
    let final = survey_part_a_data.slice(0, -1);
    let data = {
      ...surveyInputData,
      survey_number: survey_num,
      mobile_next_section: {
        page: "page1",
        no: 2,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: [],
      interview_section: final,
      household_member_count: 0,
      interview_section: survey_part_a_data,
      house_hold_member_section: householdlist,
      final_section: survey_part_c_data,
      notes: survey_notes,
    };
    let entry_dummy_request = {
      mb_local: data,
    };
    console.log("Third", JSON.stringify(data));
    let js = JSON.stringify(entry_dummy_request);
    setSurveyDetails(survey_num, js);
    SetLoading(false);
    navigation.navigate(navigation_screens.MainScreens);
  };

  //On click previous button
  const onClickPrevious = () => {
    if (pageNum === 2) {
      Alert.alert(
        auth_content.RBIM,
        common_content.exit_title,
        [
          {
            text: common_content.cancel,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: common_content.ok,
            onPress: () => navigation.navigate(navigation_screens.MainScreens),
          },
        ],
        { cancelable: false }
      );
    } else {
      setPageNum(pageNum - 1 < 2 ? 2 : pageNum - 1);
    }
  };

  //Checks error index returns is_error value
  const error_check = (i, index, question_index, ans_index) => {
    if (
      error_obj.ind === index &&
      error_obj.question_ind === question_index &&
      error_obj.ans_ind === ans_index
    ) {
      return i.is_error;
    }
    return false;
  };

  //Text input field on submit editing
  const onSubmitEditing = (i) => {
    if (TextBoxRef.current[i.ranking + 1]) {
      TextBoxRef.current[i.ranking + 1].focus();
    }
  };

  const onChangeText = (text, index, question_index, ans_index) => {
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.answer_value = "";
    setPart_a_data(part_a);
  };

  //Survey Questions field view
  const SurveyFieldView = (item, section, index) => {
    return (
      <View>
        <View style={styles.question_view}>
          {item.section_name !== "" && (
            <Text style={styles.section_name}>{item.section_name}</Text>
          )}
          <View style={styles.field_view_top} />
          <View style={styles.whiteView}>
            {item.questions.map((it, question_index) => (
              <View>
                <FieldTitle
                  fieldTitle={it.title}
                  disabled={it.is_read_only}
                  textRef={(input) => {
                    TextRef.current[it.qn_ranking] = input;
                  }}
                />
                <View>
                  {it.answers.map((i, ans_index) => (
                    <View>
                      {i.dtype == "textbox" ? (
                        <CustomTextInputField
                          textInputRef={(input) => {
                            TextBoxRef.current[i.ranking] = input;
                          }}
                          onSubmitEditing={() => onSubmitEditing(i)}
                          returnKeyType={"next"}
                          blurOnSubmit={
                            TextBoxRef.current[i.ranking + 1] ? false : true
                          }
                          keyboardType={
                            i.keyboard_type === "number" ? "numeric" : "default"
                          }
                          maxLength={i.limitation !== null ? i.limitation : 200}
                          key={ans_index}
                          placeholder={i.placeholder}
                          handleInputChange={(text) => {
                            onTextChange(
                              text,
                              index,
                              question_index,
                              ans_index
                            );
                          }}
                          value={i.answer_value}
                          is_error={error_check(
                            i,
                            index,
                            question_index,
                            ans_index
                          )}
                          errorText={
                            error_check(i, index, question_index, ans_index)
                              ? i.error_message
                              : null
                          }
                        />
                      ) : i.dtype == "selectbox" ? (
                        <DropDownField
                          placeholder={i.placeholder}
                          drop_down_ref={(input) => {
                            TextBoxRef.current[i.ranking] = input;
                          }}
                          onFocus={() => Keyboard.dismiss()}
                          onchangeText={(val) => {
                            onChangeText(val, index, question_index, ans_index);
                          }}
                          data={i.options}
                          isVisible={
                            param_check(i.show_dropdown_modal)
                              ? i.show_dropdown_modal
                              : false
                          }
                          dropDownPress={() =>
                            ShowDropDownModal(index, question_index, ans_index)
                          }
                          selectedValue={i.answer_value}
                          closeModal={() =>
                            onCloseDropDownModal(
                              index,
                              question_index,
                              ans_index
                            )
                          }
                          onGetValue={(val) =>
                            onTextChange(val, index, question_index, ans_index)
                          }
                          dropDownTitle={i.placeholder}
                          disabled={it.is_read_only}
                          value={i.answer_value}
                          is_error={error_check(
                            i,
                            index,
                            question_index,
                            ans_index
                          )}
                          error_message={
                            error_check(i, index, question_index, ans_index)
                              ? i.error_message
                              : null
                          }
                        />
                      ) : i.dtype == "datepicker" ? (
                        <DatePickerField
                          date_picker_ref={(input) => {
                            TextBoxRef.current[i.ranking] = input;
                          }}
                          onFocus={() => Keyboard.dismiss()}
                          OnDatePicker={() =>
                            ShowDatePicker(index, question_index, ans_index)
                          }
                          onchangeText={(val) => {
                            onChangeText(val, index, question_index, ans_index);
                          }}
                          selectedDate={i.answer_value}
                          disabled={it.is_read_only}
                          showpicker={
                            param_check(i.show_picker) ? i.show_picker : false
                          }
                          placeholder={i.placeholder}
                          onCancel={() => {
                            onDateCancel(index, question_index, ans_index);
                            console.log(i.answer_value);
                          }}
                          onChangeDateChange={(res) =>
                            onTextChange(res, index, question_index, ans_index)
                          }
                          value={i.answer_value}
                          is_error={error_check(
                            i,
                            index,
                            question_index,
                            ans_index
                          )}
                          error_message={
                            error_check(i, index, question_index, ans_index)
                              ? i.error_message
                              : null
                          }
                        />
                      ) : i.dtype == "timepicker" ? (
                        <DatePickerField
                          date_picker_ref={(input) => {
                            TextBoxRef.current[i.ranking] = input;
                          }}
                          onFocus={() => Keyboard.dismiss()}
                          mode={"time"}
                          OnDatePicker={() =>
                            ShowTimePicker(index, question_index, ans_index)
                          }
                          selectedDate={i.answer_value}
                          onchangeText={(val) => {
                            onChangeText(val, index, question_index, ans_index);
                          }}
                          disabled={it.is_read_only}
                          showpicker={
                            param_check(i.show_time_picker)
                              ? i.show_time_picker
                              : false
                          }
                          placeholder={i.placeholder}
                          onCancel={() =>
                            onTimeCancel(index, question_index, ans_index)
                          }
                          onChangeDateChange={(res) =>
                            onTextChange(res, index, question_index, ans_index)
                          }
                          value={i.answer_value}
                          is_error={error_check(
                            i,
                            index,
                            question_index,
                            ans_index
                          )}
                          error_message={
                            error_check(i, index, question_index, ans_index)
                              ? i.error_message
                              : null
                          }
                        />
                      ) : null}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
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
      <KeyboardAwareScrollView
        ref={section_list_a_ref}
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.form_scroll_view}
      >
        <Loader loading={loading} />
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={part_a_data}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text style={styles.category_name}>
                  {section.category_name}
                </Text>
              </View>
            );
          }}
          renderItem={({ item, section, index }) =>
            SurveyFieldView(item, section, index)
          }
          keyExtractor={(item) => item.id}
        />
        <PauseSurvey
          isVisible={PauseModel}
          OnCancel={onPauseCancel}
          onProcced={onProceedBtn}
          TimeError={part_a[1].section[0].questions[3].answers[0].is_error}
          DateError={part_a[1].section[0].questions[5].answers[0].is_error}
          ResultError={part_a[1].section[0].questions[4].answers[0].is_error}
          time_data={part_a[1].section[0].questions[3].answers[0].answer_value}
          date_data={part_a[1].section[0].questions[5].answers[0].answer_value}
          result_data={
            part_a[1].section[0].questions[4].answers[0].answer_value
          }
          time_error_message={
            part_a[1].section[0].questions[3].answers[0].error_message
          }
          result_error_message={
            part_a[1].section[0].questions[4].answers[0].error_message
          }
          date_error_message={
            part_a[1].section[0].questions[5].answers[0].error_message
          }
          onTimeChange={(res) => {
            let time = moment(res).format("LT");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[3].answers[0].answer_value = time;
            part_a[1].section[0].questions[3].answers[0].is_error = false;
            dispatch(survey_a_data(part_a));
          }}
          onDateChange={(res) => {
            let date = moment(res).format("DD/MM/YYYY");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[5].answers[0].answer_value = date;
            part_a[1].section[0].questions[5].answers[0].is_error = false;
            dispatch(survey_a_data(part_a));
          }}
          onResultChange={(result) => {
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

export default SurveyFormPartA;
