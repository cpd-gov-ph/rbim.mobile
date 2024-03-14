import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness

const styles = (is_error, recorrection) =>
  ScaledSheet.create({
    container: {
      backgroundColor: recorrection
        ? Colors.error_pink_background
        : Colors.primaryColor,
      marginBottom: recorrection ? "10@msr" : null,
      paddingVertical: recorrection ? "12@msr" : null,
      paddingBottom: recorrection ? "12@msr" : null,
    },
    textInputStyle: {
      backgroundColor: Colors.primaryColor,
      height: "45@vs",
      borderColor: is_error
        ? Colors.error_red
        : recorrection
        ? Colors.error_light_red
        : Colors.light_white,
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingHorizontal: "8@msr",
      color: Colors.black_color,
      marginHorizontal: "12@msr",
    },
    fieldTitle: {
      ...dimens.sub_heading,
      color: recorrection ? Colors.error_light_red : Colors.black_color,
      marginBottom: "6@msr",
      marginHorizontal: "12@msr",
    },
    star: {
      color: Colors.error_red,
    },

    //For is_error = 1
    errorText: {
      ...dimens.text_input_error,
      color: Colors.errorColor,
    },

    //For recorrection = 1
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
    fieldView: {
      height: dimen_size_height(9.5),
    },

    //-------------------- MULTI LINE TEXT INPUT FIELD ------------------

    textInputStyle_multi: {
      backgroundColor: Colors.primaryColor,
      minHeight: "78@vs",
      borderColor: is_error
        ? Colors.error_red
        : recorrection
        ? Colors.error_light_red
        : Colors.light_white,
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingHorizontal: "8@msr",
      color: Colors.black_color,
      marginHorizontal: "12@msr",
      lineHeight: "19@msr",
    },
  });

export default styles;
