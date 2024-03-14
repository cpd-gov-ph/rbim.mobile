import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import styles from "./auth.styles"; // Auth styles 
import { auth_content, auth_error_text } from "../../strings"; // Auth Strings
import TextField from "../../components/TextField"; // Custom TextField component
import { validateEmail } from "../../utils/helpers"; // Helper functions
import AuthButton from "../../components/buttons/AuthButton"; // Custom button component
import { ForgotPasswordAPI } from "../../network/AuthApi"; // API call
import Loader from "../../utils/Loader"; // Custom loader

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Email state
  const [emailError, setEmailError] = useState(false); // Email Error state
  const [emailErrorText, setEmailErrorText] = useState(""); // Email Error Text state
  const dispatch = useDispatch();

  const loader = useSelector(
    // forgotpassword api progress loader
    (state) => state?.authReducer?.forgot_password_loading
  );

  //Validation
  const onClick = () => {
    if (email === "") {
      setEmailError(true);
      setEmailErrorText(auth_error_text.no_email);
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorText(auth_error_text.invaild_email);
    } else {
      let _input = {
        email: email,
      };
      dispatch(ForgotPasswordAPI(_input));
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
          {auth_content.ForgotPasswordTitle}
        </Text>
        <View style={styles().codeVerifyTextInputView}>
          <TextField
            inputStyle={styles(emailError).textInput}
            fieldTitle={auth_content.RegisteredEmail}
            fieldTitleStyle={styles().forgotPasswordFieldTitle}
            placeholder={auth_content.EnterRegisteredEmail}
            keyboardType="email-address"
            handleInputChange={(text) => {
              setEmail(text);
              setEmailError(false);
            }}
            value={email}
            error={emailError}
            errorText={emailErrorText}
            errorTextStyle={styles().errorText}
          />
        </View>
        <View style={styles().forgotPasswordButtonView}>
          <AuthButton
            text={auth_content.SendCode}
            onPress={() => {
              onClick();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
