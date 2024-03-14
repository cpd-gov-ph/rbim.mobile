import { View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes

const Line = () => {
  return <View style={styles.line} />;
};

export default Line;

const styles = ScaledSheet.create({
  line: {
    borderBottomColor: Colors.borderWidthColor,
    borderBottomWidth: "0.5@msr",
  },
});
