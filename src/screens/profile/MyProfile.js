import React, { useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, BackHandler } from "react-native";
import moment from "moment"; // For formatting date and time
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import styles from "./profile.styles"; // Profile styles
import Loader from "../../utils/Loader"; // Custom loader
import { ProfileViewAPI } from "../../network/ProfileApi"; // API call
import { navigation_screens, profile } from "../../strings";

const MyProfile = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    ProfileAPI(); // Profile API
    const backAction = () => {
      navigation.navigate(navigation_screens.Home);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const ProfileAPI = () => {
    dispatch(ProfileViewAPI());
  };
  const profile_loader = useSelector(
    // profile view api progress loader
    (state) => state?.profileReducer?.profile_loading
  );
  const profile_data = useSelector(
    (state) => state?.profileReducer?.profile_data
  );

  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={profile_loader} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles().myProfileTitle}>{profile.my_profile}</Text>

        <View style={styles().detailsView}>
          {/* Name View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.name}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.first_name}
              </Text>
            </View>
          </View>
          {/* Email address View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.email_address}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.email}
              </Text>
            </View>
          </View>
          {/* Phone numberView */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.phone_number}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.profile.phone_no}
              </Text>
            </View>
          </View>
          {/* DOB View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.dob}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.profile.dob
                  ? moment(profile_data.profile.dob).format("DD-MM-YYYY")
                  : ""}
              </Text>
            </View>
          </View>
          {/* User role View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.user_role}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile.data_collector}
              </Text>
            </View>
          </View>
          {/* Barangay Official View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.barangay_official}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.barangay.first_name}
              </Text>
            </View>
          </View>
            {/* Province*/}
            <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.province}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.city.name}
              </Text>
            </View>
          </View>
          {/* City/ Municipality View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.city_municipality}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.municipality.name}
              </Text>
            </View>
          </View>
           {/* Barangay View */}
           <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.barangay}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.barangay_location.name}
              </Text>
            </View>
          </View>
          {/* Address View */}
          <View style={styles().fieldView}>
            <Text style={styles().fieldTitle}>{profile.address}</Text>
            <View style={styles().fieldBox}>
              <Text style={styles().fieldText} numberOfLines={1}>
                {profile_data.profile.address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
