import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },
    myProfileTitle: {
      ...dimens.title,
      color: Colors.textGreyColor,
      marginVertical: "13@msr",
      marginHorizontal: "17@s",
    },
    detailsView: {
      backgroundColor: Colors.primaryColor,
      paddingTop: "5@msr",
      paddingBottom: "20@msr",
      paddingHorizontal: "17@s",
      marginBottom: "45@vs",
    },
    fieldBox: {
      backgroundColor: Colors.field_background,
      height: "45@vs",
      borderColor: Colors.border_color,
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      paddingHorizontal: "8@msr",
      justifyContent: "center",
    },
    fieldTitle: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginVertical: "4@msr",
    },
    fieldView: {
      marginTop: "12@vs",
    },
    fieldText: {
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
  });

export default styles;
