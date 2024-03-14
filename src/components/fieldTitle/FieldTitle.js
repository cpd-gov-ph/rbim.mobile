import { Text, View, TextInput } from "react-native";
import React, { useRef } from "react";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import { dimens } from "../../themes/dimens"; // Typography
import Colors from "../../themes/colors"; // Themes

const FieldTitle = ({
  fieldTitle,
  recorrection = false,
  is_visible = true,
  disabled,
  textRef = useRef(null),
}) => {
  return (
    <View
      style={[
        styles.titleContainer,
        {
          backgroundColor: recorrection
            ? Colors.error_pink_background
            : Colors.primaryColor,
          paddingTop: recorrection ? 5 : null,
          marginTop: recorrection ? 5 : null,
        },
      ]}
    >
      <View style={styles.fieldView} pointerEvents="none">
        <TextInput
          ref={textRef}
          spellCheck={false}
          autoCorrect={false}
          style={styles.title}
          maxLength={300}
          caretHidden
          showSoftInputOnFocus={false}
          multiline={true}
        >
          <Text
            style={[
              styles.fieldTitle,
              {
                color:
                  recorrection && is_visible
                    ? Colors.error_light_red
                    : !is_visible
                    ? Colors.disable_color
                    : Colors.black_color,
              },
              { opacity: disabled ? 0.4 : null },
            ]}
            numberOfLines={100}
          >
            {fieldTitle} <Text style={styles.star}>*</Text>{" "}
          </Text>
        </TextInput>
      </View>
    </View>
  );
};

export default FieldTitle;

const styles = ScaledSheet.create({
  titleContainer: {
    backgroundColor: Colors.primaryColor,
  },
  fieldTitle: {
    ...dimens.sub_heading,
    color: Colors.black_color,
    marginTop: "4@msr",
  },
  star: {
    color: Colors.error_red,
  },
  fieldView: {
    marginHorizontal: "12@msr",
    marginTop: "4@msr",
  },
  title: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    lineHeight: "23@msr",
  },
});
