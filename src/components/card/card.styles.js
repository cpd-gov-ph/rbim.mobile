import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography

const styles = () =>
  ScaledSheet.create({
    //Survey card
    surveyCard: {
      backgroundColor: Colors.primaryColor,
      height: "60@vs",
      borderColor: Colors.border_dark_grey,
      borderWidth: "1@msr",
      borderRadius: "5@msr",
      paddingHorizontal: "8@msr",
      alignItems: "center",
      flexDirection: "row",
    },
    surveyCard_2: {
      backgroundColor: Colors.primaryColor,
      height: "60@vs",
      borderColor: Colors.border_dark_grey,
      borderWidth: "1@msr",
      borderRadius: "5@msr",
      paddingHorizontal: "8@msr",
      justifyContent: "center",
    },
    textView: {
      flex: 0.8,
    },
    iconView: {
      flex: 0.2,
      alignItems: "flex-end",
      paddingHorizontal: "8@msr",
    },
    surveyText: {
      ...dimens.title,
      color: Colors.black_color,
    },
    arrowIcon: {
      height: "25@vs",
      width: "25@s",
    },
  });

export default styles;
