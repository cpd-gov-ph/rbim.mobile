import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  DatePickerField,
  DropDownField,
  FieldTitle,
  Header,
} from "../../components"; // Custom components
import Styles from "../survey/survey.styles"; // Re correction styles
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import NetInfo from "@react-native-community/netinfo"; // To get information about the net connection
import { recorrection_survey_a_data } from "../../store/actions/surveyActions"; // Survey actions
import Loader from "../../utils/Loader"; // Custom loader
import {
  setSurveyDetails,
  getOnSyncReCorrectionData,
  setOnSyncReCorrectionData,
  getOnSyncReCorrectionLocalData,
  setOnSyncReCorrectionLocalData,
} from "../../utils/localStorage"; // Local storage data
import { navigation_screens, storage_key } from "../../strings"; // Strings
import { onSyncRecorrectionSurveyAPICall } from "../../network/SyncAPI"; // API call
import { isResponseIsValid } from "../../utils/helpers"; // Helper functions

const RecorrectionFormSubmitPage = ({ navigation }) => {
  const styles = Styles();
  const dispatch = useDispatch();
  const survey_submit_loader = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_survey_submit_loading
  );
  const survey_overall_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_overall_data
  );
  const survey_part_a_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_part_a
  );

  const householdlist = useSelector(
    (state) => state?.surveyReducer?.recorrection_household_info.householdlist
  );
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_part_c
  );
  const recorrection_initialData = useSelector(
    // forgotpassword api progress loader
    (state) => state?.surveyReducer?.recorrection_initial_section
  );
  const survey_signature_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_signature
  );
  const survey_note_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_notes
  );
  const userId = useSelector((state) => state?.surveyReducer?.userId);
  const [isResult, SetResult] = useState(false);

  const [isTimePicker, SetTimePicker] = useState(false);
  const [isDatePicker, SetDatePicker] = useState(false);
  const [recorrectionLoading, setRecorrectionLoading] = useState(false);
  const onRecorrectionSubmit = () => {
    
    NetInfo.fetch().then(async (state) => {
      setRecorrectionLoading(true);
      if (state.isConnected) {
        let recorrection_overall_input = {
          id: survey_overall_data.id,
          survey_number: survey_overall_data.survey_number,
          data_collector_id: survey_overall_data.data_collector_id,
          data_reviewer_id: survey_overall_data.data_reviewer_id,
          survey_type: survey_overall_data.survey_type,
          household_member_count: survey_overall_data.household_member_count,
          data_collector_signature: survey_signature_data,
          data_reviewer_signature: null,
          notes: survey_note_data,
          members: survey_overall_data.members,
          initial_section: recorrection_initialData,
          interview_section: survey_part_a_data,
          house_hold_member_section: householdlist,
          final_section: survey_part_c_data,
          status: "survey_assigned",
          survey_assigned_on: new Date(),
        };
        
        const response = await onSyncRecorrectionSurveyAPICall(recorrection_overall_input);
        if (isResponseIsValid(response)) {
          setRecorrectionLoading(false);
          getOnSyncReCorrectionLocalData(
            storage_key.survey_localData + userId
          )
            .then((json) => {
              let js1 = JSON.parse(json);
              if (js1 != null) {
                if (js1.length > 0) {
                  let convert = js1.filter(item => item.survey_number !== survey_overall_data.survey_number)        
                  let str = JSON.stringify(convert);
                  setOnSyncReCorrectionLocalData(
                    storage_key.survey_localData + userId,
                    str
                  );
                  setTimeout(() => {
                    navigation.navigate(navigation_screens.MainScreens);
                  }, 1000);
                }else{
                  setTimeout(() => {
                    navigation.navigate(navigation_screens.MainScreens);
                  }, 1000);
                }
              }else{
                setTimeout(() => {
                  navigation.navigate(navigation_screens.MainScreens);
                }, 1000);
              }
            })
            .catch((error) => {
              // error
            });
            setRecorrectionLoading(false);



        }else{
          setRecorrectionLoading(false);
 
        }

      
      } else {
        let recorrection_overall_input = {
          id: survey_overall_data.id,
          survey_number: survey_overall_data.survey_number,
          data_collector_id: survey_overall_data.data_collector_id,
          data_reviewer_id: survey_overall_data.data_reviewer_id,
          survey_type: survey_overall_data.survey_type,
          household_member_count: survey_overall_data.household_member_count,
          data_collector_signature: survey_signature_data,
          data_reviewer_signature: null,
          notes: survey_note_data,
          members: survey_overall_data.members,
          initial_section: recorrection_initialData,
          interview_section: survey_part_a_data,
          house_hold_member_section: householdlist,
          final_section: survey_part_c_data,
          status: "survey_assigned",
          survey_assigned_on: new Date(),
        };
        let entry_dummy_request = {
          mb_local: recorrection_overall_input,
        };
        let js1 = JSON.stringify(entry_dummy_request);
        setSurveyDetails(survey_overall_data.survey_number, js1);
        getOnSyncReCorrectionData(storage_key.survey_reCorrection + userId)
          .then((res) => {
            setRecorrectionLoading(false);
            if (res !== null) {
              let arr = JSON.parse(res);
              let js = JSON.stringify([
                `${survey_overall_data.survey_number}`,
                ...arr,
              ]);
              setOnSyncReCorrectionData(
                storage_key.survey_reCorrection + userId,
                js
              );
              setTimeout(() => {
                getOnSyncReCorrectionLocalData(
                  storage_key.survey_localData + userId
                )
                  .then((json) => {
                    let js1 = JSON.parse(json);
                    if (js1 != null) {
                      if (js1.length > 0) {
                        let js2 = JSON.parse(js);
                        let convert = js1.filter(
                          (item) => !js2.includes(item.survey_number)
                        );
                        let str = JSON.stringify(convert);
                        setOnSyncReCorrectionLocalData(
                          storage_key.survey_localData + userId,
                          str
                        );
                        setTimeout(() => {
                          navigation.navigate(navigation_screens.MainScreens);
                        }, 1000);    
                      }
                    }
                  })
                  .catch((error) => {
                    // error
                  });
              }, 500);
            } else {
              let js = JSON.stringify([`${survey_overall_data.survey_number}`]);
              setOnSyncReCorrectionData(
                storage_key.survey_reCorrection + userId,
                js
              );
              getOnSyncReCorrectionLocalData(
                storage_key.survey_localData + userId
              )
                .then((json) => {
                  let js1 = JSON.parse(json);
                  if (js1 != null) {
                    if (js1.length > 0) {
                      let js2 = JSON.parse(js);
                      let convert = js1.filter(
                        (item) => !js2.includes(item.survey_number)
                      );
                      let str = JSON.stringify(convert);
                      setOnSyncReCorrectionLocalData(
                        storage_key.survey_localData + userId,
                        str
                      );
                      navigation.navigate(navigation_screens.MainScreens);
                    }
                  }
                })
                .catch((error) => {
                 // error
                });
            }
          })
          .catch((err) => {
            setRecorrectionLoading(false);
          });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={survey_submit_loader} />

      <Header submit_screen={true} onNotesPress={() => {}} />
      <Loader loading={recorrectionLoading} />
      <View style={styles.submit_screen_field_view}>
        <FieldTitle fieldTitle={"Time End"} />
        <DatePickerField
          mode={"time"}
          showpicker={isTimePicker}
          // OnDatePicker={
          //   () => SetTimePicker(true)
          //   // ShowTimePicker(index, question_index, ans_index)
          // }
          // onCancel={() => SetTimePicker(false)}
          placeholder={
            survey_part_a_data[1].section[0].questions[3].answers[0].placeholder
          }
          onChangeDateChange={(res) => {
            let time = moment(res).format("LT");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[3].answers[0].answer_value = time;
            dispatch(recorrection_survey_a_data(part_a));
            SetTimePicker(false);
          }}
          value={
            survey_part_a_data[1].section[0].questions[3].answers[0]
              .answer_value
          }
          selectedDate={
            survey_part_a_data[1].section[0].questions[3].answers[0]
              .answer_value
          }
        />
        <FieldTitle fieldTitle={"Result"} />
        <DropDownField
          placeholder={
            survey_part_a_data[1].section[0].questions[4].answers[0].placeholder
          }
          data={
            survey_part_a_data[1].section[0].questions[4].answers[0].options
          }
          isVisible={isResult}
          dropDownTitle={
            survey_part_a_data[1].section[0].questions[4].answers[0].placeholder
          }
          // dropDownPress={() => {
          //   SetResult(!isResult);
          // }}
          selectedValue={
            survey_part_a_data[1].section[0].questions[4].answers[0]
              .answer_value
          }
          // closeModal={() => {
          //   SetResult(!isResult);
          // }}
          onGetValue={(val) => {
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[4].answers[0].answer_value = val;
            dispatch(recorrection_survey_a_data(part_a));
            SetResult(!isResult);
          }}
        />
        <FieldTitle fieldTitle={"Date Next Visit"} />
        <DatePickerField
          // mode={"time"}
          showpicker={isDatePicker}
          // OnDatePicker={
          //   () => SetDatePicker(true)
          //   // ShowTimePicker(index, question_index, ans_index)
          // }
          // onCancel={() => SetDatePicker(false)}
          placeholder={
            survey_part_a_data[1].section[0].questions[5].answers[0].placeholder
          }
          onChangeDateChange={(res) => {
            SetDatePicker(false);

            let date = moment(res).format("DD/MM/YYYY");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[5].answers[0].answer_value = date;
            dispatch(recorrection_survey_a_data(part_a));
          }}
          value={
            survey_part_a_data[1].section[0].questions[5].answers[0]
              .answer_value
          }
          selectedDate={
            survey_part_a_data[1].section[0].questions[5].answers[0]
              .answer_value
          }
        />
      </View>
      <View style={styles.buttonView_2}>
        <TouchableOpacity
          style={styles.proceed_button}
          onPress={onRecorrectionSubmit}
        >
          <Text style={styles.proceed_button_text}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecorrectionFormSubmitPage;
