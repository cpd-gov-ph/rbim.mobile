import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import Palette from "../../themes/palette"; // Themes & colors
let { width } = Dimensions.get("window");
export const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    logoStyle: {
      height: "170@vs",
      width: "170@s",
    },
    title: {
      color: Palette.black,
      paddingVertical: "15@msr",
      ...dimens.mainTitle,
    },
    subTitle: {
      color: Palette.black,
      textAlign: "center",
      ...dimens.sub_heading,
    },
    passwordView: {
      paddingVertical: "30@msr",
      paddingHorizontal: "40@msr",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      marginVertical: "40@msr",
      width: width - 40,
      borderRadius: "5@msr",
      height: "40@vs",
      alignSelf: "center",
      backgroundColor: Colors.buttonColor,
      justifyContent: "center",
      alignItems: "center",
    },
    btn_Txt: {
      ...dimens.sub_heading,
      color: Colors.white,
    },
  });
