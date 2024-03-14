import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import DeviceInfo from "react-native-device-info"; // To get device information
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

const isTablet = DeviceInfo.isTablet();

const styles = (error) =>
  ScaledSheet.create({
    //----------------------- LOGIN -----------------
    container: {
      flex: 1,
      backgroundColor: Colors.primaryColor,
      paddingHorizontal: "17@s",
    },
    logoView: {
      alignItems: "center",
      marginTop: "70@vs",
    },
    logo: {
      height: "155@vs",
      width: "155@s",
    },
    signInTitle: {
      ...dimens.heading,
      color: Colors.lightTextgrey,
      textAlign: "center",
      marginTop: "28@vs",
      marginBottom: "17@vs",
    },
    //TextInput
    textInput: {
      backgroundColor: Colors.primaryColor,
      height: "45@vs",
      borderColor: error ? Colors.error_red : Colors.light_white,
      borderWidth: "1@msr",
      borderRadius: "4@msr",
      ...dimens.placeHolder,
      paddingLeft: "8@msr",
      color: Colors.black_color,
      paddingRight: "35@msr",
    },
    fieldTitle: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginVertical: "4@msr",
    },
    textInputView: {
      height: dimen_size_height(13),
    },
    forgotPasswordText: {
      textAlign: "right",
      ...dimens.button,
      color: Colors.button_color,
      marginVertical: "6@vs",
      alignSelf: "flex-end",
    },
    errorText: {
      ...dimens.smallText,
      color: Colors.error_red,
      marginVertical: "3@msr",
    },
    eyeIconView: {
      position: "absolute",
      alignSelf: "flex-end",
      justifyContent: "center",
      bottom: isTablet ? "25%" : "31%",
      right: "3%",
    },
    eyeIcon: {
      height: "18@vs",
      width: "19@s",
    },
    //Sign in button
    buttonView: {
      marginVertical: "30@vs",
    },

    //-----------------------FORGOT PASSWORD-----------------
    logoView2: {
      alignItems: "center",
      marginTop: "40@vs",
    },
    forgotPasswordFieldTitle: {
      ...dimens.Block_body,
      color: Colors.black_color,
      marginBottom: "20@msr",
    },
    forgotPasswordTitle: {
      ...dimens.heading,
      color: Colors.lightTextgrey,
      textAlign: "center",
      marginTop: "28@vs",
      marginBottom: "10@vs",
    },
    forgotPasswordButtonView: {
      marginTop: "56@vs",
      marginBottom: "35@vs",
    },

    //-----------------------CODE VERIFICATION-----------------
    resendCodeText: {
      textAlign: "center",
      ...dimens.button,
      color: Colors.button_color,
      marginVertical: "32@vs",
      alignSelf: "center",
    },
    codeVerifyButtonView: {
      marginTop: "56@vs",
    },
    codeVerifyTextInputView: {
      height: dimen_size_height(14),
    },

    //-----------------------RESET PASSWORD-----------------
    createPasswordBtnView: {
      marginVertical: "36@vs",
    },
    instructionView: {
      flexDirection: "row",
      paddingLeft: "4@msr",
    },
    dot: {
      marginVertical: "2@msr",
    },
    instructionText: {
      ...dimens.smallText,
      color: Colors.black_color,
      marginRight: "10@msr",
    },
    followInstructionTitle: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginTop: "20@msr",
      marginBottom: "15@msr",
    },
    instructionParentView: {
      marginBottom: "15@msr",
    },
  });

export default styles;
