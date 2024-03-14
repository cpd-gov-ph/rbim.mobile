import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Date picker modal
import { HelperText } from "react-native-paper"; // Date picker UI elements
import { date_text, note_text } from "../../strings"; // Strings
import Images from "../../constants/Images"; // Images
import Colors from "../../themes/colors"; // Themes
import styles from "./datepicker.styles"; // Date picker styles

const DatePickerField = (props) => {
  return (
    <SafeAreaView
      style={
        props.recorrection ? props.recorrection_container : props.container
      }
    >
      <View style={props.fieldView}>
        <TouchableOpacity
          onPress={props.OnDatePicker}
          activeOpacity={0.1}
          disabled={props.disabled}
          style={[
            props.date_box,
            {
              borderColor:
                props.is_error || props.recorrection
                  ? Colors.errorColor
                  : Colors.light_white,
            },
            { opacity: props.disabled ? 0.5 : null },
          ]}
        >
          <View style={props.date_view_2} pointerEvents="none">
            <TextInput
              caretHidden
              showSoftInputOnFocus={false}
              spellCheck={false}
              autoCorrect={false}
              onFocus={props.onFocus}
              onChangeText={props.onchangeText}
              selectTextOnFocus={false}
              ref={props.date_picker_ref}
              placeholderTextColor={Colors.placeHolderColor}
              style={[props.date_text]}
              value={props.selectedDate}
              placeholder={props.placeholder}
            />
          </View>
          <View style={props.date_view_icon}>
            <Image source={Images.date_icon} style={props.date_icon}></Image>
          </View>
        </TouchableOpacity>
        <HelperText
          style={props.errorStyle}
          type="error"
          visible={props.is_error}
        >
          {props.error_message}
        </HelperText>
      </View>

      {props.recorrection && (
        <View style={props.note_view}>
          <Text style={props.noteTitleStyle}>{props.noteTitle}</Text>
          <Text style={props.noteTextStyle} numberOfLines={200}>
            {props.noteText}
          </Text>
        </View>
      )}

      <DateTimePickerModal
        isVisible={props.showpicker}
        mode={props.mode}
        maximumDate={props.datetype === "age_picker" ? new Date() : null}
        minimumDate={props.datetype === "datepicker" ? new Date() : null}
        onConfirm={props.onChangeDateChange}
        onCancel={props.onCancel}
      />
    </SafeAreaView>
  );
};

DatePickerField.defaultProps = {
  titile: "Date Encoded",
  field_title: styles().field_title,
  date_view: styles().date_view,
  date_box: styles().date_box,
  date_place_holder: styles().date_place_holder,
  date_text: styles().date_text,
  placeholder: date_text.placeholder,
  selectedDate: "",
  date_view_2: styles().date_view_2,
  date_view_icon: styles().date_view_icon,
  date_icon: styles().date_icon,
  is_error: false, // 0 - No errror 1 - Empty Data
  error_message: date_text.date_error,
  errorStyle: styles().error_text,
  star_text: styles().star_text,
  date: "DD/MM/YYYY",
  showpicker: false,
  container: styles().container,
  recorrection_container: styles().recorrection_container,
  recorrection: false, // 0 - No recorrection 1 - Recorrection
  noteText: "",
  noteTitle: note_text.note_title,
  noteTitleStyle: styles().noteTitle,
  noteTextStyle: styles().noteText,
  note_view: styles().note_view,
  disabled: false,
  fieldView: styles().fieldView,
  mode: "date",
  datetype: "datepicker",
};
export default DatePickerField;

/*   -------------------- DEFAULT PROPS PURPOSE -------------------  */

/*   title - Question for each field */
/*   field_title - styles for field_title, */
/*   date_view - styles for date picker view */
/*   date_box - styles for date picker field box */
/*   date_place_holder - styles for date picker placeholder, */
/*   date_text - styles for selected date, */
/*   placeholder_date - date picker placeholder, */
/*   selectedDate - selected date from datepicker */
/*   date_view_2 - styles for date display view inside box*/
/*   date_view_icon - styles for calender icon */
/*   is_error -  error status for datepicker field - false for No error, true for Empty Data or invalid data */
/*   error_message - for datepicker field - error message when error status true, */
/*   errorStyle - styles for error_text, */
/*   star_text - styles for star_text, */
/*   date - date format to display (DD/MM/YYYY) */
/*   showpicker - datepicker visibility, true - showpicker false - not show */
/*   container - styles for container, */
/*   recorrection_container - styles for recorrection_container, */
/*   recorrection: false for No recorrection, true for recorrection */
/*   noteText - notes to be displayed when recorrection is true, */
/*   noteTitle - notes title when recorrection is true, */
/*   noteTitleStyle - styles for noteTitle, */
/*   noteTextStyle - styles for noteText, */
/*   note_view - styles for note_view, */
/*   disabled - to disable the datepicker field, true for disabled false for not, */
/*   field_view - styles for field view with box and helper text, */
