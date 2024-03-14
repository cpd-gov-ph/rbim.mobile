import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { HelperText } from "react-native-paper"; // Multiselect Dropdown UI elements
import Modal from "react-native-modal"; // Modal component for dropdown
import { date_text, dropDown_text, note_text } from "../../strings"; // Strings
import Vector from "../../constants/Vector"; // Icons
import Colors from "../../themes/colors"; // Themes
import styles from "./dropDown.styles"; // Multiselect Dropdown styles
import Line from "../line/Line"; // Custom Line component

const MultiSelectDropDownField = (props) => {
  const [data, setData] = useState(
    props.options_data.map((it) => {
      return {
        option: it,
        is_checked: false,
      };
    })
  );

  //Drop Down list view
  const dropDownListView = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onDropDownSelect(item, index)}
        style={props.list_item_view}
      >
        <View>{item.is_checked ? Vector.CheckedBox : Vector.UnCheckedBox}</View>
        <Text style={props.flatListItemText_2} numberOfLines={1}>
          {item.option}
        </Text>
      </TouchableOpacity>
    );
  };

  //Drop down Item on press
  const onDropDownSelect = (item, index) => {
    let ch = data.map((it, ind) => {
      let temp = Object.assign({}, it);
      if (ind === index) {
        temp.is_checked = !temp.is_checked;
        return temp;
      } else {
        return temp;
      }
    });
    let dh = ch.map((x) => {
      if (ch[ch.length - 1].is_checked == true) {
        if (x.option !== "Others") {
          x.is_checked = false;
          return x;
        } else {
          x.is_checked = true;
          return x;
        }
      } else {
        return x;
      }
    });
    setData(dh);
    console.log(dh, "DH");
  };

  //On Select Press
  const selectAction = () => {
    let val = data
      .filter((it) => it.is_checked == true)
      .map((item) => {
        return item.option;
      });
    props.getSelectedData(val);
    props.closeModal();
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
      <View>
        <TouchableOpacity
          onPress={props.dropDownPress}
          disabled={props.disabled}
          activeOpacity={1}
          style={[
            props.selectedData === null || props.selectedData.length === 0
              ? props.dropDown_box
              : props.dropDown_box_2,
            {
              borderColor:
                props.is_error || props.recorrection
                  ? Colors.errorColor
                  : Colors.light_white,
            },
            { opacity: props.disabled ? 0.5 : null },
          ]}
        >
          <View style={props.dropDown_view_2} pointerEvents="none">
            {props.selectedData === null ? (
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
                placeholder={props.placeholder}
              />
            ) : props.selectedData.length === 0 ? (
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
                placeholder={props.placeholder}
              />
            ) : !props.selectedData.includes("Others") ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {props.selectedData.map((item) => (
                  <View style={props.selected_option_box}>
                    <Text style={props.selected_option} numberOfLines={1}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={props.dropDown_text}>
                {props.selectedData.map((it) => it)}
              </Text>
            )}
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
          <View style={props.flatList_container}>
            <View style={props.modalTitleView_2}>
              <Text style={props.modalTitle}>{props.dropDownTitle}</Text>
            </View>

            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={dropDownListView}
              keyExtractor={(item, index) => index.toString()}
            />
            {/* Button View */}
            <View style={props.buttonView}>
              <TouchableOpacity
                style={props.cancel_button}
                onPress={props.closeModal}
              >
                <Text style={props.cancel_button_text_2}>
                  {dropDown_text.cancel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.select_button}
                onPress={selectAction}
              >
                <Text style={props.select_button_text}>
                  {dropDown_text.select}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

MultiSelectDropDownField.defaultProps = {
  title: "40. What are the reason’s why ____ transferred in this barangay?",
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
  options_data: [],
  selectedData: [],
  flatListItemText_2: styles().flatListItemText_2,
  dropDownModalStyle: styles().dropDownModalStyle,
  isVisible: false,
  modalContainer: styles().modalContainer,
  modalTitleView_2: styles().modalTitleView_2,
  modalTitle: styles().modalTitle,
  dropDownTitle: "",
  list_item_view: styles().list_item_view,
  buttonView: styles().buttonView,
  cancel_button_text_2: styles().cancel_button_text_2,
  cancel_button: styles().cancel_button,
  select_button: styles().select_button,
  select_button_text: styles().select_button_text,
  selected_option_box: styles().selected_option_box,
  selected_option: styles().selected_option,
  dropDown_box_2: styles().dropDown_box_2,
  flatList_container: styles().flatList_container_2,

  //For others selected
  textInputStyle_others: styles().textInputStyle_others,
  text_input_placeholder: dropDown_text.text_input_placeholder,
  text_input_value: "",
  othersStatus: false,
  editable: true,
  multiline: true,
  maxLength: 300,
  keyboardType: "default",
};
export default MultiSelectDropDownField;

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
/*   flatListItemText_2 - styles for flatListItemText, */
/*   dropDownModalStyle - styles for dropDownModalStyle, */
/*   isVisible: visibility status for dropdown modal, true - visible, false - not visible, */
/*   modalContainer - styles for modalContainer, */
/*   modalTitleView_2 - styles for modalTitleView, */
/*   list_item_view - styles for dropdown option list view */
/*   buttonView - styles for cancel and select buttonView */
/*   modalTitle - styles for modalTitle, */
/*   dropDownTitle - title for dropdown data inside modal, */
/*   cancel_button_view - styles for cancel_button_view, */
/*   cancel_button_text_2 - styles for cancel_button_text, */
/*   cancel_button - styles for cancel_button, */
/*   select_button - styles for select_button, */
/*   select_button_text - styles for select_button_text, */
/*   selected_option_box - styles for selected_option_box, */
/*   selected_option - styles for selected_option to be displayed inside dropdown box */
/*   dropDown_box_2 - styles for dropDown field box, */

/*                   FOR OTHERS SELECTED                     */
/*   textInputStyle_others - styles for textInputStyle, */
/*   text_input_placeholder: text_input_placeholder, */
/*   text_input_value: value entered in the text input field, */
/*   othersStatus - visibility for text input field, when others option selected  false - not visible true - visible, */
/*   editable - editable status for text input field, */
/*   multiline - multiline status for text input, */
/*   maxLength - max length for text input field, */
/*   keyboardType - text input keyboard type, */
