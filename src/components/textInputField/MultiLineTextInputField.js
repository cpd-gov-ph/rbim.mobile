import React, { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { HelperText } from "react-native-paper"; // MultiLine TextInputField UI elements
import Colors from "../../themes/colors"; // Themes
import Styles from "./textInputField.style"; // MultiLine TextInputField styles

const MultiLineTextInputField = ({
  handleInputChange,
  value = "",
  placeholder,
  maxLength = 300,
  keyboardType = "default",
  editable = true,
  textInputRef = useRef(null),
  blurOnSubmit = false,
  onSubmitEditing,
  errorText = "",
  noteText = "",
  is_error = false, // 0 - No error, 1 - Error
  recorrection = false, // 0 - No recorrection, 1 - recorrection
}) => {
  const styles = Styles(is_error, recorrection);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={value}
          ref={textInputRef}
          blurOnSubmit={blurOnSubmit}
          onSubmitEditing={onSubmitEditing}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          style={[
            styles.textInputStyle_multi,
            { opacity: editable ? null : 0.5 },
          ]}
          placeholderTextColor={Colors.placeHolderColor}
          selectionColor={Colors.lineColor}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={true}
          editable={editable}
          textAlignVertical="top"
        />

        <HelperText style={styles.errorText} type="error" visible={is_error}>
          {errorText}
        </HelperText>
      </View>
      {recorrection && (
        <View>
          <Text style={styles.noteTitle}>Notes for review:</Text>
          <Text style={styles.noteText} numberOfLines={200}>
            {noteText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MultiLineTextInputField;

/*   -------------------- DEFAULT PROPS PURPOSE -------------------  */

/*   handleInputChange - on change text function */
/*   value -value entered in the text input field */
/*   placeholder - text input placeholder, */
/*   maxLength - max length for text input field, */
/*   keyboardType - text input keyboard type, */
/*   editable - editable status for text input field, */
/*   fieldTitle - Question for each field */
/*   is_error - false for No error, true for Empty Data or invalid data */
/*   recorrection: false for No recorrection, true for recorrection */
/*   errorText - error message when error status true, */
/*   noteText - notes to be displayed when recorrection is true, */
/*   textInputStyle_multi - styles for textInput, */
