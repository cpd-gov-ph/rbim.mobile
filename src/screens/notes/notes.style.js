import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },

    textInputContainer: {
      backgroundColor: Colors.primaryColor,
      paddingVertical: "20@msr",
      paddingHorizontal: "17@s",
      ...dimens.placeHolder,
      color: Colors.black_color,
      lineHeight: "20@msr",
      marginVertical: "20@msr",
    },
  });

export default styles;
