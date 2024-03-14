import React, {useRef}  from "react";
import { View, Text, TextInput } from "react-native";
import Colors from "../themes/colors"; // Themes
const TextField = ({
  handleInputChange,
  value = "",
  placeholder,
  maxLength = 100,
  keyboardType = "default",
  onSubmitEditing,
  multiline = false,
  secureTextEntry = false,
  inputStyle = {},
  textInputRef = useRef(null),
  blurOnSubmit = true,
  fieldTitle,
  fieldTitleStyle,
  returnKeyType = "default",
  error = false,
  errorText = "",
  errorTextStyle = {},
}) => {
  return (
    <View>
      <Text style={fieldTitleStyle}>{fieldTitle}</Text>
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        style={inputStyle}
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
        importantForAutofill='no'
      />
       {error == true && <Text style={errorTextStyle}>{errorText}</Text>}
      
    </View>
  );
};

export default TextField;
