import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

let { height } = Dimensions.get("window");

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },
    scroll_container: {
      paddingHorizontal: "17@s",
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "12@msr",
      marginTop: "15@vs",
    },
    sectionHeight: { paddingBottom: "50@vs" },
    sectionTitle: {
      ...dimens.list_title,
      color: Colors.textGreyColor,
    },
    showMore: {
      ...dimens.sub_heading,
      color: Colors.button_color,
      textDecorationLine: "underline",
    },
    syncView: {
      ...dimens.sub_heading,
      color: Colors.button_color,
    },
    listItemSeparator: {
      height: "8@msr",
    },
    //Task Notification View
    task_notification_card: {
      backgroundColor: Colors.task_card_background,
      borderColor: Colors.task_card_border,
      borderRadius: "10@msr",
      borderWidth: "2@msr",
      paddingVertical: "15@msr",
      paddingHorizontal: "7@msr",
      marginVertical: "20@vs",
    },
    taskTitle: {
      ...dimens.title,
      color: Colors.black_color,
    },
    taskSubTitle: {
      ...dimens.sub_heading,
      color: Colors.black_color,
      marginVertical: "6@msr",
    },
    taskDescription: {
      ...dimens.placeHolder,
      color: Colors.description_gray,
      lineHeight: "20@msr",
    },
    //List empty component
    noSurvey: {
      alignItems: "center",
      justifyContent: "center",
      height: dimen_size_height(40),
    },
    noTask: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    createSurveyImgView: {
      backgroundColor: Colors.primaryColor,
      borderRadius: "128@msr",
      height: "128@vs",
      width: "128@s",
      alignItems: "center",
      justifyContent: "center",
    },
    createSurveyImg: {
      height: "85@vs",
      width: "85@s",
    },
    listEmptyTitle: {
      ...dimens.list_title,
      color: Colors.button_color,
      marginTop: "15@msr",
      marginBottom: "8@msr",
    },
    listEmptyText: {
      ...dimens.list_empty_text,
      color: Colors.textGreyColor,
      lineHeight: "22@msr",
      textAlign: "center",
    },

    //----------------SURVEY STATUS-------------
    statusTitleView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "12@msr",
    },
    searchBar: {
      backgroundColor: Colors.primaryColor,
      height: "45@vs",
      borderRadius: "5@msr",
      paddingHorizontal: "8@msr",
      marginTop: "12@msr",
      marginBottom: "17@msr",
      flexDirection: "row",
      alignItems: "center",
    },
    searchBar_2: {
      backgroundColor: Colors.primaryColor,
      height: "45@vs",
      borderRadius: "5@msr",
      paddingHorizontal: "8@msr",
      marginBottom: "17@msr",
      flexDirection: "row",
      alignItems: "center",
    },
    searchIconView: {
      flex: 0.06,
    },
    textInputView: {
      flex: 0.94,
    },
    searchTextInput: {
      ...dimens.placeHolder,
      color: Colors.black_color,
    },
    searchIcon: {
      height: "13@vs",
      width: "13@s",
    },
    flatListHeight: {
      paddingBottom: "25@vs",
    },
    assigned_task_view: {
      marginTop: "10@msr",
      marginBottom: "35@vs",
    },
    assigned_task_box: {
      height: "60@vs",
      backgroundColor: Colors.button_color,
      borderRadius: "5@msr",
      marginTop: "12@msr",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: "8@msr",
    },
    num_view: {
      height: "30@vs",
      width: "58@s",
      backgroundColor: Colors.white,
      borderRadius: "4@msr",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: "10@msr",
    },
    no_of_task: {
      ...dimens.title,
      color: Colors.white,
    },
    task_count: {
      ...dimens.title,
      color: Colors.black_color,
    },
    flatListSeparator: {
      height: "18@msr",
    },
    task_notification_card_2: {
      backgroundColor: Colors.task_card_background,
      borderColor: Colors.task_card_border,
      borderRadius: "10@msr",
      borderWidth: "2@msr",
      paddingVertical: "15@msr",
      paddingHorizontal: "7@msr",
    },
    flatList: {
      paddingTop: "20@vs",
      paddingBottom: "50@vs",
    },
    empty_component: {
      justifyContent: "center",
      height: height * 0.7,
      alignItems: "center",
    },
    list_empty_text: {
      ...dimens.modal_title,
      color: Colors.textGreyColor,
    },
  });

export default styles;
