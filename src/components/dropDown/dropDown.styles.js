import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

let { width, height } = Dimensions.get("window");

const button_width = (width - 5.5 * 10) / 2;

const styles = (props) =>
  ScaledSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    recorrection_container: {
      backgroundColor: Colors.recorrection_color,
      paddingBottom: "12@msr",
      marginBottom: "10@msr",
    },
    field_title: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginBottom: "6@msr",
      marginHorizontal: "12@msr",
    },
    star_text: {
      ...dimens.sub_heading,
      color: Colors.errorColor,
      marginBottom: "6@msr",
    },
    dropDown_view: {
      height: dimen_size_height(9.5),
    },

    dropDown_box: {
      height: "45@vs",
      borderRadius: "5@s",
      borderWidth: "0.8@s",
      borderColor: Colors.light_white,
      flexDirection: "row",
      backgroundColor: Colors.white,
      marginHorizontal: "12@msr",
      alignItems: "center",
    },
    dropDown_place_holder: {
      ...dimens.body,
      color: Colors.placeHolderColor,
    },
    dropDown_text: {
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
    dropDown_view_2: {
      flex: 0.9,
      justifyContent: "center",
      marginLeft: "10@s",
      paddingVertical: "5@msr",
    },
    icon_view: {
      flex: 0.1,
      alignItems: "flex-end",
      marginRight: "15@s",
      marginVertical: "12@msr",
    },
    error_text: {
      ...dimens.text_input_error,
      color: Colors.errorColor,
    },
    noteTitle: {
      ...dimens.button,
      color: Colors.black_color,
    },
    noteText: {
      ...dimens.smallText,
      color: Colors.black_color,
      marginTop: "2@msr",
    },
    note_view: {
      marginHorizontal: "12@msr",
    },

    //Bottom modal view
    sheetView: {
      paddingVertical: "15@msr",
    },
    flatListItemText: {
      marginVertical: "15@msr",
      marginHorizontal: "15@msr",
      ...dimens.placeHolder,
      color: Colors.black_color,
    },

    dropDownModalStyle: {
      flex: 1,
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContainer: {
      width: width,
      backgroundColor: "white",
      borderTopRightRadius: "6@msr",
      borderTopLeftRadius: "6@msr",
      alignSelf: "center",
    },
    modalTitleView: {
      marginHorizontal: "15@msr",
      paddingTop: "15@msr",
      paddingBottom: "5@msr",
      alignSelf: "center",
    },
    modalTitle: {
      ...dimens.modal_title,
      color: Colors.black_color,
    },
    cancel_button_view: {
      paddingVertical: "12@msr",
      alignItems: "center",
    },
    cancel_button_text: {
      color: Colors.error_light_red,
      ...dimens.title,
      marginHorizontal: "15@msr",
    },
    flatList_container: { maxHeight: height * 0.8 },

    //-------------------- Multi Select Drop Down --------------------
    list_item_view: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: "15@msr",
      justifyContent: "flex-start",
    },
    flatListItemText_2: {
      marginVertical: "15@msr",
      marginLeft: "8@msr",
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
    modalTitleView_2: {
      marginHorizontal: "15@msr",
      paddingTop: "17@msr",
      paddingBottom: "7@msr",
    },
    buttonView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "15@msr",
      marginVertical: "8@msr",
    },
    cancel_button: {
      height: "40@vs",
      width: button_width,
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4@msr",
      borderColor: Colors.button_color,
      borderWidth: "1@msr",
    },
    cancel_button_text_2: {
      color: Colors.button_color,
      ...dimens.Block_body,
      marginHorizontal: "15@msr",
    },
    select_button: {
      height: "40@vs",
      width: button_width,
      backgroundColor: Colors.button_color,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4@msr",
    },
    select_button_text: {
      color: Colors.white,
      ...dimens.Block_body,
      marginHorizontal: "15@msr",
    },
    selected_option_box: {
      backgroundColor: Colors.borderWidthColor,
      height: "25@vs",
      paddingHorizontal: "5@msr",
      marginRight: "12@msr",
      marginVertical: "3.5@msr",
      borderRadius: "5@msr",
      justifyContent: "center",
    },
    selected_option: {
      ...dimens.smallText,
      color: Colors.black_color,
    },
    dropDown_box_2: {
      minHeight: "45@vs",
      borderRadius: "5@s",
      borderWidth: "0.8@s",
      borderColor: Colors.light_white,
      flexDirection: "row",
      backgroundColor: Colors.white,
      marginHorizontal: "12@msr",
    },
    dropDown_view_others: {
      height: dimen_size_height(9.5),
    },
    textInputStyle: {
      backgroundColor: Colors.primaryColor,
      minHeight: "45@vs",
      paddingVertical: "6@msr",
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingHorizontal: "8@msr",
      color: Colors.black_color,
      marginHorizontal: "12@msr",
      lineHeight: "21@msr",
    },

    textInputStyle_others: {
      backgroundColor: Colors.primaryColor,
      minHeight: "45@vs",
      paddingVertical: "6@msr",
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingHorizontal: "8@msr",
      color: Colors.black_color,
      marginHorizontal: "12@msr",
      marginTop: "20@msr",
      lineHeight: "21@msr",
    },
    flatList_container_2: { maxHeight: height * 0.92 },

    //--------------------------- DROP DOWN AND TEXT INPUT FIELD ---------------------------
    dropDownTextField: {
      backgroundColor: Colors.primaryColor,
      height: "45@vs",
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingHorizontal: "8@msr",
      color: Colors.black_color,
      marginHorizontal: "12@msr",
    },

    //--------------------------- DROP DOWN TEXT INPUT FIELD AND DATE PICKER---------------------------

    date_box: {
      height: "45@vs",
      borderRadius: "5@s",
      borderWidth: "0.8@s",
      borderColor: Colors.light_white,
      flexDirection: "row",
      backgroundColor: Colors.white,
      marginHorizontal: "12@msr",
    },
    date_view_2: { flex: 0.8, justifyContent: "center", marginLeft: "10@s" },
    date_place_holder: {
      ...dimens.body,
      color: Colors.placeHolderColor,
    },
    date_text: {
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
    date_view_icon: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "flex-end",
      marginRight: "10@s",
    },
  });

export default styles;
