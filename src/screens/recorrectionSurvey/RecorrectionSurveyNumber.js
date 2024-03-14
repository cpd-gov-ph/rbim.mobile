import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input"; // UI elements
import { HelperText } from "react-native-paper"; // UI elements
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import styles from "../survey/surveyNumber.styles"; // Re correction survey number styles
import Colors from "../../themes/colors"; // Themes
import { dimen_size_height, snackBar } from "../../utils/helpers"; // Helper functions
import Vector from "../../constants/Vector"; // Icons
import { navigation_screens, survey_number } from "../../strings"; // Strings
import {recorrection_survey_info} from "../../store/actions/surveyActions"; // Survey actions

const RecorrectionSurveyNumber = ({ navigation }) => {
  const [numError, setNumError] = useState(false); // Survey Number error state
  const [quarter_type, setQuater] = useState("");

  const [init_data, setInit_data] = useState({});
  const [init_data_1, setInit_data_1] = useState({});
  const [init_data_2, setInit_data_2] = useState({});

  const [init_data_3, setInit_data_3] = useState([]);
  const [radioButtonData, setRadioButtonData] = useState([]);
  const [surveyCode, setSurveryCode] = useState(0);
  const dispatch = useDispatch();
  const recorrection_initialData = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_initial_section
  );
  useEffect(() => {
    setInit_data_2(recorrection_initialData.section[0].questions[1]);
   
    setInit_data(recorrection_initialData);
    
    setInit_data_1(recorrection_initialData.section[0].questions[0]);
    setInit_data_3(recorrection_initialData.section[0].questions[2].answers);
    setSurveryCode(
      recorrection_initialData.section[0].questions[0].answers[0].answer_value
    );
    setRadioButtonData(
      recorrection_initialData.section[0].questions[1].answers.map((item) => {
        return { ...item, isChecked: false };
      })
    );
  }, []);

  //Next button validation
  const onClickNext = () => {
    let survey_num = init_data.section[0].questions[0].answers[0].answer_value;
    if (survey_num === null) {
      setNumError(true);
    } else if (survey_num.length < 6) {
      setNumError(true);
    } else if (radioButtonData.some((it) => it.answer_value) !== true) {
      snackBar(survey_number.radio_error_text);
    } else {
      let survey_info_payload = {
        survey_no: survey_num,
        is_single: quarter_type === "Household" ? 0 : 1,
        quarter_type: quarter_type,
      };
      dispatch(recorrection_survey_info(survey_info_payload));
      navigation.navigate(navigation_screens.RecorrectionSurveyFormPartA);
      
 
    }
  };

  //on change Radio button function
  const onRadioChangeAction = (item, index) => {
    let ch = radioButtonData.map((it, ind) => {
      let temp = Object.assign({}, it);
      if (ind === index) {
        setQuater(temp.placeholder);

        temp.answer_value = true;
        return temp;
      } else {
        temp.answer_value = false;
        return temp;
      }
    });
    setRadioButtonData(ch);
  };

  const onChangeCode = (num) => {
    let init = { ...init_data };
    let question_payload_1 = init_data.section[0].questions[0].answers[0];
    question_payload_1.answer_value = num;
    setInit_data(init);
  };
  return (
    <SafeAreaView style={styles().container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles().title}>{survey_number.survey_title}</Text>
        <View style={styles().whiteView}>
          <View style={styles().otp_field_view}>
            <Text style={styles().field_title}>
              {init_data_1.title} <Text style={styles().star_text}>*</Text>{" "}
            </Text>
            <OTPInputView
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={[
                styles().survey_num_box,
                {
                  borderColor: numError
                    ? Colors.error_red
                    : Colors.border_color,
                },
              ]}
              editable={false}
              style={styles().otpView}
              code={surveyCode.toString()}
              onCodeChanged={(num) => {
                onChangeCode(num);
                setNumError(false);
              }}
              selectionColor={Colors.lineColor}
            />

            <HelperText
              style={styles().error_text}
              type="error"
              visible={numError}
            >
              {survey_number.num_error_text}
            </HelperText>
          </View>

          <View
            style={[
              styles().radio_btn_parent_view,
              {
                backgroundColor:init_data_2.is_rejected ?  Colors.error_pink_background:null,
                 height:init_data_2.is_rejected ? dimen_size_height(7) : null,
              },
            ]}
          >
            {radioButtonData.map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={!init_data_2.is_rejected}
                onPress={() => onRadioChangeAction(item, index)}
                style={styles().radio_btn_field_view}
              >
                <View>
                  {item.answer_value ? Vector.RadioOn : Vector.RadioOff}
                </View>

                <Text style={styles().radio_text}>{item.placeholder}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {init_data_2.is_rejected ? (
            <View style={styles().notesView}>
              <Text style={styles().noteTitle}>Notes for review:</Text>
              <Text style={styles().noteText} numberOfLines={200}>
                {init_data_2.reject_reason}
              </Text>
            </View>
          ) : null}

          <View  style={styles().privacy_rights_box}>
            {init_data_3.map((item) => (
              <Text style={styles().privacy_rights_text}>{item.options}</Text>
            ))}
          </View>
        </View>

        <View style={styles().button_view}>
          <TouchableOpacity style={styles().next_button} onPress={onClickNext}>
            <Text style={styles().next_button_text}>
              {survey_number.button_text}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecorrectionSurveyNumber;
