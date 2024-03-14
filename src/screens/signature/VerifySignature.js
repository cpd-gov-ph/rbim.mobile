import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import { Footer, Header } from "../../components"; // Custom header and footer components
import Styles from "./signature.styles"; // Signature styles
import { snackBar } from "../../utils/helpers"; // UI elements
import { common_content, navigation_screens } from "../../strings"; // Strings
import { survey_signature } from "../../store/actions/surveyActions"; // Survey actions

const VerifySignature = ({ navigation }) => {
  const styles = Styles();
  const dispatch = useDispatch();

  const survey_signature_data = useSelector(
    (state) => state?.surveyReducer?.survey_signature
  );
  const [signatureImage, setImg] = useState(survey_signature_data);
  const onPress = () => {
    navigation.navigate(navigation_screens.EnterSignature, { onSelect: onSelect });
  };

  const onSelect = (data) => {
    dispatch(survey_signature(data?.sign_img));
    setImg(data?.sign_img);
  };
  const onChangeSign = () => {
    navigation.navigate(navigation_screens.EnterSignature, { onSelect: onSelect });
  };
  const onSignatureNext = () => {
    if (signatureImage === "") {
      snackBar("Please enter the signature");
    } else {
      navigation.navigate(navigation_screens.FormSubmitPage);
    }
  };
  return (
    <View style={styles.container_2}>
      <Header
        signature={true}
        onNotesPress={() => navigation.navigate(navigation_screens.Notes)}
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
          {signatureImage === "" ? (
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
          {signatureImage !== "" ? (
            <View style={styles.change_sign_view}>
              <Text
                onPress={onChangeSign}
                style={styles.change_signature_title}
              >
                {common_content.change_signature}
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
        onPressNextButton={() => {
          onSignatureNext();
        }}
        onPressPreviousButton={() => navigation.goBack()}
      />
    </View>
  );
};

export default VerifySignature;
