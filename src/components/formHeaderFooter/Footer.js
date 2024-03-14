import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Vector from "../../constants/Vector"; // Icons
import { form_footer } from "../../strings"; // Strings
import Styles from "./formHeaderFooter.styles"; // Footer component styles

const Footer = ({
  onPressPreviousButton,
  onPressNextButton,
  previous_disabled = false, // Previous button disabled state
  next_disabled = false, // Next button disabled state
  proceedText = "Next",
}) => {
  const styles = Styles();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.previous_button}
          onPress={onPressPreviousButton}
          disabled={previous_disabled}
          activeOpacity={previous_disabled ? 1 : 0.6}
        >
          <View style={styles.next_icon}>{Vector.Previous}</View>
          <Text style={styles.previous_button_text}>
            {form_footer.previous}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.next_button, { opacity: next_disabled ? 0.5 : null }]}
          onPress={onPressNextButton}
          disabled={next_disabled}
          activeOpacity={next_disabled ? 1 : 0.6}
        >
          <Text style={styles.next_button_text}>{proceedText}</Text>
          {proceedText !== "Submit" ? (
            <View style={styles.next_icon}>{Vector.Next}</View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Footer;
