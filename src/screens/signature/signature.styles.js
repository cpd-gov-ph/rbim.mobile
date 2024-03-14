import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

let { height, width } = Dimensions.get("window");

const button_width = (width - 5 * 10) / 2;

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
      paddingHorizontal: "12@msr",
    },
    container_2: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },
    titleView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "38@msr",
    },
    clear_button: {
      flexDirection: "row",
      marginHorizontal: "25@msr",
      alignItems: "center",
    },
    clear_button_text: {
      ...dimens.body,
      color: Colors.black_color,
      marginLeft: "5@msr",
    },
    title_text: {
      ...dimens.title,
      color: Colors.text_color_dark,
    },
    confirm_btn_view: {
      alignItems: "center",
      marginTop: "40@vs",
    },
    confirm_btn: {
      backgroundColor: Colors.button_color,
      borderRadius: "4@msr",
      justifyContent: "center",
      alignItems: "center",
      height: "40@vs",
      width: button_width,
      paddingHorizontal: "10@msr",
    },
    confirm_btn_text: {
      color: Colors.white,
      ...dimens.button,
    },
    sign_view: {
      height: height * 0.28,
      width: width - 24,
      marginTop: "20@vs",
      borderRadius: "25@msr",
    },
    verify_sign_view: {
      borderWidth: 0.5,
      borderRadius: dimen_size_height(1),
      borderColor: Colors.lightGray,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      height: height * 0.28,
      width: width - 24,
      marginTop: "5@vs",
    },
    white_view: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingVertical: "17@msr",
      paddingHorizontal: "12@msr",
    },
    white_view_container: {
      flexGrow: 1,
      backgroundColor: Colors.white,
      paddingVertical: "10@msr",
      paddingHorizontal: "12@msr",
    },
    privacy_rights_title: {
      textAlign: "center",
      color: Colors.button_color,
      ...dimens.list_title,
    },
    privacy_rights_text: {
      ...dimens.smallText,
      lineHeight: "21@msr",
      color: Colors.black_color,
      marginVertical: "12@msr",
    },
    enter_sign_box: {
      marginVertical: "10@msr",
      borderColor: Colors.button_color,
      borderWidth: "1@msr",
      borderStyle: "dashed",
      height: "65@vs",
      alignItems: "center",
      justifyContent: "center",
    },
    signature_image: {
      height: dimen_size_height(27),
      width: dimen_size_height(46),
    },
    change_sign_view: {
      paddingTop: "8@vs",
      justifyContent: "center",
    },
    change_signature_title: {
      textAlign: "center",
      color: Colors.button_color,
      ...dimens.intro_title_body,
      fontWeight: "900",
    },
    recorrecttion_change_signature_title: {
      textAlign: "center",
      color: Colors.button_color,
      ...dimens.placeHolder,
      fontWeight: "900",
    },
    enter_sign: {
      ...dimens.bold_small_text,
      color: Colors.button_color,
    },
    last_line_view: {
      justifyContent: "flex-end",
      paddingTop: "5@vs",
      alignItems: "center",
    },
    last_line_text: {
      ...dimens.sub_heading,
      color: Colors.text_color_dark,
    },
    noteTitle: {
      ...dimens.button,
      color: Colors.black_color,
      marginHorizontal: "12@msr",
    },
    noteText: {
      ...dimens.smallText,
      color: Colors.black_color,
      marginTop: "2@msr",
      marginHorizontal: "12@msr",
    },
  });

export default styles;
