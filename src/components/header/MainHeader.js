import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation from header component
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import styles from "./header.style"; // Header styles
import {
  NotificationCountAPI,
  NotificationSeenAllAPI,
} from "../../network/NotificationApi";
import { navigation_screens } from "../../strings";

const MainHeader = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const notification_count = useSelector(
    (state) => state?.notificationReducer?.notification_header_count
  );

  useEffect(() => {
    dispatch(NotificationCountAPI());
  }, []);

  console.log(notification_count, "notification_count");

  const onPressMenu = () => {
    navigation.openDrawer();
  };
  const onPressNotification = () => {
    dispatch(NotificationSeenAllAPI());
    navigation.navigate(navigation_screens.Notification);
  };

  return (
    <View style={styles().container}>
      <View style={styles().headerView}>
        <TouchableOpacity style={styles().menuIconView} onPress={onPressMenu}>
          <FastImage
            source={Images.menu}
            resizeMode={FastImage.resizeMode.contain}
            style={styles().menuIcon}
          />
        </TouchableOpacity>
        <View style={styles().logoView}>
          <FastImage
            source={Images.logo}
            style={styles().logo}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles().title}>{"RBIM"}</Text>
        </View>

        <TouchableOpacity
          style={styles().notificationIconView}
          onPress={onPressNotification}
          activeOpacity={1}
        >
          <FastImage
            source={Images.notification}
            resizeMode={FastImage.resizeMode.contain}
            style={styles().notificationIcon}
          />
          {notification_count > 0 ? (
            <View style={styles().dotRed}>
              <Text style={styles().count}>
                {notification_count > 9 ? "9+" : notification_count}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;
