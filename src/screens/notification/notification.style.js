import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography

let { height } = Dimensions.get("window");

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
      paddingHorizontal: "17@s",
    },
    clearAllText: {
      ...dimens.title,
      color: Colors.button_color,
      marginVertical: "13@msr",
      textAlign: "right",
    },
    card: {
      backgroundColor: Colors.primaryColor,
      paddingVertical: "15@msr",
      paddingHorizontal: "11@msr",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: "8@msr",
      marginHorizontal: "1@msr",
      elevation: 2,
      borderRadius: "10@msr",
      marginBottom: "7@msr",
    },
    notificationText: {
      ...dimens.placeHolder,
      color: Colors.black_color,
      lineHeight: "20@msr",
    },
    flatList: {
      paddingBottom: "55@vs",
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    footerComponent: {
      marginVertical: "15@vs",
    },
    empty_component: {
      flex: 1,
      justifyContent: "center",
      height: height * 0.85,
      alignItems: "center",
    },
    list_empty_text: {
      ...dimens.modal_title,
      color: Colors.textGreyColor,
    },
  });

export default styles;
