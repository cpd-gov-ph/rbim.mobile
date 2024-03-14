import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image"; // To load images faster
import { form_header, survey_number } from "../../strings"; // Strings
import Styles from "./formHeaderFooter.styles"; // Header component styles
import Images from "../../constants/Images"; // Images
import Colors from "../../themes/colors"; // Themes

const Header = ({
  survey_num,
  onNotesPress,
  onPausePress,
  signature = false,
  submit_screen = false,
  pause_survey = true,
}) => {
  const styles = Styles();
  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor:
            signature || submit_screen
              ? Colors.form_header_color
              : Colors.form_header_color_light,
        },
      ]}
    >
      <View style={styles.survey_num_view}>
        {signature ? (
          <View>
            <Text style={styles.view_notes}>{"View notes"}</Text>
            <Text style={styles.view_notes_text} numberOfLines={2}>
              {"View notes taken for this survey"}
            </Text>
          </View>
        ) : submit_screen ? (
          <View>
            <Text style={styles.view_notes}>{"Survey completed"}</Text>
            <Text style={styles.view_notes_text} numberOfLines={2}>
              {"Note the end time and survey status"}
            </Text>
          </View>
        ) : (
          <View style={styles.survey_num_parent_view}>
            <Text numberOfLines={1} style={styles.survey_num_text}>
              {survey_number.survey_title} :{survey_num}
            </Text>
            {pause_survey ? (
              <TouchableOpacity onPress={onPausePress}>
                <FastImage
                  source={Images.pause}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.pause_icon}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
      {!submit_screen && (
        <View style={styles.notes_btn_view}>
          <TouchableOpacity style={styles.notes_btn} onPress={onNotesPress}>
            <FastImage
              source={Images.notes}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.notes_icon}
            />
            <Text style={styles.notes_btn_text}>{form_header.notes}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Header;
