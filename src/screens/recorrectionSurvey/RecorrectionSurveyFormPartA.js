import { Text, View, SectionList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import moment from "moment"; // For formatting date and time
import { useSelector } from "react-redux"; // Retrieving the state from the Redux store
import {
  CustomTextInputField,
  DatePickerField,
  DropDownField,
  FieldTitle,
  Footer,
  Header,
} from "../../components"; // Custom components
import Styles from "../survey/survey.styles"; // Re correction styles
import {getSurveyQuestions} from "../../utils/localStorage"; // Local storage data
import { storage_key, survey_number, data_type, navigation_screens } from "../../strings"; // Strings
import { param_check, validateSpace } from "../../utils/helpers"; // Helper function


const RecorrectionSurveyFormPartA = ({ navigation }) => {
  const styles = Styles();


  const section_list_a_ref = useRef();

  const [pageNum, setPageNum] = useState(2); // Page Number state

  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});

  const [part_a_data, setPart_a_data] = useState([]);
  const survey_part_a_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_survey_part_a
  );
  const survey_info_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_survey_info
  );
  useEffect(() => {
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
        // error
      });
      setTimeout(() => {
        try {
          
       
        if(section_list_a_ref.current !== null ){
          section_list_a_ref.current.scrollToPosition(0, 0, { animated: false });
  
        }
      } catch (error) {
          
      }
      }, 500);
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
  const ShowDatePicker = (index, question_index, ans_index,it) => {
    if(it.is_rejected){

    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_picker = question_payload.show_picker ? false : true;
    setPart_a_data(part_a);
    }
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
  const ShowTimePicker = (index, question_index, ans_index,it) => {
    if(it.is_rejected){

    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_time_picker = question_payload.show_time_picker
      ? false
      : true;
    setPart_a_data(part_a);
    }
  };
  //On Input Change for field
  const onTextChange = (text, index, question_index, ans_index) => {
    setError_array([]);
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];

    switch (question_payload.dtype) {
      case data_type.text_box: {
        // Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;

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
  const ShowDropDownModal = (index, question_index, ans_index,it) => {
    if(it.is_rejected){
      let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
    question_payload.show_dropdown_modal = question_payload.show_dropdown_modal
      ? false
      : true;
    setPart_a_data(part_a);
    }
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
              let obj = {
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

              setPart_a_data(part_a);
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
    part_a_data[0].data.forEach((item, index) => {
      item.questions.forEach((it, question_index) => {
        if (!it.is_read_only) {
          it.answers.forEach((i, ans_index) => {
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
        navigation.navigate(navigation_screens.RecorrectionSurveyFormPartB);
      } else {
        setPageNum(pageNum + 1 > 4 ? 4 : pageNum + 1);
      }
    }
  };

  const onChangeText = (text, index, question_index, ans_index) =>{
    let part_a = [...part_a_data];
    let question_payload =
      part_a[0].data[index].questions[question_index].answers[ans_index];
      question_payload.answer_value = "";
        setPart_a_data(part_a);
  }


  //On click previous button
  const onClickPrevious = () => {
    if (pageNum === 2) {
      navigation.goBack();
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

  //Survey Questions field view
  const SurveyFieldView = (item, index) => {
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
                  recorrection={it.is_rejected}
                  fieldTitle={it.title}
                  disabled={it.is_read_only}
                />
                <View>
                  {it.answers.map((i, ans_index) => (
                    <View>
                      {i.dtype == "textbox" ? (
                        <CustomTextInputField
                          keyboardType={
                            i.keyboard_type === "number" ? "numeric" : "default"
                          }
                          recorrection={it.is_rejected}
                          editable={it.is_rejected}
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
                          errorText={i.error_message}
                          noteText={
                            it.reject_reason === null
                              ? survey_number.no_reason
                              : it.reject_reason
                          }
                        />
                      ) : i.dtype == "selectbox" ? (
                        <DropDownField
                          noteText={
                            it.reject_reason === null
                              ? survey_number.no_reason
                              : it.reject_reason
                          }
                          recorrection={it.is_rejected}
                          onchangeText={(val)=>{
                            onChangeText(val, index, question_index, ans_index)
                          }}
                          placeholder={i.placeholder}
                          data={i.options}
                          isVisible={
                            param_check(i.show_dropdown_modal)
                              ? i.show_dropdown_modal
                              : false
                          }
                          dropDownPress={() =>
                            ShowDropDownModal(index, question_index, ans_index,it)
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
                          //disabled={it.is_read_only}
                          disabled={!it.is_rejected}
                          value={i.answer_value}
                          is_error={error_check(
                            i,
                            index,
                            question_index,
                            ans_index
                          )}
                          error_message={i.error_message}
                        />
                      ) : i.dtype == "datepicker" ? (
                        <DatePickerField
                          datetype={i.dtype}
                          noteText={
                            it.reject_reason === null
                              ? survey_number.no_reason
                              : it.reject_reason
                          }
                          recorrection={it.is_rejected}
                          onchangeText={(val)=>{
                            onChangeText(val, index, question_index, ans_index)
                          }}
                          OnDatePicker={() =>
                            ShowDatePicker(index, question_index, ans_index,it)
                          }
                          selectedDate={i.answer_value}
                          //disabled={it.is_read_only}
                          disabled={!it.is_rejected}
                          showpicker={
                            param_check(i.show_picker) ? i.show_picker : false
                          }
                          placeholder={i.placeholder}
                          onCancel={() =>
                            onDateCancel(index, question_index, ans_index)
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
                          error_message={i.error_message}
                        />
                      ) : i.dtype == "timepicker" ? (
                        <DatePickerField
                          mode={"time"}
                          OnDatePicker={() =>
                            ShowTimePicker(index, question_index, ans_index,it)
                          }
                          selectedDate={i.answer_value}
                          onchangeText={(val)=>{
                            onChangeText(val, index, question_index, ans_index)
                          }}
                          //disabled={it.is_read_only}
                          disabled={!it.is_rejected}
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
                          error_message={i.error_message}
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
  return (
    <View style={styles.container}>
      <Header
        pause_survey={false}
        survey_num={survey_info_data.survey_no}
        onNotesPress={() => navigation.navigate(navigation_screens.RecorrectionNotes)}
      />
      <KeyboardAwareScrollView
        ref={section_list_a_ref}
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.form_scroll_view}
      >
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
            SurveyFieldView(item, index)
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

export default RecorrectionSurveyFormPartA;
