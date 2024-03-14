import React from "react";
import { Text } from "react-native";
import SpinnerButton from "react-native-spinner-button"; // UI element - Button
import styles from "./buttons.style"; // Button styles

// Custom Spinner Button
const AuthButton = ({
  text,
  onPress,
  isLoading = false,
  disabled = false,
  spinColor = "#ffffff",
}) => {
  return (
    <SpinnerButton
      buttonStyle={styles().signInButtonStyle}
      isLoading={isLoading}
      spinnerColor={spinColor}
      onPress={onPress}
      spinnerType={"MaterialIndicator"}
      disabled={disabled}
    >
      <Text style={styles().buttonTextStyle}>{text}</Text>
    </SpinnerButton>
  );
};
export default AuthButton;
