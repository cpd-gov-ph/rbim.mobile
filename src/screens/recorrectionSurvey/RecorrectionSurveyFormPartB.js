import { Text, View, TouchableOpacity, Dimensions } from "react-native";
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
  MultiLineTextInputField,
  MultiSelectDropDownField,
} from "../../components"; // Custom components
import Styles from "../survey/survey.styles"; // Re correction survey styles
import Vector from "../../constants/Vector"; // Icons
import {
  survey_form,
  data_type,
  age_validation,
  survey_number,
  survey_questions,
  navigation_screens,
} from "../../strings"; // Strings
import { param_check, validateSpace } from "../../utils/helpers"; // Helper functions
import { survey_b_data } from "../../store/actions/surveyActions"; // Survey actions
import Colors from "../../themes/colors"; // Themes

let { width } = Dimensions.get("window");

const RecorrectionSurveyFormPartB = ({ navigation }) => {
  const styles = Styles();

  const section_list_b_ref = useRef();
  const dispatch = useDispatch();
  const TextBoxRef = useRef([]);
  const TextRef = useRef([]);

  const [personIndex, SetPersonIndex] = useState(0);
  const [pageIndex, SetPageIndex] = useState(0);

  const survey_info_data = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_survey_info
  );
  const survey_part_b_data = useSelector(
    //Array data of part b
    (state) => state?.surveyReducer?.survey_part_b
  );
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.recorrection_household_info.householdlist
  );
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [error_array, setError_array] = useState([]);
  const [error_obj, setError_obj] = useState({});

  useEffect(() => {
    if (
      householdlist[personIndex].category[0].page[0].section[0].questions[4]
        .answers[0].answer_value
    ) {
      let value =
        householdlist[personIndex].category[0].page[0].section[0].questions[4]
          .answers[0].answer_value;

      const birthDay = moment(value, "DD/MM/YYYY");
      const now = moment();
      const age_string = moment.duration(now.diff(birthDay)).years();
      console.log("age_string", age_string);
      setAge(age_string);
    }
    if (
      householdlist[personIndex].category[0].page[0].section[0].questions[2]
        .answers[0].answer_value
    ) {
      setGender(
        householdlist[personIndex].category[0].page[0].section[0].questions[2]
          .answers[0].answer_value
      );
    }
  }, [personIndex]);

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
                    console.log(error_rank, "ERROR RANK");
                   // TextRef.current[qn_error_rank]?.focus();
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

    let error_boolean_array = [];

    householdlist[personIndex].category[pageIndex].page.forEach(
      (items, index) => {
        items.section.forEach((item, section_index) => {
          item.questions.forEach((it, question_index) => {
            if (!param_check(item.is_enable) || item.is_enable) {
              if(it.is_qn_enable !== false){
                it.answers.forEach((i, ans_index) => {
                  if (i.dtype == "other_textbox" || i.dtype == "other_datepicker") {
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

    if (error_boolean_array.every((it) => it === false)) {
      setTimeout(() => {
        section_list_b_ref.current.scrollToPosition(0, 0, { animated: false });
      }, 500);

      if (pageIndex === 5) {
        if (householdlist.length == personIndex + 1) {
          navigation.navigate(navigation_screens.RecorrectionSurveyFormPartC);
        } else {
          SetPersonIndex(personIndex + 1);
          SetPageIndex(0);
        }
      } else {
        if (pageIndex == 5) {
          if (householdlist.length == personIndex + 1) {
            navigation.navigate(navigation_screens.RecorrectionSurveyFormPartC);
          } else {
            SetPageIndex(0);
            SetPersonIndex(personIndex + 1);
          }
        } else {
          SetPageIndex(pageIndex + 1);
        }
      }
    }
  };

  //On click previous button
  const onClickPrevious = () => {
    setTimeout(() => {
      try {
        if (section_list_b_ref.current == null) {
          // Not Used
        } else {
          if (pageIndex !== 0) {
            section_list_b_ref.current.scrollToPosition(0, 0, {
              animated: false,
            });
          }
        }
      } catch (error) {}
    }, 500);

    if (personIndex == 0) {
      if (pageIndex == 0) {
        navigation.goBack();
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
    it,
    isQnVisible,
  ) => {
    return (
      <CustomTextInputField
        keyboardType={i.keyboard_type === "number" ? "numeric" : "default"}
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, section_index, index, question_index, ans_index);
        }}
        //value={i.answer_value}
        value={!isVisible ? null : i.answer_value}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        errorText={i.error_message}
        //  editable={isVisible}
        editable={it.is_rejected && isVisible  && isQnVisible ? true : false}
        recorrection={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
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
    it
  ) => {
    return (
      <MultiLineTextInputField
        placeholder={i.placeholder}
        handleInputChange={(text) => {
          onTextChange(text, section_index, index, question_index, ans_index);
        }}
        //value={i.answer_value}
        value={!isVisible ? null : i.answer_value}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        errorText={i.error_message}
        editable={it.is_rejected && isVisible ? true : false}
        recorrection={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
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
    it,
    isQnVisible = true,
  ) => {
    return (
      <DropDownField
        placeholder={i.placeholder}
        data={i.options}
        onchangeText={(val) => {
          onChangeText(val, section_index, index, question_index, ans_index);
        }}
        isVisible={
          param_check(i.show_dropdown_modal) ? i.show_dropdown_modal : false
        }
        dropDownPress={() => {
          ShowDropDownModal(
            section_index,
            index,
            question_index,
            ans_index,
            it
          );
        }}
        //selectedValue={i.answer_value}
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
        error_message={i.error_message}
        //disabled={it.is_rejected}
        disabled={!it.is_rejected && isVisible  || !isQnVisible ? true : false}
        recorrection={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
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
    isVisible = true,
    it
  ) => {
    return (
      <MultiSelectDropDownField
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
            ans_index,
            it
          );
        }}
        disabled={!it.is_rejected && isVisible ? true : false}
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
        editable={it.is_rejected && isVisible ? true : false}
        //selectedData={i.answer_value}
        selectedData={!isVisible ? null : i.answer_value}
        dropDownTitle={i.placeholder}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        error_message={i.error_message}
        recorrection={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
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
    isVisible,
    it
  ) => {
    console.log("it", it);
    return (
      <DatePickerField
        datetype={i.dtype}
        OnDatePicker={() =>
          ShowDatePicker(section_index, index, question_index, ans_index)
        }
        //selectedDate={i.answer_value}
        selectedDate={!isVisible ? null : i.answer_value}
        onchangeText={(val) => {
          onChangeText(val, section_index, index, question_index, ans_index);
        }}
        showpicker={param_check(i.show_picker) ? i.show_picker : false}
        placeholder={i.placeholder}
        onCancel={() =>
          onDateCancel(section_index, index, question_index, ans_index)
        }
        onChangeDateChange={(res) =>
          onTextChange(res, section_index, index, question_index, ans_index)
        }
        disabled={!it.is_rejected}
        is_error={error_check(
          i,
          index,
          section_index,
          question_index,
          ans_index
        )}
        error_message={i.error_message}
        recorrection={it.is_rejected}
        noteText={
          it.reject_reason === null ? survey_number.no_reason : it.reject_reason
        }
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
      default:
        section_names.is_enable = false;
        break;
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

    switch (question_payload.dtype) {
      case data_type.text_box: {
        console.log("Text", text);
        // Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        // console.log("Partb", partB)
        console.log("personIndex", personIndex);
        console.log("pageIndex", pageIndex);
        console.log("index", index);
        console.log("section_index", section_index);

        partB[personIndex].category[pageIndex].page[index].section[
          section_index
        ].questions[question_index].answers[ans_index].answer_value = text;

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
          partB[personIndex].category[5].page[1].section[0].is_enable =
            age >= 18 ? true : false;
          partB[personIndex].category[5].page[2].section[0].is_enable =
            age >= 15 ? true : false;
          console.log("AGE", age);
        }
        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.textarea: {
        // Multi line Text Input On Change
        question_payload.answer_value = text;
        question_payload.is_error = false;
        dispatch(survey_b_data(partB));
        break;
      }
      case data_type.selectbox: {
        console.log("question_payload", question_payload);
        // Dropdown Input On Change
        question_payload.answer_value = text;
        console.log("dropdown", question_payload.answer_value);
        if (
          others_payload.title ==
          survey_questions.migrant_and_transient
        ) {
          partB[personIndex].category[4].page[0].section[1].is_enable =
            text === "Non-Migrant" ? false : true;
          partB[personIndex].category[5].page[0].section[0].is_enable =
            text === "Non-Migrant" ? false : true;
        }
       else if (others_payload.title == survey_questions.valid_ctc) {
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
        } else {
          others_payload.others_status =
            text === "Others" || text === "Non-Filipino" ? true : false;
        }
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
    ans_index,
    it
  ) => {
    console.log("it.is_rejected", it.is_rejected);
    if (it.is_rejected) {
      let partB = [...householdlist];
      let question_payload =
        partB[personIndex].category[pageIndex].page[index].section[
          section_index
        ].questions[question_index].answers[ans_index];
      question_payload.show_dropdown_modal =
        question_payload.show_dropdown_modal ? false : true;
      console.log("question_payload.show_dropdown_modal", question_payload);
      dispatch(survey_b_data(partB));
    }
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
    ans_index,
    it
  ) => {
    if (it.is_rejected) {
      let partB = [...householdlist];
      let question_payload =
        partB[personIndex].category[pageIndex].page[index].section[
          section_index
        ].questions[question_index].answers[ans_index];
      question_payload.show_multi_dropdown_modal =
        question_payload.show_multi_dropdown_modal ? false : true;
      console.log(
        "question_payload.show_dropdown_modal",
        question_payload.show_multi_dropdown_modal
      );
      dispatch(survey_b_data(partB));
    }
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

    //  alert('jjjads')
  };
  const section_index = 0;

  return (
    <View style={styles.container}>
      <Header
        survey_num={survey_info_data.survey_no}
        onNotesPress={() => navigation.navigate(navigation_screens.RecorrectionNotes)}
        pause_survy={false}
      />
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
                navigation.navigate(navigation_screens.RecorrectionSwitchPerson, { backData });
              }}
            >
              {Vector.SwitchPerson}
              <Text style={styles.switch_person_text}>
                {survey_form.switchPerson}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {pageIndex !== 0 && (
          <View style={styles.age_gender_view}>
            <Text style={styles.age}>
              {survey_form.age} {age}
            </Text>
            <Text style={styles.gender}>
              {survey_form.gender} {gender}
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
                          <View style={styles.field_view_top} />
                          {section.questions.map((it, question_index) => (
                            <View
                              key={question_index}
                              style={{ backgroundColor: "white" }}
                            >
                              <FieldTitle
                                recorrection={it.is_rejected}
                                is_visible={section.is_enable && it.is_qn_enable}
                                fieldTitle={it.title}
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
                                          it,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "textarea"
                                      ? MultiLineTextBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it
                                        )
                                      : i.dtype == "selectbox"
                                      ? SelectBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "multiselectbox"
                                      ? MultiSelectBoxField(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it
                                        )
                                      : i.dtype == "datepicker" ||
                                        i.dtype == "timepicker"
                                      ? DatePicker(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it
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
                                          it,
                                          it.is_qn_enable,
                                        )
                                      : i.dtype == "age_picker"
                                      ? DatePicker(
                                          i,
                                          section_index,
                                          index,
                                          question_index,
                                          ans_index,
                                          section.is_enable,
                                          it
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
                                          section.is_enable,
                                          it
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
      </KeyboardAwareScrollView>
      <Footer
        onPressPreviousButton={onClickPrevious}
        onPressNextButton={onClickNext}
        next_disabled={false}
      />
    </View>
  );
};

export default RecorrectionSurveyFormPartB;
