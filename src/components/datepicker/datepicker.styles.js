import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

const styles = () =>
  ScaledSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    recorrection_container: {
      backgroundColor: Colors.recorrection_color,
      paddingBottom: "12@msr",
      marginBottom: "10@msr",
    },
    fieldView: {
      height: dimen_size_height(9.5),
    },
    field_title: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginBottom: "6@msr",
      marginHorizontal: "12@msr",
    },
    star_text: {
      ...dimens.sub_heading,
      color: Colors.errorColor,
      marginBottom: "6@msr",
    },
    date_view: {
      marginHorizontal: "12@msr",
    },
    date_box: {
      height: "45@vs",
      borderRadius: "5@s",
      borderWidth: "0.8@s",
      borderColor: Colors.light_white,
      flexDirection: "row",
      backgroundColor: Colors.white,
      marginHorizontal: "12@msr",
    },
    date_place_holder: {
      ...dimens.body,
      color: Colors.placeHolderColor,
    },
    date_text: {
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
    date_view_2: { flex: 0.8, justifyContent: "center", marginLeft: "10@s" },
    date_view_icon: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "flex-end",
      marginRight: "10@s",
    },
    date_icon: {
      height: "22@msr",
      width: "22@msr",
    },
    error_text: {
      ...dimens.text_input_error,
      color: Colors.errorColor,
      marginHorizontal: "0@msr",
    },
    noteTitle: {
      ...dimens.button,
      color: Colors.black_color,
    },
    noteText: {
      ...dimens.smallText,
      color: Colors.black_color,
      marginTop: "2@msr",
    },
    note_view: {
      marginHorizontal: "12@msr",
    },
  });

export default styles;
