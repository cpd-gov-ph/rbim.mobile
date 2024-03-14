import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input"; // UI elements
import { HelperText } from "react-native-paper"; // UI elements
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import styles from "./surveyNumber.styles"; // Survey number styles
import Colors from "../../themes/colors"; // Themes
import { containsOnlyNumbers, isEmpty, snackBar } from "../../utils/helpers"; // Helper functions
import Vector from "../../constants/Vector"; // Icons
import {
  survey_number,
  storage_key,
  auth_content,
  common_content,
  navigation_screens,
} from "../../strings"; // Strings
import {
  getOngoingSurveyDetails,
  getSurveyQuestions,
  setOngoingSurveyDetails,
  setSurveyDetails,
} from "../../utils/localStorage"; // Local storage data
import {
  survey_a_data,
  survey_b_data,
  survey_c_data,
  survey_info,
  survey_info_data,
  survey_initial_section,
  survey_notes,
  survey_signature,
  survey_submit_type,
} from "../../store/actions/surveyActions"; // Survey actions
import Loader from "../../utils/Loader"; // Custom loader

const SurveyNumber = ({ navigation }) => {
  const [surveyNumber, setSurveyNumber] = useState(""); // Survey Number state
  const [numError, setNumError] = useState(false); // Survey Number error state
  const [quarter_type, setQuater] = useState("");
  const [loading, SetLoading] = useState(false);

  const [init_data, setInit_data] = useState({});
  const [init_data_1, setInit_data_1] = useState({});
  const [init_data_3, setInit_data_3] = useState([]);
  const [initial_section_options, setInitSection] = useState([]);
  const [radioButtonData, setRadioButtonData] = useState([]);

  const [rank_array, setRank_array] = useState([]);
  const [qn_rank_array, setQn_rank_array] = useState([]);
  const [qn_rank_array_b, setQn_rank_array_b] = useState([]);
  const [qn_rank_array_c, setQn_rank_array_c] = useState([]);
  const [rank_array_b, setRank_array_b] = useState([]);
  const [rank_array_c, setRank_array_c] = useState([]);

  const dispatch = useDispatch();

  const survey_initialData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const userId = useSelector((state) => state?.surveyReducer?.userId);
  let surveyData = [];
  let surveyDataB = [];
  let surveyDataC = [];
  useEffect(() => {
    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let form_data = JSON.parse(res);
        setInit_data(survey_initialData);
        setInit_data_1(survey_initialData.section[0].questions[0]);
        setInit_data_3(survey_initialData.section[0].questions[2].answers);
        setInitSection(survey_initialData.section[0].questions[1].answers);
        setRadioButtonData(
          survey_initialData.section[0].questions[1].answers.map((item) => {
            return { ...item, answer_value: false };
          })
        );

        surveyData = form_data.data.interview_section;
        surveyData.forEach((res_sec) => {
          res_sec.section.forEach((res_qus) => {
            res_qus.questions.forEach((res_ans, index) => {
              qn_rank_array.push(index);
              setQn_rank_array([...qn_rank_array]);
              if (qn_rank_array.length !== 0) {
                for (var i = 1; i <= qn_rank_array.length; i++) {
                  res_ans.qn_ranking = i;
                }
              }
              res_ans.answers.forEach((ans, ans_ind) => {
                rank_array.push(ans_ind);
                setRank_array([...rank_array]);
                if (rank_array.length !== 0) {
                  for (var i = 1; i <= rank_array.length; i++) {
                    res_ans.answers[0].ranking = i;
                  }
                }
              });
            });
          });
        });

        surveyDataB = form_data.data.house_hold_member_section;
        surveyDataB.forEach((res_page) => {
          res_page.page.forEach((res_sec) => {
            res_sec.section.forEach((res_qus) => {
              res_qus.questions.forEach((res_ans, index) => {
                qn_rank_array_b.push(index);
                setQn_rank_array_b([...qn_rank_array_b]);
                if (qn_rank_array_b.length !== 0) {
                  for (var i = 1; i <= qn_rank_array_b.length; i++) {
                    res_ans.qn_ranking = i;
                  }
                }
                res_ans.answers.forEach((ans, ans_ind) => {
                  rank_array_b.push(ans_ind);
                  setRank_array_b([...rank_array_b]);
                  if (rank_array_b.length !== 0) {
                    for (var i = 1; i <= rank_array_b.length; i++) {
                      res_ans.answers[ans_ind].ranking = i;
                    }
                  }
                });
              });
            });
          });
        });
        surveyDataC = form_data.data.final_section;
        surveyDataC.forEach((res_sec) => {
          res_sec.section.forEach((res_qus) => {
            res_qus.questions.forEach((res_ans, index) => {
              qn_rank_array_c.push(index);
              setQn_rank_array_c([...qn_rank_array_c]);
              if (qn_rank_array_c.length !== 0) {
                for (var i = 1; i <= qn_rank_array_c.length; i++) {
                  res_ans.qn_ranking = i;
                }
              }
              res_ans.answers.forEach((ans, ans_ind) => {
                rank_array_c.push(ans_ind);
                setRank_array_c([...rank_array_c]);
                if (rank_array_c.length !== 0) {
                  for (var i = 1; i <= rank_array_c.length; i++) {
                    res_ans.answers[ans_ind].ranking = i;
                  }
                }
              });
            });
          });
        });

        let survey_options = survey_initialData.section[0].questions[1].answers;
        survey_options.map((it) => {
          it.answer_value = false;
        });
        dispatch(survey_notes(""));
        dispatch(survey_signature(""));
        dispatch(survey_a_data(surveyData));
        dispatch(survey_b_data(surveyDataB));
        dispatch(survey_c_data(surveyDataC));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Next button validation
  const onClickNext = () => {
    let survey_num = init_data.section[0].questions[0].answers[0].answer_value;
    if (survey_num === null) {
      setNumError(true);
    } else if (!containsOnlyNumbers(survey_num)) {
      setNumError(true);
    } else if (survey_num.length < 6) {
      setNumError(true);
    } else if (initial_section_options.some((it) => it.answer_value) !== true) {
      snackBar(survey_number.radio_error_text);
    } else {
      Alert.alert(
        auth_content.RBIM,
        common_content.warning_content,
        [
          {
            text: common_content.cancel,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: common_content.ok,
            onPress: () => SurveyCallAction(survey_num),
          },
        ],
        { cancelable: false }
      );
    }
  };
  const SurveyCallAction = (survey_num) => {
    let survey_info_payload = {
      survey_no: survey_num,
      is_single: quarter_type === "Household" ? 0 : 1,
      quarter_type: quarter_type,
    };

    dispatch(survey_info(survey_info_payload));
    callApi();
  };
  // Call Api
  const callApi = async () => {
    let survey_num = init_data.section[0].questions[0].answers[0].answer_value;
    SetLoading(true);
    let data = {
      survey_number: survey_num,
      mobile_next_section: {
        page: "page0",
        no: 0,
      },
      initial_section: survey_initialData,
      status: "survey_ongoing",
      members: [],
      household_member_count: 0,
      interview_section: surveyData,
      house_hold_member_section: surveyDataB,
      final_section: surveyDataC,
      notes: "",
    };

    let entry_dummy_request = {
      mb_local: data,
    };
    let js = JSON.stringify(entry_dummy_request);
    setSurveyDetails(`${survey_num}`, js);
    SetLoading(false);
    getOngoingSurveyDetails(storage_key.survey_ongoing + userId)
      .then((res) => {
        if (res !== null) {
          let arr = JSON.parse(res);
          let js = JSON.stringify([`${survey_num}`, ...arr]);
          setOngoingSurveyDetails(storage_key.survey_ongoing + userId, js);
        } else {
          let js = JSON.stringify([`${survey_num}`]);
          setOngoingSurveyDetails(storage_key.survey_ongoing + userId, js);
        }
        navigation.navigate(navigation_screens.SurveyFormPartA, { no: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on change Radio button function
  const onRadioChangeAction = (item, index) => {
    let ch = initial_section_options.map((it, ind) => {
      if (index === ind) {
        it.answer_value = true;
      } else {
        it.answer_value = false;
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
      {isEmpty(init_data) ? (
        <Loader loading={true} />
      ) : (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Loader loading={loading} />
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
                style={styles().otpView}
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

            <View style={styles().radio_btn_parent_view}>
              {initial_section_options.map((item, index) => (
                <TouchableOpacity
                  key={index}
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
            <View style={styles().privacy_rights_box}>
              {init_data_3.map((item, index) => (
                <Text key={index} style={styles().privacy_rights_text}>
                  {item.options}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles().button_view}>
            <TouchableOpacity
              style={styles().next_button}
              onPress={onClickNext}
            >
              <Text style={styles().next_button_text}>
                {survey_number.button_text}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default SurveyNumber;
