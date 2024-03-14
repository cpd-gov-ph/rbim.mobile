import React, { useState, useRef } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import styles from "./auth.styles"; // Auth styles 
import { auth_content, auth_error_text, navigation_screens } from "../../strings"; // Auth Strings
import TextField from "../../components/TextField"; // Custom TextField component
import { getFcmToken, validateEmail } from "../../utils/helpers"; // Helper functions
import Loader from "../../utils/Loader"; // Custom loader
import AuthButton from "../../components/buttons/AuthButton"; // Custom button component
import { LoginAPI } from "../../network/AuthApi"; // API call
import Vector from "../../constants/Vector"; // Icons

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [emailError, setEmailError] = useState(false); // Email Error state
  const [passwordError, setPasswordError] = useState(false); // Password Error state
  const [emailErrorText, setEmailErrorText] = useState(""); // Email Error Text state
  const [passwordErrorText, setPasswordErrorText] = useState(""); // Password Error Text state
  const [secureTextEntry, setSecureTextEntry] = useState(true); // SecureTextEntry state

  const input1 = useRef(); //Email ref
  const input2 = useRef(); //Password ref
  const dispatch = useDispatch();

  const login_loader = useSelector(
    // login api progress loader
    (state) => state?.authReducer?.login_loading
  );

  const onForgotAction = async () => {
    setEmail("");
    setPassword("");
    navigation.navigate(navigation_screens.ForgotPassword);
  };
  //Validation
  const onClick = async () => {
    if (email === "") {
      setEmailError(true);
      setEmailErrorText(auth_error_text.no_email);
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorText(auth_error_text.invaild_email);
    } else if (password === "") {
      setPasswordError(true);
      setPasswordErrorText(auth_error_text.no_password);
    } else {
      let auth_input = {
        email: email,
        password: password,
        fcm_token: await getFcmToken(),
      };
      console.log("auth_input", auth_input);
      dispatch(LoginAPI(auth_input));
    }
  };

  //Update Password Visibility
  const updatePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  console.log("login_loader", login_loader);
  return (
    <SafeAreaView style={styles().container}>
      {login_loader ? <Loader loading={login_loader} /> : null}

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles().logoView}>
          <FastImage
            source={Images.logo}
            style={styles().logo}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles().signInTitle}>{auth_content.SignInTitle}</Text>
        <View style={[styles().textInputView]}>
          <TextField
            inputStyle={styles(emailError).textInput}
            fieldTitle={auth_content.EmailId}
            fieldTitleStyle={styles().fieldTitle}
            placeholder={auth_content.EnterEmailId}
            keyboardType="email-address"
            handleInputChange={(text) => {
              setEmail(text);
              setEmailError(false);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              input2.current.focus();
            }}
            blurOnSubmit={false}
            textInputRef={input1}
            value={email}
            error={emailError}
            errorText={emailErrorText}
            errorTextStyle={styles().errorText}
          />
        </View>
        <View style={[styles().textInputView]}>
          <TextField
            inputStyle={styles(passwordError).textInput}
            fieldTitle={auth_content.Password}
            fieldTitleStyle={styles().fieldTitle}
            placeholder={auth_content.EnterPassword}
            secureTextEntry={secureTextEntry}
            handleInputChange={(text) => {
              setPassword(text);
              setPasswordError(false);
            }}
            textInputRef={input2}
            value={password}
            error={passwordError}
            errorText={passwordErrorText}
            errorTextStyle={styles().errorText}
          ></TextField>
          <TouchableOpacity
            style={styles().eyeIconView}
            onPress={() => updatePasswordVisibility()}
          >
            {secureTextEntry ? Vector.Eye : Vector.EyeOff}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            onPress={() => {
              onForgotAction();
            }}
            style={styles().forgotPasswordText}
          >
            {auth_content.ForgotPassword}
          </Text>
        </View>
        <View style={styles().buttonView}>
          <AuthButton
            text={auth_content.SignIn}
            onPress={() => {
              onClick();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
