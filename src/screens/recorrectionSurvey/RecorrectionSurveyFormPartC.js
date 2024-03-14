import { Text, View, SectionList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import moment from "moment"; // For formatting date and time
import { useDispatch, useSelector } from "react-redux"; // Retrieving the state from the Redux store
import {
  CustomTextInputField,
  DatePickerField,
  DropDownField,
  FieldTitle,
  Footer,
  Header,
} from "../../components"; // Custom components
import Styles from "../survey/survey.styles"; // Re correction survey styles
import {getSurveyQuestions} from "../../utils/localStorage"; // Local storage data
import { storage_key, data_type, survey_number, navigation_screens } from "../../strings"; // Strings
import { param_check, validateSpace } from "../../utils/helpers"; // Helper functions

const RecorrectionSurveyFormPartC = ({ navigation }) => {
  const styles = Styles();


  const section_list_c_ref = useRef();

  const [pageNum, setPageNum] = useState(1); // Page Number state

  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});

  const [part_c_data, setPart_c_data] = useState([]);
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_part_c
  );

  const survey_info_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_survey_info
  );

  useEffect(() => {
    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let survey_c = survey_part_c_data;
        setPart_c_data(
          survey_c
            .filter((it) => it.page === pageNum)
            .map(({ section, ...rest }) => ({
              data: section,
              ...rest,
            }))
        );
      })
      .catch((err) => {
        // error
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
              }
              setPart_c_data(part_c);
            } else {
              // TODO document why this block is empty
            
            }
          } else {
            // TODO document why this block is empty
          
          }
        });
      });
    });

    let error_boolean_array = [];
    part_c_data[0].data.forEach((item, index) => {
      item.questions.forEach((it, question_index) => {
        it.answers.forEach((i, ans_index) => {
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
        navigation.navigate(navigation_screens.RecorrectionVerifySignature);
      } else {
        setPageNum(pageNum + 1 > 3 ? 3 : pageNum + 1);
      }
    }
  };

  //On click previous button
  const onClickPrevious = () => {
    if (pageNum === 1) {
      navigation.goBack();
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

  //Text Input Field
  const TextBoxField = (i, index, question_index, ans_index, it) => {
    return (
      <CustomTextInputField
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, index, question_index, ans_index);
        }}
        value={i.answer_value}
        is_error={error_check(i, index, question_index, ans_index)}
        errorText={i.error_message}
        keyboardType={i.keyboard_type === "number" ? "numeric" : "default"}
        maxLength={i.limitation !== null ? i.limitation : 200}
        recorrection={it.is_rejected}
        editable={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
      />
    );
  };
  //Drop Down Field
  const SelectBoxField = (i, index, question_index, ans_index, it) => {
    return (
      <DropDownField
        placeholder={i.placeholder}
        data={i.options}
        onchangeText={(val)=>{
          onChangeText(val, index, question_index, ans_index)
        }}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
        recorrection={it.is_rejected}
        //  disabled={it.is_rejected}
        disabled={!it.is_rejected}
        isVisible={
          param_check(i.show_dropdown_modal) ? i.show_dropdown_modal : false
        }
        dropDownPress={() => {
          ShowDropDownModal(index, question_index, ans_index, it);
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
        error_message={i.error_message}
      />
    );
  };
  //DatePicker Field
  const DatePicker = (i, index, question_index, ans_index, it) => {
    return (
      <DatePickerField
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
        //disabled={it.is_rejected}
        disabled={!it.is_rejected}
        recorrection={it.is_rejected}
        onchangeText={(val)=>{
          onChangeText(val, index, question_index, ans_index)
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
        error_message={i.error_message}
      />
    );
  };

  const onChangeText = (text, index, question_index, ans_index) =>{
    let part_c = [...part_c_data];
    let question_payload =
    part_c[0].data[index].questions[question_index].answers[ans_index];
      question_payload.answer_value = "";
      setPart_c_data(part_c);
  }

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
        // Text Input On Change
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
  const ShowDropDownModal = (index, question_index, ans_index, it) => {
    if (it.is_rejected) {
      let part_c = [...part_c_data];
      let question_payload =
        part_c[0].data[index].questions[question_index].answers[ans_index];
      question_payload.show_dropdown_modal =
        question_payload.show_dropdown_modal ? false : true;    
      setPart_c_data(part_c);
    }
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
                  recorrection={it.is_rejected}
                  fieldTitle={it.title}
                />
                <View>
                  {it.answers.map((i, ans_index) => (
                    <View>
                      {i.dtype == "textbox"
                        ? TextBoxField(i, index, question_index, ans_index, it)
                        : i.dtype == "selectbox"
                        ? SelectBoxField(
                            i,
                            index,
                            question_index,
                            ans_index,
                            it
                          )
                        : i.dtype == "datepicker" || i.dtype == "timepicker"
                        ? DatePicker(i, index, question_index, ans_index, it)
                        : i.dtype == "other_textbox" &&
                          it.others_status === param_check(it.others_status)
                        ? TextBoxField(i, index, question_index, ans_index, it)
                        : i.dtype == "other_selectbox" &&
                          it.others_status === param_check(it.others_status)
                        ? SelectBoxField(i, index, question_index, ans_index, it)
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

  return (
    <View style={styles.container}>
      <Header
        survey_num={survey_info_data.survey_no}
        onNotesPress={() => navigation.navigate(navigation_screens.RecorrectionNotes)}
        pause_survey={false}
      />
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
            const sectionIndex = part_c_data.indexOf(section);
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
      </KeyboardAwareScrollView>
      <Footer
        onPressPreviousButton={onClickPrevious}
        onPressNextButton={onClickNext}
        next_disabled={false}
      />
    </View>
  );
};

export default RecorrectionSurveyFormPartC;
