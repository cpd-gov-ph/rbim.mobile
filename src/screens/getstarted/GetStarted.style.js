import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers";
let { height, width } = Dimensions.get("window");
export const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      color: Colors.lightgray,
    },
    flagStyle: {
      alignSelf: "center",
      width: width,
      height: height * 0.28,
    },
    logoView: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "15@msr",
    },
    logoStyle: {
      marginTop:dimen_size_height(2.8),
      height: "155@vs",
      width: "155@s",
    },
    title: {
      paddingVertical: dimen_size_height(2),
      ...dimens.mainTitle,
      color: Colors.titleColor,
    },
    subTitle: {
      textAlign: "center",
      ...dimens.sub_heading,
      color: Colors.black_color,
    },
    button: {
      marginTop:dimen_size_height(4),
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
    bottom_view:{
      justifyContent:'flex-end',
      marginHorizontal: "15@msr",
    },
    bottom_text: {
      textAlign: "center",
      ...dimens.description,
      color: Colors.text_color_light,
      lineHeight:"18@msr",
      marginVertical: dimen_size_height(3.3),
    },
    version_text:{
      ...dimens.countText,
      color: Colors.text_color_darker,
      textAlign:'right',
      marginBottom: dimen_size_height(2),
      marginHorizontal:"10@msr",
    },
  });
