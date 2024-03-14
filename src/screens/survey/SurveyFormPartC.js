import { Text, View, SectionList, Keyboard } from "react-native";
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
import { storage_key, data_type, navigation_screens } from "../../strings"; // Strings
import { param_check, validateSpace } from "../../utils/helpers"; // Helper functions
import Loader from "../../utils/Loader"; // Custom loader
import PauseSurvey from "./PauseSurvey"; // Pause survey modal component
import { survey_a_data } from "../../store/actions/surveyActions"; // Survey actions

const SurveyFormPartC = ({ navigation, route }) => {
  const styles = Styles();
  const dispatch = useDispatch();
  const TextBoxRef = useRef([]);
  const TextRef = useRef([]);
  const section_list_c_ref = useRef();
  const [pageNum, setPageNum] = useState(route.params.no); // Page Number state
  const [PauseModel, setPauseModel] = useState(false);

  const [loading, SetLoading] = useState(false);
  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});

  const [part_c_data, setPart_c_data] = useState([]);
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.survey_part_c
  );
  const survey_notes = useSelector(
    (state) => state?.surveyReducer?.survey_notes
  );
  const surveyInputData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.surveyInputData
  );
  const survey_initialData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.household_info.householdlist
  );
  const members = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.members
  );
  const survey_part_a_data = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_part_a
  );
  let part_a = [...survey_part_a_data];
  useEffect(() => {
    let survey_c = survey_part_c_data;
    setPart_c_data(
      survey_c
        .filter((it) => it.page === pageNum)
        .map(({ section, ...rest }) => ({
          data: section,
          ...rest,
        }))
    );

    const keyboardHide = Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });

    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      try {
        if (section_list_c_ref.current !== null) {
          section_list_c_ref.current.scrollToPosition(0, 0, {
            animated: false,
          });
        }
      } catch (error) {}
    }, 500);

    return () => {
      keyboardHide.remove();
    };
  }, [pageNum]);

  // On click next button
  const onClickNext = () => {
    let part_c = [...part_c_data];
    part_c[0].data.forEach((item, index) => {
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

              if (i.dtype == "other_textbox" || i.dtype == "other_selectbox") {
                if (it.others_status) {
                  error_array.push(obj);
                }
              } else {
                error_array.push(obj);
              }
              setError_array([...error_array]);
              if (error_array.length !== 0) {
                setError_obj({
                  ind: error_array[0].ind,
                  question_ind: error_array[0].question_ind,
                  ans_ind: error_array[0].ans_ind,
                });

                let error_rank =
                  part_c[0]?.data[error_array[0].ind]?.questions[
                    error_array[0].question_ind
                  ]?.answers[error_array[0].ans_ind]?.ranking;
                let qn_error_rank =
                  part_c[0]?.data[error_array[0].ind]?.questions[
                    error_array[0].question_ind
                  ]?.qn_ranking;
                TextRef.current[qn_error_rank]?.focus();
                TextBoxRef.current[error_rank]?.focus();
              }
              setPart_c_data(part_c);
            }
          }
        });
      });
    });

    var error_boolean_array = [];
    part_c_data[0].data.forEach((item) => {
      item.questions.forEach((it) => {
        it.answers.forEach((i) => {
          if (i.dtype == "other_textbox" || i.dtype == "other_selectbox") {
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
      });
    });

    if (error_boolean_array.every((it) => it === false)) {
      if (pageNum === 3) {
        navigation.navigate(navigation_screens.VerifySignature);
      } else {
        setPageNum(pageNum + 1 > 3 ? 3 : pageNum + 1);
      }
    }
  };

  //On click previous button
  const onClickPrevious = () => {
    if (pageNum === 1) {
      navigation.navigate(navigation_screens.SurveyFormPartB, {
        user: 0,
        no: 0,
      });
    } else {
      setPageNum(pageNum - 1 < 1 ? 1 : pageNum - 1);
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
      console.log(i.ranking + 1, "num to be focused");
    }
  };

  //Text Input Field
  const TextBoxField = (i, index, question_index, ans_index) => {
    return (
      <CustomTextInputField
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, index, question_index, ans_index);
        }}
        value={i.answer_value}
        is_error={error_check(i, index, question_index, ans_index)}
        errorText={
          error_check(i, index, question_index, ans_index)
            ? i.error_message
            : null
        }
        keyboardType={i.keyboard_type === "number" ? "numeric" : "default"}
        maxLength={i.limitation !== null ? i.limitation : 200}
        textInputRef={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onSubmitEditing={() => onSubmitEditing(i)}
        returnKeyType={"next"}
        blurOnSubmit={TextBoxRef.current[i.ranking + 1] ? false : true}
      />
    );
  };
  //Drop Down Field
  const SelectBoxField = (i, index, question_index, ans_index) => {
    return (
      <DropDownField
        drop_down_ref={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onFocus={() => Keyboard.dismiss()}
        onchangeText={(val) => {
          onChangeText(val, index, question_index, ans_index);
        }}
        placeholder={i.placeholder}
        data={i.options}
        isVisible={
          param_check(i.show_dropdown_modal) ? i.show_dropdown_modal : false
        }
        dropDownPress={() => {
          ShowDropDownModal(index, question_index, ans_index);
        }}
        selectedValue={i.answer_value}
        closeModal={() =>
          onCloseDropDownModal(index, question_index, ans_index)
        }
        onGetValue={(val) =>
          onTextChange(val, index, question_index, ans_index)
        }
        dropDownTitle={i.placeholder}
        is_error={error_check(i, index, question_index, ans_index)}
        error_message={
          error_check(i, index, question_index, ans_index)
            ? i.error_message
            : null
        }
      />
    );
  };
  //DatePicker Field
  const DatePicker = (i, index, question_index, ans_index) => {
    return (
      <DatePickerField
        date_picker_ref={(input) => {
          TextBoxRef.current[i.ranking] = input;
        }}
        onFocus={() => Keyboard.dismiss()}
        onchangeText={(val) => {
          onChangeText(val, index, question_index, ans_index);
        }}
        OnDatePicker={() => ShowDatePicker(index, question_index, ans_index)}
        selectedDate={i.answer_value}
        showpicker={param_check(i.show_picker) ? i.show_picker : false}
        placeholder={i.placeholder}
        onCancel={() => onDateCancel(index, question_index, ans_index)}
        onChangeDateChange={(res) =>
          onTextChange(res, index, question_index, ans_index)
        }
        is_error={error_check(i, index, question_index, ans_index)}
        error_message={
          error_check(i, index, question_index, ans_index)
            ? i.error_message
            : null
        }
      />
    );
  };

  const onChangeText = (text, index, question_index, ans_index) => {
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    question_payload.answer_value = "";
    setPart_c_data(part_c);
  };

  //On click date picker cancel
  const onDateCancel = (index, question_index, ans_index) => {
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_picker = false;
    setPart_c_data(part_c);
  };

  //On press date picker field
  const ShowDatePicker = (index, question_index, ans_index) => {
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_picker = true;
    setPart_c_data(part_c);
  };

  //On Input Change for field
  const onTextChange = (text, index, question_index, ans_index) => {
    setError_array([]);
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    let others_payload = part_c[0].data[index].questions[question_index];

    switch (question_payload.dtype) {
      case data_type.text_box: {
        // Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        setPart_c_data(part_c);
        break;
      }
      case data_type.datepicker: {
        // Date picker Input On Change
        question_payload.answer_value = moment(text).format("DD/MM/YYYY");
        question_payload.show_picker = false;
        question_payload.is_error = false;
        setPart_c_data(part_c);
        break;
      }
      case data_type.selectbox: {
        // Dropdown Input On Change
        question_payload.answer_value = text;
        others_payload.others_status =
          text === "Others" || text === "Yes" ? true : false;
        question_payload.show_dropdown_modal = false;
        question_payload.is_error = false;
        setPart_c_data(part_c);
        break;
      }
      case data_type.other_textbox: {
        // Others Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        setPart_c_data(part_c);
        break;
      }
      case data_type.other_selectbox: {
        // Others Dropdown Input On Change
        question_payload.answer_value = text;
        question_payload.show_dropdown_modal = false;
        question_payload.is_error = false;
        setPart_c_data(part_c);
        break;
      }

      default:
        break;
    }
  };

  //On press drop down field
  const ShowDropDownModal = (index, question_index, ans_index) => {
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = question_payload.show_dropdown_modal
      ? false
      : true;
    setPart_c_data(part_c);
  };

  //On close drop down modal
  const onCloseDropDownModal = (index, question_index, ans_index) => {
    let part_c = [...part_c_data];
    let question_payload =
      part_c[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = false;
    setPart_c_data(part_c);
  };

  //Survey Questions field view
  const SurveyFieldView = (item, section, index) => {
    return (
      <View>
        <View style={styles.question_view}>
          {item.section_name !== "" && (
            <Text style={styles.section_name}>
              {item.section_name.toUpperCase()}
            </Text>
          )}
          <View style={styles.field_view_top} />
          <View style={styles.whiteView}>
            {item.questions.map((it, question_index) => (
              <View>
                <FieldTitle
                  fieldTitle={it.title}
                  textRef={(input) => {
                    TextRef.current[it.qn_ranking] = input;
                  }}
                />
                <View>
                  {it.answers.map((i, ans_index) => (
                    <View>
                      {i.dtype == "textbox"
                        ? TextBoxField(i, index, question_index, ans_index)
                        : i.dtype == "selectbox"
                        ? SelectBoxField(i, index, question_index, ans_index)
                        : i.dtype == "datepicker" || i.dtype == "timepicker"
                        ? DatePicker(i, index, question_index, ans_index)
                        : i.dtype == "other_textbox" &&
                          it.others_status === param_check(it.others_status)
                        ? TextBoxField(i, index, question_index, ans_index)
                        : i.dtype == "other_selectbox" &&
                          it.others_status === param_check(it.others_status)
                        ? SelectBoxField(i, index, question_index, ans_index)
                        : null}
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

  const onPauseCancel = () => {
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
            page: "page3",
            no: pageNum,
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
      }, 500);
    }
    dispatch(survey_a_data(part_a));
  };

  const pausePress = async () => {
    setPauseModel(true);
  };
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        ref={section_list_c_ref}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.form_scroll_view}
      >
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={part_c_data}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text style={styles.category_name}>
                  {section.category_name.toUpperCase()}
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

export default SurveyFormPartC;
