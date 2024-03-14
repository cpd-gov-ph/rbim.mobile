import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 
const { width } = Dimensions.get("window");
const box_width = (width - 6.4 * 10) / 6;

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },
    title: {
      ...dimens.modal_title,
      color: Colors.textGreyColor,
      marginTop: "13@msr",
      marginBottom: "18@msr",
      marginHorizontal: "12@msr",
    },
    whiteView: {
      backgroundColor: Colors.white,
      paddingVertical: "17@msr",
    },
    survey_num_box: {
      width: box_width,
      height: "45@vs",
      borderWidth: "1@msr",
      backgroundColor: Colors.white,
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      lineHeight: "18@msr",
      color: Colors.black_color,
      justifyContent: "center",
    },
    notesView:{
      backgroundColor: Colors.error_pink_background,
      marginHorizontal:"12@msr",
      paddingBottom:"8@msr",
    },
    noteTitle:{
      ...dimens.button,
      color:Colors.black_color,
      marginHorizontal: "12@msr",
   },
   noteText:{
      ...dimens.smallText,
      color:Colors.black_color,
      marginTop: "2@msr",
      marginHorizontal: "12@msr",
   },
    otpView: {
      height: dimen_size_height(8.2),
      marginHorizontal: "12@msr",
    },
    field_title: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginHorizontal: "12@msr",
    },
    star_text: {
      ...dimens.sub_heading,
      color: Colors.errorColor,
    },
    otp_field_view: {
      height: dimen_size_height(15),
    },
    error_text: {
      ...dimens.text_input_error,
      color: Colors.errorColor,
    },

    //Radio Button
    radio_btn_parent_view: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "12@msr",
    },
    radio_btn_field_view: {
      flexDirection: "row",
      alignItems: "center",
    },
    radio_text: {
      ...dimens.sub_heading,
      marginLeft: "6@msr",
      color: Colors.black_color,
    },
    privacy_rights_box: {
      marginHorizontal: "12@msr",
      borderWidth: "1@msr",
      borderColor: Colors.light_white,
      borderRadius: "4@msr",
      paddingHorizontal: "8@msr",
      paddingVertical: "16@msr",
      backgroundColor: Colors.field_background,
      marginVertical: "20@vs",
    },
    privacy_rights_text: {
      ...dimens.body,
      color: Colors.black_color,
    },
    button_view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      paddingVertical: "25@vs",
    },
    next_button: {
      backgroundColor: Colors.button_color,
      height: "40@vs",
      width: width * 0.32,
      borderRadius: "4@msr",
      justifyContent: "center",
      alignItems: "center",
    },
    next_button_text: {
      ...dimens.sub_heading,
      color: Colors.white,
    },
    loader:{ 
      flex: 1, 
      justifyContent: "center",
     },
  });

  export default styles;
