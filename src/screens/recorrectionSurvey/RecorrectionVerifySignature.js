import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import { Footer, Header } from "../../components"; // Custom header and footer components
import Styles from "../signature/signature.styles"; // Signature styles
import { dimen_size_height, snackBar } from "../../utils/helpers"; // UI elements
import Colors from "../../themes/colors"; // Themes
import { common_content, navigation_screens, survey_number } from "../../strings"; // Strings
import { recorrection_survey_signature } from "../../store/actions/surveyActions"; // Survey actions

const RecorrectionVerifySignature = ({ navigation }) => {
  const styles = Styles();
  const dispatch = useDispatch();

  const survey_signature_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_signature
  );
  const survey_overall_data = useSelector(
    (state) => state?.surveyReducer?.recorrection_overall_data
  );
  const [signatureImage, setImg] = useState(survey_signature_data);
  const onPress = () => {
    navigation.navigate(navigation_screens.EnterSignature, { onSelect: onSelect });
  };

  const onNext = () => {
    if (signatureImage === null) {
      snackBar(survey_number.signature_validation);
    } else {
      navigation.navigate(navigation_screens.RecorrectionFormSubmitPage);
    }
  };
  const onSelect = (data) => {
    dispatch(recorrection_survey_signature(data?.sign_img));

    setImg(data?.sign_img);
  };
  const onChangeSign = () => {
    navigation.navigate(navigation_screens.EnterSignature, { onSelect: onSelect });
  };
  return (
    <View style={styles.container_2}>
      <Header
        signature={true}
        onNotesPress={() => navigation.navigate(navigation_screens.RecorrectionNotes)}
      />
      <ScrollView
        contentContainerStyle={styles.white_view_container}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.privacy_rights_title}>{"PAHINTULOT"}</Text>
          <Text style={styles.privacy_rights_text}>
            {
              'Lubos kong naunawaan ang layunin ng pananaliksik at Census ng baranga. Nabasa ko at pinaliwanag sa akin ang nilalaman ng kasulatian at kusang loob akong sumasangayon na makibahagi sa proyektong ito. Naunawaan kong magiging kampidensiyal ang lahat ng aking kasagutan. Gayunpaman , pinahihntulutan ko ang paggamit ng aking impormasyon ng barangay kalakip ng paggalang sa aking " data privacy rights "'
            }
          </Text>
          {signatureImage === null ? (
            <TouchableOpacity style={styles.enter_sign_box} onPress={onPress}>
              <Text style={styles.enter_sign}>Enter the Signature</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.verify_sign_view]}>
              <Image
                style={styles.signature_image}
                source={{ uri: signatureImage }}
              ></Image>
            </View>
          )}
          {survey_overall_data?.signature?.is_rejected ? (
            <View
              style={[
                styles.change_sign_view,
                {
                  backgroundColor: survey_overall_data?.signature.is_rejected
                    ? Colors.recorrection_color
                    : Colors.appBackgroundColorPrimary,
                  marginVertical: dimen_size_height(1),
                  borderRadius: dimen_size_height(1),
                },
              ]}
            >
              <Text
                onPress={onChangeSign}
                style={[
                  styles.recorrecttion_change_signature_title,
                  { color: Colors.errorColor },
                ]}
              >
                {common_content.change_signature}
              </Text>

              <Text style={styles.noteTitle}>Notes for review:</Text>
              <Text
                style={[
                  styles.noteText,
                  { marginBottom: dimen_size_height(1) },
                ]}
                numberOfLines={200}
              >
                {survey_overall_data?.signature.reject_reason}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.last_line_view}>
          <Text style={styles.last_line_text}>
            {"Pangalan at lagda ng Nakapanayam"}
          </Text>
        </View>
      </ScrollView>
      <Footer
        next_disabled={false}
        onPressNextButton={() => onNext()}
        onPressPreviousButton={() => navigation.goBack()}
      />
    </View>
  );
};

export default RecorrectionVerifySignature;

const styles = StyleSheet.create({});
