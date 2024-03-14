import React, { useState, useEffect, Alert } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview"; // To display web content
import { Checkbox } from "react-native-paper"; // UI elements
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import moment from "moment"; // For formatting date and time
import { auth_content, common_content } from "../../strings"; // Strings
import { styles } from "./TermsAndConditions.styles"; // Terms And Conditions styles
import Colors from "../../themes/colors"; // Themes
import { Fonts } from "../../fontfamily"; // Typography
import { addhtml_content } from "../../utils/helpers"; // Helper functions
import { AgreeAPI } from "../../network/AuthApi"; // API call
import Loader from "../../utils/Loader"; // Custom loader
const TermsAndConditions = ({ route }) => {
  // Checkbox
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [terms_data, setTermsData] = useState(route?.params.terms_data);
  console.log("terms_data", terms_data.email);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.authReducer?.legel_c_loading);
  useEffect(() => {
    const backAction = () => {
      Alert.alert(common_content.title, common_content.login_again, [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const AgreeAction = () => {
    let auth_input = {
      is_agree: 1,
    };
    console.log("auth_input", auth_input);
    dispatch(AgreeAPI(auth_input));
  };
  console.log(
    "terms_data.term_and_conditions.updated_at",
    terms_data.term_and_conditions.updated_at
  );
  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={loader} />
      <View style={styles().head_container}>
        <View style={styles().heading}>
          <Text style={styles().heading_Txt}>
            {terms_data.term_and_conditions.title}
          </Text>
          <Text style={styles().heading_Sub_Txt}>
            {auth_content.Last_updated}
            {moment(terms_data.term_and_conditions.updated_at).format(
              "DD/MM/YYYY"
            )}
          </Text>
        </View>
      </View>
      <WebView
        hasZoom={false}
        source={{
          html: addhtml_content(
            Fonts.Regular,
            "ttf",
            terms_data.term_and_conditions.meta_value
          ),
        }}
      />
      <View style={styles().checkBox_MainView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setChecked(!checked);
          }}
          style={styles().checkBoxView}
        >
          <View style={styles().checkBoxStyle}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color={Colors.button_color}
            />
            <Text style={styles().checkbox_txt}>
              {auth_content.Agree_Terms_and_Conditions}
            </Text>
          </View>
        </TouchableOpacity>
        {/* main */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setChecked1(!checked1)}
          style={styles().checkBoxView}
        >
          <View style={styles().checkBoxStyle}>
            <Checkbox
              status={checked1 ? "checked" : "unchecked"}
              onPress={() => {
                setChecked1(!checked1);
              }}
              color={Colors.button_color}
            />
            <Text style={styles().checkbox_txt}>
              {auth_content.Agree_Privacy_Policy}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => AgreeAction()}
            activeOpacity={checked & checked1 ? 0.7 : 1}
            disabled={checked & checked1 ? false : true}
            style={[
              styles().button,
              {
                backgroundColor:
                  checked & checked1
                    ? Colors.button_color
                    : Colors.disable_color,
              },
            ]}
          >
            <Text style={styles().btn_Txt}>{auth_content.I_Agree}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
