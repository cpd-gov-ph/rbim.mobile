import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./card.styles"; // Custom card styles
import Vector from "../../constants/Vector"; // Icons

const SurveyCard = ({
  survey_id,
  onCardPress,
  type = 1, // type = 1 - with blue arrow, type = 2 - without blue arrow
}) => {
  return (
    <>
      {type == 1 ? (
        <TouchableOpacity style={styles().surveyCard} onPress={onCardPress}>
          <View style={styles().textView}>
            <Text style={styles().surveyText}>
              {"Survey "}
              {survey_id}
            </Text>
          </View>
          <View style={styles().iconView}>{Vector.BlueArrow}</View>
        </TouchableOpacity>
      ) : type == 2 ? (
        <View style={styles().surveyCard_2}>
          <Text style={styles().surveyText}>
            {"Survey "}
            {survey_id}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default SurveyCard;
