import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { HelperText } from "react-native-paper"; // Dropdown UI elements
import Modal from "react-native-modal"; // Modal component for dropdown
import { date_text, dropDown_text, note_text } from "../../strings";
import Vector from "../../constants/Vector"; // Icons
import Colors from "../../themes/colors"; // Themes
import styles from "./dropDown.styles"; // Dropdown styles
import Line from "../line/Line"; // Custom Line component

const DropDownField = (props) => {
  //Drop Down list view
  const dropDownListView = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => onDropDownSelect(item, index)}>
        <Text style={props.flatListItemText} numberOfLines={1}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  //Drop down Item on press
  const onDropDownSelect = (item, index) => {
    props.data.map((it, ind) => {
      if (ind === index) {
        props.onGetValue(it);
        props.closeModal();
        return it;
      } else {
        return it;
      }
    });
  };

  //FlatList Item Separator Line
  const ItemSeparatorComponent = () => {
    return <Line />;
  };

  return (
    <SafeAreaView
      style={
        props.recorrection ? props.recorrection_container : props.container
      }
    >
      <View style={props.dropDown_view}>
        <TouchableOpacity
          onPress={props.dropDownPress}
          disabled={props.disabled}
          activeOpacity={1}
          style={[
            props.dropDown_box,
            {
              borderColor:
                !props.othersStatus && (props.is_error || props.recorrection)
                  ? Colors.errorColor
                  : Colors.light_white,
            },
            { opacity: props.disabled ? 0.5 : null },
          ]}
        >
          <View style={props.dropDown_view_2} pointerEvents="none">
            <TextInput
              caretHidden
              spellCheck={false}
              autoCorrect={false}
              onChangeText={props.onchangeText}
              showSoftInputOnFocus={false}
              onFocus={props.onFocus}
              ref={props.drop_down_ref}
              placeholderTextColor={Colors.placeHolderColor}
              style={[props.dropDown_text]}
              value={props.selectedValue}
              placeholder={props.placeholder}
            />
          </View>
          <View style={props.icon_view}>{Vector.DropDown_down}</View>
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
      <Modal
        backdropColor={Colors.modal_background_color}
        isVisible={props.isVisible}
        style={props.dropDownModalStyle}
        onBackButtonPress={props.closeModal}
        onBackdropPress={props.closeModal}
      >
        <View style={props.modalContainer}>
          <View style={props.modalTitleView}>
            <Text style={props.modalTitle}>{props.dropDownTitle}</Text>
          </View>
          <View style={props.flatList_container}>
            <FlatList
              data={props.data}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={dropDownListView}
              keyExtractor={(item, index) => index.toString()}
            />
            <Line />
          </View>

          <TouchableOpacity
            style={props.cancel_button_view}
            onPress={props.closeModal}
          >
            <Text style={props.cancel_button_text}>{dropDown_text.cancel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

DropDownField.defaultProps = {
  title: "8. What is ___’s current marital status ?",
  field_title: styles().field_title,
  dropDown_view: styles().dropDown_view,
  dropDown_box: styles().dropDown_box,
  dropDown_place_holder: styles().dropDown_place_holder,
  dropDown_text: styles().dropDown_text,
  placeholder: dropDown_text.placeholder,
  selectedValue: "",
  dropDown_view_2: styles().dropDown_view_2,
  icon_view: styles().icon_view,
  is_error: false, // 0 - No errror 1 - Empty Data
  error_message: date_text.date_error,
  errorStyle: styles().error_text,
  star_text: styles().star_text,
  container: styles().container,
  recorrection_container: styles().recorrection_container,
  recorrection: false, // 0 - No recorrection 1 - Recorrection
  noteText: "",
  noteTitle: note_text.note_title,
  noteTitleStyle: styles().noteTitle,
  noteTextStyle: styles().noteText,
  note_view: styles().note_view,
  disabled: false,

  //Modal
  sheetView: styles().sheetView,
  data: [],
  flatListItemText: styles().flatListItemText,
  dropDownModalStyle: styles().dropDownModalStyle,
  isVisible: false,
  modalContainer: styles().modalContainer,
  modalTitleView: styles().modalTitleView,
  modalTitle: styles().modalTitle,
  dropDownTitle: "",
  cancel_button_view: styles().cancel_button_view,
  cancel_button_text: styles().cancel_button_text,
  flatList_container: styles().flatList_container,

  //For Others selected
  textInputStyle: styles().textInputStyle,
  text_input_placeholder: dropDown_text.text_input_placeholder,
  text_input_value: "",
  othersStatus: false,
  editable: true,
  multiline: true,
  maxLength: 300,
  keyboardType: "default",
};
export default DropDownField;

/*   -------------------- DEFAULT PROPS PURPOSE -------------------  */

/*   title - Question for each field */
/*   field_title - styles for field_title, */
/*   dropDown_view - styles for dropDown_view, */
/*   dropDown_box - styles for dropDown_box, */
/*   dropDown_place_holder - styles for dropDown_place_holder, */
/*   dropDown_text - styles for dropDown_text, */
/*   placeholder: dropDown placeholder, */
/*   selectedValue: selected value from dropdown list, */
/*   dropDown_view_2 - styles for dropDown_view_2, */
/*   icon_view - styles for icon_view, */
/*   is_error - false for No error, true for Empty Data or invalid data */
/*   error_message - error message when error status true, */
/*   errorStyle - styles for error_text, */
/*   star_text - styles for star_text, */
/*   container - styles for container, */
/*   recorrection_container - styles for recorrection_container, */
/*   recorrection: false for No recorrection, true for recorrection */
/*   noteText - notes to be displayed when recorrection is true, */
/*   noteTitle: notes title when recorrection is true, */
/*   noteTitleStyle - styles for noteTitle, */
/*   noteTextStyle - styles for noteText, */
/*   note_view - styles for note_view, */
/*   disabled - to disable the field, true for disabled false for not, */

/*                   MODAL                     */
/*   sheetView - styles for dropdown modal container, */
/*   data: Array list for dropdown data, */
/*   flatListItemText - styles for flatListItemText, */
/*   dropDownModalStyle - styles for dropDownModalStyle, */
/*   isVisible: visibility status for dropdown modal, true - visible, false - not visible, */
/*   modalContainer - styles for modalContainer, */
/*   modalTitleView - styles for modalTitleView, */
/*   modalTitle - styles for modalTitle, */
/*   dropDownTitle - title for dropdown data inside modal, */
/*   cancel_button_view - styles for cancel_button_view, */
/*   cancel_button_text - styles for cancel_button_text, */

/*                   FOR OTHERS SELECTED                     */
/*   textInputStyle - styles for textInput, */
/*   text_input_placeholder - text_input_placeholder */
/*   text_input_value: value entered in the text input field, */
/*   othersStatus - visibility for text input field, when others option selected  false - not visible true - visible, */
/*   editable - editable status for text input field, */
/*   multiline - multiline status for text input, */
/*   maxLength - max length for text input field, */
/*   keyboardType - text input keyboard type, */
