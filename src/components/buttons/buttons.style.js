import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography 

let { width } = Dimensions.get("window");

const styles = () =>
  ScaledSheet.create({
    //Sign in button
    signInButtonStyle: {
      height: "45@vs",
      width: width - 35,
      borderRadius: "4@msr",
      backgroundColor: Colors.button_color,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: "20@msr",
    },
    buttonTextStyle: {
      ...dimens.button,
      fontSize: "14@msr",
      color: Colors.primaryColor,
    },
  });

export default styles;
