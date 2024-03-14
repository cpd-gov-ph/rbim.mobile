import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import moment from "moment"; // For formatting date and time
import Modal from "react-native-modal"; // UI elements
import { DatePickerField, DropDownField, FieldTitle } from "../../components"; // Custom components
import Styles from "./survey.styles"; // Survey styles
import Vector from "../../constants/Vector"; // Icons
import Colors from "../../themes/colors"; // Themes
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

const PauseSurvey = (props) => {
  const styles = Styles();
  const [showModal, setShowModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const time_end = props.time_data;
  const date_data = props.date_data;
  const result_data = props.result_data;
  const [dropDownValue, setDropDownValue] = useState(
    result_data === null ? "" : result_data
  );
  const [date, setDate] = useState(date_data === null ? "" : date_data);
  const [time, setTime] = useState(time_end === null ? "" : time_end);

  const options = ["Pending", "Callback"];

  const Header = () => {
    return (
      <View style={styles.pause_survey_header}>
        <Text style={styles.pause_survey_text}>{"Pause survey"}</Text>
        <TouchableOpacity onPress={() => onCancel()}>
          {Vector.Cancel}
        </TouchableOpacity>
      </View>
    );
  };
  const onCancel = () => {
    props.OnCancel();
  };
  const onProcced = () => {
    props.onProcced();
  };
  //On date change
  const onDateChange = (date) => {
    props.onDateChange(date);
    setDateModal(false);
    setDate(moment(date).format("DD/MM/YYYY"));
  };

  const onResultChange = (data) => {
    setDropDownValue(data);
    props.onResultChange(data);
  };

  //On time change
  const onTimeChange = (time) => {
    props.onTimeChange(time);
    setTimeModal(false);
    setTime(moment(time).format("LT"));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        backdropColor={Colors.modal_background_color}
        isVisible={props.isVisible}
        style={{ height: dimen_size_height(10) }}
        onBackButtonPress={props.closeModal}
        onBackdropPress={props.closeModal}
      >
        <View
          style={{
            height: dimen_size_height(65),
            backgroundColor: Colors.white,
          }}
        >
          <Header />
          <View style={styles.pause_survey_main_view}>
            <FieldTitle fieldTitle={"Time End"} />
            <DatePickerField
              mode={"time"}
              OnDatePicker={() => setTimeModal(true)}
              showpicker={timeModal}
              onChangeDateChange={onTimeChange}
              onCancel={() => setTimeModal(false)}
              selectedDate={time}
              is_error={props.TimeError}
              error_message={props.time_error_message}
            />
            <FieldTitle fieldTitle={"Result"} />
            <DropDownField
              isVisible={showModal}
              dropDownPress={() => setShowModal(true)}
              closeModal={() => setShowModal(false)}
              dropDownTitle={"Result"}
              data={options}
              selectedValue={dropDownValue}
              onGetValue={(val) => onResultChange(val)}
              is_error={props.ResultError}
              error_message={props.result_error_message}
            />
            <FieldTitle fieldTitle={"Date Next Visit"} />
            <DatePickerField
              OnDatePicker={() => setDateModal(true)}
              showpicker={dateModal}
              onChangeDateChange={onDateChange}
              onCancel={() => setDateModal(false)}
              selectedDate={date}
              is_error={props.DateError}
              error_message={props.date_error_message}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.cancel_button}
              onPress={() => onCancel()}
            >
              <Text style={styles.cancel_button_text}>{"Cancel"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.proceed_button}
              onPress={() => onProcced()}
            >
              <Text style={styles.proceed_button_text}>{"Proceed"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PauseSurvey;
