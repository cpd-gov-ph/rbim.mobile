import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import moment from "moment"; // For formatting date and time
import PushNotification from "react-native-push-notification"; // For Push notification
import NetInfo from "@react-native-community/netinfo"; // To get information about the net connection
import {
  DatePickerField,
  DropDownField,
  FieldTitle,
  Footer,
  Header,
} from "../../components"; // Custom components
import Styles from "./survey.styles"; // Survey styles
import { survey_a_data } from "../../store/actions/surveyActions"; // Survey styles
import Loader from "../../utils/Loader"; // Custom loader 
import {
  removeAsyncItemValue,
  snackBar,
  isResponseIsValid,
} from "../../utils/helpers"; // Helper functions
import {
  getOngoingSurveyDetails,
  getOnSyncSurveyDetails,
  setOngoingSurveyDetails,
  setOnSyncSurveyDetails,
  setSurveyDetails,
} from "../../utils/localStorage"; // Local storage data
import { navigation_screens, storage_key } from "../../strings"; // Strings
import { onSyncSurveyAPICall } from "../../network/SyncAPI"; // API call

const FormSubmitPage = ({ navigation }) => {
  const styles = Styles();
  const dispatch = useDispatch();
  const [OnGoingLoading, SetonGoingLoading] = useState(false);

  const survey_submit_type = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_submit_type
  );
  const survey_initialData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const survey_signature_data = useSelector(
    (state) => state?.surveyReducer?.survey_signature
  );
  const survey_notes = useSelector(
    (state) => state?.surveyReducer?.survey_notes
  );
  const survey_part_a_data = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_part_a
  );
  const members_list = useSelector((state) => state?.surveyReducer?.members);
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.household_info.householdlist
  );
  const household_members = useSelector(
    (state) => state?.surveyReducer?.household_info.household_members
  );
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.survey_part_c
  );
  const survey_submit_loader = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_submit_loading
  );
  const userId = useSelector((state) => state?.surveyReducer?.userId);

  const [isResult, SetResult] = useState(false);
  const [isTimePicker, SetTimePicker] = useState(false);
  const [isDatePicker, SetDatePicker] = useState(false);

  const onClickPrevious = () => {
    navigation.goBack();
  };
  const showNotification = (message) => {
    PushNotification.localNotification({
      title: "RBIM",
      message: message,
      channelId: "rbim-id",
    });
  };
  const onFinalSubmit = async () => {
    let part_a = [...survey_part_a_data];

    let time_end = part_a[1].section[0].questions[3].answers[0].answer_value;
    let date_next_visit =
      part_a[1].section[0].questions[5].answers[0].answer_value;
    let result = part_a[1].section[0].questions[4].answers[0].answer_value;

    if (time_end === null) {
      snackBar(part_a[1].section[0].questions[3].answers[0].error_message);
    } else if (result === null) {
      snackBar(part_a[1].section[0].questions[4].answers[0].error_message);
    } else if (date_next_visit === null) {
      snackBar(part_a[1].section[0].questions[5].answers[0].error_message);
    } else {
      NetInfo.fetch().then(async (state) => {
        let survey_num =
          survey_initialData.section[0].questions[0].answers[0].answer_value;
        SetonGoingLoading(true);

        if (state.isConnected) {
          let _overall_input = {
            survey_number: survey_num,
            status: "survey_assigned",
            survey_assigned_on: new Date(),
            household_member_count: household_members,
            data_collector_signature: survey_signature_data,
            notes: survey_notes,
            next_section: "",
            members: members_list,
            initial_section: survey_initialData,
            interview_section: survey_part_a_data,
            house_hold_member_section: householdlist,
            final_section: survey_part_c_data,
          };
          let res = await onSyncSurveyAPICall(_overall_input);
          if (isResponseIsValid(res)) {
            SetonGoingLoading(false);
            getOngoingSurveyDetails(storage_key.survey_ongoing + userId)
              .then((res) => {
                if (res !== null) {
                  removeAsyncItemValue(`${survey_num}`);
                  let arr = JSON.parse(res);
                  let filter = arr.filter((item) => item !== `${survey_num}`);
                  let js = JSON.stringify(filter);
                  setOngoingSurveyDetails(
                    storage_key.survey_ongoing + userId,
                    js
                  );
                } else {
                  let js = JSON.stringify([`${survey_num}`]);
                  setOngoingSurveyDetails(
                    storage_key.survey_ongoing + userId,
                    js
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
            SetonGoingLoading(false);
            navigation.navigate(navigation_screens.MainScreens);
          } else {
            SetonGoingLoading(false);
            setTimeout(() => {
              showNotification(res?.data);
            }, 500);
          }
        } else {
          let _overall_input = {
            survey_number: survey_num,
            status: "survey_assigned",
            survey_assigned_on: new Date(),
            household_member_count: household_members,
            data_collector_signature: survey_signature_data,
            notes: survey_notes,
            next_section: "",
            members: members_list,
            initial_section: survey_initialData,
            interview_section: survey_part_a_data,
            house_hold_member_section: householdlist,
            final_section: survey_part_c_data,
          };
          let entry_dummy_request = {
            mb_local: _overall_input,
          };
          let js1 = JSON.stringify(entry_dummy_request);
          setSurveyDetails(survey_num, js1);
          getOnSyncSurveyDetails(storage_key.survey_unSync + userId)
            .then((res) => {
              SetonGoingLoading(false);
              if (res !== null) {
                let arr = JSON.parse(res);
                let js = JSON.stringify([`${survey_num}`, ...arr]);
                setOnSyncSurveyDetails(storage_key.survey_unSync + userId, js);
                navigation.navigate(navigation_screens.MainScreens);
              } else {
                let js = JSON.stringify([`${survey_num}`]);
                setOnSyncSurveyDetails(storage_key.survey_unSync + userId, js);
                navigation.navigate(navigation_screens.MainScreens);
              }
            })
            .catch((err) => {
              console.log(err);
              SetonGoingLoading(false);
            });
          getOngoingSurveyDetails(storage_key.survey_ongoing + userId)
            .then((res) => {
              if (res !== null) {
                let arr = JSON.parse(res);
                let filter = arr.filter((item) => item !== `${survey_num}`);
                let js = JSON.stringify(filter);
                setOngoingSurveyDetails(
                  storage_key.survey_ongoing + userId,
                  js
                );
              } else {
                let js = JSON.stringify([`${survey_num}`]);
                setOngoingSurveyDetails(
                  storage_key.survey_ongoing + userId,
                  js
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header submit_screen={true} onNotesPress={() => {}} />
      <Loader loading={OnGoingLoading} />
      <Loader loading={survey_submit_loader} />
      <View style={styles.submit_screen_field_view}>
        <FieldTitle fieldTitle={"Time End"} />
        <DatePickerField
          mode={"time"}
          showpicker={isTimePicker}
          OnDatePicker={() => SetTimePicker(true)}
          onCancel={() => SetTimePicker(false)}
          placeholder={
            survey_part_a_data[1].section[0].questions[3].answers[0].placeholder
          }
          onChangeDateChange={(res) => {
            let time = moment(res).format("LT");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[3].answers[0].answer_value = time;
            dispatch(survey_a_data(part_a));
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
          error_message={null}
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
          dropDownPress={() => {
            SetResult(!isResult);
          }}
          selectedValue={
            survey_part_a_data[1].section[0].questions[4].answers[0]
              .answer_value
          }
          closeModal={() => {
            SetResult(!isResult);
          }}
          onGetValue={(val) => {
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[4].answers[0].answer_value = val;
            dispatch(survey_a_data(part_a));
            SetResult(!isResult);
          }}
          error_message={null}
        />
        <FieldTitle fieldTitle={"Date Next Visit"} />
        <DatePickerField
          showpicker={isDatePicker}
          OnDatePicker={() => SetDatePicker(true)}
          onCancel={() => SetDatePicker(false)}
          placeholder={
            survey_part_a_data[1].section[0].questions[5].answers[0].placeholder
          }
          onChangeDateChange={(res) => {
            let date = moment(res).format("DD/MM/YYYY");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[5].answers[0].answer_value = date;
            dispatch(survey_a_data(part_a));
            SetDatePicker(false);
          }}
          value={
            survey_part_a_data[1].section[0].questions[5].answers[0]
              .answer_value
          }
          selectedDate={
            survey_part_a_data[1].section[0].questions[5].answers[0]
              .answer_value
          }
          error_message={null}
        />
      </View>
      <Footer
        onPressPreviousButton={onClickPrevious}
        onPressNextButton={onFinalSubmit}
        next_disabled={false}
        proceedText={"Submit"}
      />
    </SafeAreaView>
  );
};

export default FormSubmitPage;
