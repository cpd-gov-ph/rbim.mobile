import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import styles from "./auth.styles"; // Auth styles
import { auth_content } from "../../strings"; // Auth Strings
import TextField from "../../components/TextField"; // Custom TextField component
import AuthButton from "../../components/buttons/AuthButton";
import Loader from "../../utils/Loader"; // Custom loader
import { ResendVerifyCodeAPI, VerifyCodeAPI } from "../../network/AuthApi"; // API call
const CodeVerification = ({ route }) => {
  const [code, setCode] = useState(""); //Verification code state
  const [error, setError] = useState(false); //  Error state
  const [errorText, setErrorText] = useState(""); //  Error Text state
  const dispatch = useDispatch();

  const loader = useSelector(
    // forgot password api progress loader
    (state) => state?.authReducer?.verify_code_loading
  );
  const resendAction = () => {
    let _input = {
      email: route?.params.email,
    };
    dispatch(ResendVerifyCodeAPI(_input));
  };
  //Validation
  const onClick = () => {
    if (code === "") {
      setError(true);
      setErrorText("Please enter the right code or resend the code again");
    } else {
      let _input = {
        email: route?.params.email,
        reset_code: parseInt(code),
      };
      dispatch(VerifyCodeAPI(_input));
    }
  };

  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={loader} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles().logoView2}>
          <FastImage
            source={Images.logo}
            style={styles().logo}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles().forgotPasswordTitle}>
          {auth_content.CodeVerificationTitle}
        </Text>
        <View style={styles().codeVerifyTextInputView}>
          <TextField
            inputStyle={styles(error).textInput}
            fieldTitle={auth_content.VerificationCode}
            fieldTitleStyle={styles().forgotPasswordFieldTitle}
            placeholder={auth_content.EnterVerificationCode}
            handleInputChange={(text) => {
              setCode(text);
              setError(false);
            }}
            value={code}
            error={error}
            errorText={errorText}
            errorTextStyle={styles().errorText}
          />
        </View>
        <View style={styles().codeVerifyButtonView}>
          <AuthButton
            text={auth_content.VerifyCode}
            onPress={() => {
              onClick();
            }}
          />
        </View>
        <View>
          <Text
            onPress={() => {
              resendAction();
            }}
            style={styles().resendCodeText}
          >
            {auth_content.ResendCode}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CodeVerification;
