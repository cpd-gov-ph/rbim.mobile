import React, { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { HelperText } from "react-native-paper"; // Custom TextInputField UI elements
import Colors from "../../themes/colors"; // Themes
import Styles from "./textInputField.style"; // Custom TextInputField styles

const CustomTextInputField = ({
  handleInputChange,
  value = "",
  placeholder,
  maxLength = 200,
  keyboardType = "default",
  onSubmitEditing,
  multiline = false,
  secureTextEntry = false,
  textInputRef = useRef(null),
  blurOnSubmit = true,
  editable = true,
  returnKeyType = "default",
  errorText = "",
  noteText = "No reasons mentioned",
  key = 0,
  is_error = false, // 0 - No error, 1 - Error
  recorrection = false, // 0 - No recorrection, 1 - recorrection
  onFocus,
}) => {
  const styles = Styles(is_error, recorrection);
  return (
    <View style={styles.container}>
      <View style={styles.fieldView}>
        <TextInput
          value={value}
          onFocus={onFocus}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          style={[styles.textInputStyle, { opacity: editable ? null : 0.5 }]}
          placeholderTextColor={Colors.placeHolderColor}
          selectionColor={Colors.lineColor}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          ref={textInputRef}
          blurOnSubmit={blurOnSubmit}
          onSubmitEditing={onSubmitEditing}
          multiline={multiline}
          editable={editable}
          key={key}
          importantForAutofill='no'
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

export default CustomTextInputField;

/*   -------------------- DEFAULT PROPS PURPOSE -------------------  */

/*   handleInputChange - on change text function */
/*   value -value entered in the text input field */
/*   placeholder - text input placeholder, */
/*   maxLength - max length for text input field, */
/*   keyboardType - text input keyboard type, */
/*   onSubmitEditing - on Submit Editing function, */
/*   multiline - multiline status for text input, */
/*   secureTextEntry - secureTextEntry status for password visibility, */
/*   blurOnSubmit - blurOnSubmit status */
/*   editable - editable status for text input field, */
/*   fieldTitle - Question for each field */
/*   is_error - false for No error, true for Empty Data or invalid data */
/*   recorrection: false for No recorrection, true for recorrection */
/*   errorText - error message when error status true, */
/*   noteText - notes to be displayed when recorrection is true, */
/*   textInputStyle - styles for textInput, */
