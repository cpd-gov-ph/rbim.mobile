import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography

let { width } = Dimensions.get("window");

const button_width = (width - 4.4 * 10) / 2;

const styles = () =>
  ScaledSheet.create({
    //--------------------- HEADER --------------------
    headerContainer: {
      backgroundColor: Colors.form_header_color_light,
      flexDirection: "row",
      paddingHorizontal: "12@msr",
      paddingVertical: "15@msr",
      alignItems: "center",
    },
    survey_num_view: {
      flex: 0.6,
      alignItems: "flex-start",
    },
    survey_num_text: {
      ...dimens.title,
      color: Colors.text_color_dark,
    },
    notes_btn_view: {
      flex: 0.4,
      alignItems: "flex-end",
    },
    notes_btn: {
      backgroundColor: Colors.form_header_color,
      borderColor: Colors.button_color,
      borderWidth: "1@msr",
      height: "40@vs",
      width: width * 0.32,
      borderRadius: "4@msr",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    notes_btn_text: {
      ...dimens.sub_heading,
      color: Colors.button_color,
      marginHorizontal: "4@msr",
    },
    notes_icon: {
      height: "16@vs",
      width: "16@s",
      marginHorizontal: "4@msr",
    },
    view_notes: {
      ...dimens.list_title,
      color: Colors.textGreyColor,
    },
    view_notes_text: {
      ...dimens.date_text,
      color: Colors.textGreyColor,
    },
    //--------------------- FOOTER --------------------
    footerContainer: {
      justifyContent: "flex-end",
      backgroundColor: Colors.light_grey_background,
    },
    buttonView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "12@msr",
      marginVertical: "30@msr",
    },
    previous_button: {
      height: "40@vs",
      width: button_width,
      backgroundColor: Colors.light_grey_background,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4@msr",
      borderColor: Colors.previous_button_color,
      borderWidth: "1@msr",
      flexDirection: "row",
    },
    previous_button_text: {
      color: Colors.previous_button_color,
      ...dimens.Block_body,
      marginHorizontal: "4@msr",
    },
    next_button: {
      height: "40@vs",
      width: button_width,
      backgroundColor: Colors.button_color,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4@msr",
      flexDirection: "row",
    },
    next_button_text: {
      color: Colors.white,
      ...dimens.button,
      marginHorizontal: "4@msr",
    },
    next_icon: {
      marginHorizontal: "4@msr",
    },
    survey_num_parent_view: {
      flexDirection: "row",
      alignItems: "center",
    },
    pause_icon: {
      height: "24@vs",
      width: "24@s",
      marginHorizontal: "10@msr",
    },
  });

export default styles;
