import React, { useState, useRef } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import styles from "./auth.styles"; // Auth styles 
import { auth_content, auth_error_text } from "../../strings"; // Auth Strings
import TextField from "../../components/TextField"; // Custom TextField component
import { snackBar, validatePassword } from "../../utils/helpers"; // Helper functions
import AuthButton from "../../components/buttons/AuthButton"; // Custom button component
import Vector from "../../constants/Vector"; // Icons
import { ResetPasswordAPI } from "../../network/AuthApi"; // API call
import Loader from "../../utils/Loader"; // Custom loader

const ResetPassword = ({ route }) => {
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [passwordError, setPasswordError] = useState(false); // Password Error state
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // Confirm Password Error state
  const [passwordErrorText, setPasswordErrorText] = useState(""); // Password Error Text state
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState(""); // Confirm Password Error Text state
  const [secureTextEntry, setSecureTextEntry] = useState(true); // SecureTextEntry for New password state
  const [secureTextEntry_2, setSecureTextEntry_2] = useState(true); // SecureTextEntry for Confirm password state

  const input1 = useRef(); //New password ref
  const input2 = useRef(); //Confirm password ref
  const dispatch = useDispatch();
  console.log("route", route.params.payload_data.email);
  const loader = useSelector(
    // forgot password api progress loader
    (state) => state?.authReducer?.reset_password_loading
  );
  //Validation
  const onClick = () => {
    if (password === "") {
      setPasswordError(true);
      setPasswordErrorText(auth_error_text.new_password);
    } else if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText(auth_error_text.new_password);
    } else if (confirmPassword !== password) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      setPasswordErrorText(auth_error_text.not_match);
      setConfirmPasswordErrorText(auth_error_text.not_match);
    } else if (!validatePassword(password)) {
      snackBar(auth_error_text.invalid_password);
    } else {
      let payload_data = route.params.payload_data;
      let _input = {
        email: payload_data.email,
        new_password: password,
        reenter_password: confirmPassword,
        reset_code: payload_data.reset_code,
      };
      dispatch(ResetPasswordAPI(_input));
    }
  };

  //Update Password Visibility for New Password
  const updatePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  //Update Password Visibility for Confirm Password
  const updatePasswordVisibility_2 = () => {
    setSecureTextEntry_2(!secureTextEntry_2);
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
          {auth_content.ResetPasswordTitle}
        </Text>

        <Text style={styles().followInstructionTitle}>
          {auth_content.FollowInstruction}
        </Text>
        <View style={styles().instructionParentView}>
          <View style={styles().instructionView}>
            <View style={styles().dot}>{Vector.Dot}</View>
            <Text style={styles().instructionText}>
              {auth_content.PasswordLength}
            </Text>
          </View>
          <View style={styles().instructionView}>
            <View style={styles().dot}>{Vector.Dot}</View>
            <Text style={styles().instructionText}>
              {auth_content.PasswordInstruction}
            </Text>
          </View>
        </View>
        <View style={styles().textInputView}>
          <TextField
            inputStyle={styles(passwordError).textInput}
            fieldTitle={auth_content.NewPassword}
            fieldTitleStyle={styles().fieldTitle}
            placeholder={auth_content.EnterNewPassword}
            secureTextEntry={secureTextEntry}
            handleInputChange={(text) => {
              setPassword(text.trim());
              setPasswordError(false);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              input2.current.focus();
            }}
            blurOnSubmit={false}
            textInputRef={input1}
            value={password}
            error={passwordError}
            errorText={passwordErrorText}
            errorTextStyle={styles().errorText}
          />
          <TouchableOpacity
            style={styles().eyeIconView}
            onPress={() => updatePasswordVisibility()}
          >
            {secureTextEntry ? Vector.Eye : Vector.EyeOff}
          </TouchableOpacity>
        </View>
        <View style={styles().textInputView}>
          <TextField
            inputStyle={styles(confirmPasswordError).textInput}
            fieldTitle={auth_content.ConfirmPassword}
            fieldTitleStyle={styles().fieldTitle}
            placeholder={auth_content.ConfirmNewPassword}
            secureTextEntry={secureTextEntry_2}
            handleInputChange={(text) => {
              setConfirmPassword(text.trim());
              setConfirmPasswordError(false);
            }}
            textInputRef={input2}
            value={confirmPassword}
            error={confirmPasswordError}
            errorText={confirmPasswordErrorText}
            errorTextStyle={styles().errorText}
          />
          <TouchableOpacity
            style={styles().eyeIconView}
            onPress={() => updatePasswordVisibility_2()}
          >
            {secureTextEntry_2 ? Vector.Eye : Vector.EyeOff}
          </TouchableOpacity>
        </View>
        <View style={styles().createPasswordBtnView}>
          <AuthButton
            text={auth_content.CreatePassword}
            onPress={() => {
              onClick();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
