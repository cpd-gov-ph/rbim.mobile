import React from "react";
import { SafeAreaView, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Colors from "../../themes/colors"; // Themes
import styles from "./notes.style"; // Notes styles
import { survey_notes } from "../../store/actions/surveyActions"; // Survey actions

const Notes = () => {
  const dispatch = useDispatch();

  const survey_note_data = useSelector(
    (state) => state?.surveyReducer?.survey_notes
  );
  return (
    <SafeAreaView style={styles().container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TextInput
          style={styles().textInputContainer}
          value={survey_note_data}
          onChangeText={(text) => {
            dispatch(survey_notes(text));
          }}
          multiline={true}
          selectionColor={Colors.lineColor}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Notes;
