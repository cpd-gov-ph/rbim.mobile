import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
let { width } = Dimensions.get("window");
export const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      color: Colors.lightgray,
    },
    head_container: {
      borderBottomWidth: "1@msr",
      borderBottomColor: Colors.borderWidthColor,
      backgroundColor: Colors.primaryColor,
    },
    heading: {
      paddingVertical: "15@msr",
      paddingHorizontal: "25@msr",
    },
    heading_Txt: {
      ...dimens.sub_heading,
      color: Colors.darkGray,
    },
    heading_Sub_Txt: {
      ...dimens.description,
      color: Colors.lightGray,
      paddingVertical: "3@msr",
    },

    // Checkbox
    checkBox_MainView: {
      paddingVertical: "20@msr",
      backgroundColor: Colors.primaryColor,
      borderTopColor: Colors.borderWidthColor,
      borderTopWidth: "1@msr",
    },
    checkBoxView: {
      alignContent: "center",
      paddingHorizontal: "30@msr",
      backgroundColor: Colors.primaryColor,
    },
    checkBoxStyle: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: "3@msr",
    },
    checkbox_txt: {
      fontSize: "12@msr",
      color: Colors.black_color,
      paddingHorizontal: "5@msr",
    },
    // btn
    button: {
      marginVertical: "20@msr",
      height: "45@vs",
      width: width - 35,
      borderRadius: "4@msr",
      backgroundColor: Colors.button_color,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: "20@msr",
    },
    btn_Txt: {
      ...dimens.button,
      fontSize: "13@msr",
      color: Colors.primaryColor,
    },
  });
