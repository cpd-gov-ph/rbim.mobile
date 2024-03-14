import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../constants/Images"; // Images
import Vector from "../constants/Vector"; // Icons
import Colors from "../themes/colors"; // Themes
import { dimens } from "../themes/dimens"; // Typography
import {
  auth_content,
  drawer_text,
  common_content,
  storage_key,
  navigation_screens,
} from "../strings"; // Strings
import { LogoutAPI } from "../network/AuthApi"; // API call
import { getUserInformation } from "../utils/localStorage"; // Local storage data

const CustomDrawer = ({ navigation }) => {
  const [arrow, setArrow] = useState(false); // Up Down arrow state
  const [showSurveyDetails, setShowSurveyDetails] = useState(false); //To show and hide the survey details
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const survey_list = useSelector(
    // survey list data
    (state) => state?.homeReducer?.survey_list
  );

  const ongoing_survey_list = useSelector(
    (state) => state?.surveyReducer?.ongoing_survey_list
  );

  const drawer_survey_show = useSelector(
    (state) => state?.navigationReducer?.drawer_survey_show
  );

  const [ongoingList1, SetOngoingList1] = useState([]);

  //Survey OnPress
  const surveyOnPress = () => {
    setArrow(!arrow);
    setShowSurveyDetails(!showSurveyDetails);
  };
  useEffect(() => {
    getUserInformation(storage_key.user_information).then((res) => {
      let payload_info = JSON.parse(res);
      setEmail(payload_info.email);
      setName(payload_info.first_name);
    });
  }, []);

  //Line separator
  const Line = () => {
    return <View style={styles.line} />;
  };
  const onLogoutAction = () => {
    dispatch(LogoutAPI());
  };
  const logoutPopup = () => {
    Alert.alert(
      auth_content.RBIM,
      common_content.logout_title,
      [
        {
          text: common_content.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: common_content.ok, onPress: () => onLogoutAction() },
      ],
      { cancelable: false }
    );
  };
  //Survey Details view
  const SurveyView = () => {
    return (
      <View style={styles.surveyView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigation_screens.OngoingSurvey, {
              status: "survey_ongoing",
              on_going_payload: ongoing_survey_list,
            })
          }
        >
          <Text style={styles.surveyText} numberOfLines={1}>
            {drawer_text.ongoingSurvey}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigation_screens.RecorrectionSurvey, {
              status: "survey_recorrection",
              recorrection_payload: survey_list,
            })
          }
        >
          <Text style={styles.surveyText} numberOfLines={1}>
            {drawer_text.recorrectionSurvey}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileView}>
        <View style={styles.imageView}>
          <View style={styles.profileImg}>{Vector.Account}</View>
        </View>
        <View style={styles.nameView}>
          <Text style={styles.profileName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.userName} numberOfLines={1}>
            {email}
          </Text>
        </View>
      </View>
      <Line />
      <View>
        {drawer_survey_show === 1 && (
          <>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => surveyOnPress()}
            >
              <View style={styles.iconView}>
                <FastImage
                  source={Images.survey}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.drawerIcon}
                />
              </View>
              <View style={{ flex: 0.73 }}>
                <Text numberOfLines={1} style={styles.tabTitle}>
                  {drawer_text.survey}
                </Text>
              </View>
              <View style={styles.arrowIconView}>
                {arrow ? Vector.UpArrow : Vector.DownArrow}
              </View>
            </TouchableOpacity>
            {showSurveyDetails && <SurveyView />}
            <Line />
          </>
        )}
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate(navigation_screens.LegalDocument);
          }}
        >
          <View style={styles.iconView}>
            <FastImage
              source={Images.document}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.drawerIcon}
            />
          </View>
          <View style={styles.drawerItemTitle}>
            <Text numberOfLines={1} style={styles.tabTitle}>
              {drawer_text.legalDocumentation}
            </Text>
          </View>
        </TouchableOpacity>
        <Line />
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => logoutPopup()}
        >
          <View style={styles.iconView}>
            <FastImage
              source={Images.logout}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.logoutIcon}
            />
          </View>
          <View style={styles.drawerItemTitle}>
            <Text numberOfLines={1} style={styles.tabTitle}>
              {drawer_text.logOut}
            </Text>
          </View>
        </TouchableOpacity>
        <Line />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  drawerItem: {
    flexDirection: "row",
    paddingVertical: "17@vs",
    paddingHorizontal: "10@s",
  },
  tabTitle: {
    ...dimens.body,
    color: Colors.black_color,
    lineHeight: "21@msr",
    paddingRight: "12@s",
  },
  profileView: {
    flexDirection: "row",
    paddingTop: "12@vs",
    paddingBottom: "14@vs",
    paddingHorizontal: "10@s",
    alignItems: "center",
  },
  imageView: {
    justifyContent: "center",
  },
  profileImg: {
    height: "48@msr",
    width: "48@msr",
    borderRadius: "48@msr",
    backgroundColor: Colors.appBackgroundColorSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  nameView: {
    flex: 3,
    justifyContent: "center",
    paddingLeft: "15@msr",
  },
  profileName: {
    ...dimens.intro_title_body,
    color: Colors.black_color,
    lineHeight: "24@msr",
  },
  userName: {
    ...dimens.drawerText,
    color: Colors.black_color,
  },
  drawerIcon: {
    height: "18@vs",
    width: "18@s",
  },
  logoutIcon: {
    height: "20@vs",
    width: "20@s",
  },

  //line
  line: {
    borderBottomColor: Colors.drawer_border_color,
    borderBottomWidth: "1@msr",
  },
  surveyText: {
    ...dimens.body,
    color: Colors.black_color,
    lineHeight: "21@msr",
    marginVertical: "6@msr",
  },
  surveyView: {
    paddingHorizontal: "13@s",
    marginBottom: "15@vs",
  },
  arrowIconView: {
    flex: 0.15,
    alignItems: "center",
  },
  iconView: {
    flex: 0.12,
  },
  drawerItemTitle: {
    flex: 0.88,
    justifyContent: "center",
  },
});

export default CustomDrawer;
