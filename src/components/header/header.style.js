import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness

const styles = () =>
  ScaledSheet.create({
    //------------------- Main Header ------------------
    container: {
      backgroundColor: Colors.primaryColor,
      height: "56@vs",
    },
    legal_container: {
      backgroundColor: Colors.primaryColor,
      height: "75@vs",
      borderBottomWidth: "1@msr",
      borderBottomColor: Colors.borderWidthColor,
    },
    headerView: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    menuIconView: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    menuIcon: {
      height: "12@vs",
      width: "18@s",
    },
    logoView: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    logo: {
      width: "25@vs",
      height: "25@vs",
      right: "3@vs",
    },
    title: {
      ...dimens.header_title,
      color: Colors.button_color,
    },
    save_title: {
      ...dimens.header_heading,
      color: Colors.appBackgroundColorPrimary,

      justifyContent: "center",
      textAlign: "center",
    },
    legal_title: {
      ...dimens.header_title,
      color: Colors.black_color,
    },
    notificationIconView: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    notificationIcon: {
      width: "18@s",
      height: "21@vs",
    },
    dotRed: {
      position: "absolute",
      right: "25%",
      bottom: "22%",
      backgroundColor: Colors.errorColor,
      height: "15@msr",
      width: "15@msr",
      borderRadius: "15@msr",
      justifyContent: "center",
      alignItems: "center",
    },
    count: {
      ...dimens.countText,
      color: Colors.primaryColor,
    },

    //-----------------------Back Header-----------------

    backIconView: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    backIcon: {
      height: "14@vs",
      width: "16@s",
    },
    titleView: {
      flex: 0.85,
    },
    notesView: {
      flex: 0.5,
    },
    saveView: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center",
    },
    saveButtonView: {
      height: dimen_size_height(5),
      width: dimen_size_height(10),
      backgroundColor: Colors.appBackgroundColorSecondary,
      justifyContent: "center",
      borderRadius: dimen_size_height(1),
    },
    heading_Sub_Txt: {
      ...dimens.body,
      color: Colors.lightGray,
      paddingVertical: "3@msr",
    },
  });

export default styles;
