import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters"; // Fou UI responsiveness 
import Colors from "../../themes/colors"; // Themes
import { dimens } from "../../themes/dimens"; // Typography
import { dimen_size_height } from "../../utils/helpers"; // Fou UI responsiveness 

const { width } = Dimensions.get("window");

const button_width = (width - 5 * 10) / 2;

const styles = () =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
    },
    question: {
      ...dimens.title,
      color: Colors.textGreyColor,
      marginHorizontal: "12@msr",
      marginVertical: "12@msr",
    },
    scroll_view: {
      flexGrow: 1,
      backgroundColor: Colors.white,
    },
    field_parent_view: {
      paddingVertical: "17@msr",
    },
    proceed_button_view: {
      marginVertical: "20@msr",
      alignItems: "center",
    },
    form_scroll_view: {
      flexGrow: 1,
      backgroundColor: Colors.light_grey_background,
    },

    category_name: {
      ...dimens.list_title,
      color: Colors.textGreyColor,
      marginHorizontal: "12@msr",
      marginTop: "12@msr",
    },
    question_view: {
      marginTop: "10@msr",
    },
    section_name: {
      marginBottom: "10@msr",
      ...dimens.title,
      color: Colors.textGreyColor,
      marginHorizontal: "12@msr",
    },
    field_view_top: {
      height: "12@msr",
      backgroundColor: Colors.white,
    },
    whiteView:{ backgroundColor: Colors.white},

    //------------------------------ PART B -----------------------
    section_name_b: {
      marginHorizontal: "12@msr",
      ...dimens.bold_small_text,
      color: Colors.text_color_dark,
    },
    section_name_view: {
      backgroundColor: Colors.white,
      paddingTop: "10@msr",
    },
    category_name_b: {
      ...dimens.list_title,
      color: Colors.textGreyColor,
      marginHorizontal: "12@msr",
      marginTop: "12@msr",
      marginBottom: "12@msr",
    },
    section_name_2: {
      marginBottom: "15@msr",
      ...dimens.date_text,
      color: Colors.textGreyColor,
      marginHorizontal: "12@msr",
    },
    category_name_bottom: {
      height: "15@msr",
      backgroundColor: Colors.light_grey_background,
    },
    switch_person_parent_view: {
      flexDirection: "row",
      alignItems: "center",
    },
    person_name_view: {
      paddingHorizontal: "12@msr",
      flexDirection: "row",
    },
    person_name: {
      ...dimens.sub_heading,
      color: Colors.text_color_dark,
    },
    switch_person_view: {
      flexDirection: "row",
      paddingRight: "12@msr",
    },
    switch_person_text: {
      ...dimens.date_text,
      color: Colors.button_color,
      marginLeft: "5@msr",
    },
    switch_icon:{
      alignSelf:'flex-end',
    },
    sub_header_view: {
      marginVertical: "12@msr",
    },
    age_gender_view: {
      flexDirection: "row",
      marginHorizontal: "12@msr",
      marginTop: "8@msr",
    },
    age: {
      ...dimens.date_text,
      color: Colors.text_color_dark,
    },
    gender: {
      ...dimens.date_text,
      color: Colors.text_color_dark,
      marginLeft: "11@msr",
    },

    //---------------------------------- SWITCH PERSON ------------------------------------

    switch_person_flatList: {
      paddingVertical: "24@vs",
    },
    flatListSeparator: {
      height: "16@msr",
    },
    name_card: {
      backgroundColor: Colors.white,
      height: "54@vs",
      borderRadius: "10@msr",
      shadowColor: Colors.light_white,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: "10@msr",
      marginHorizontal: "1@msr",
      elevation: 3,
      flexDirection: "row",
    },
    switch_person_container: {
      flex: 1,
      backgroundColor: Colors.light_grey_background,
      paddingHorizontal: "15@msr",
    },
    name_text_view: {
      flex: 0.85,
      justifyContent: "center",
      paddingHorizontal: "14@msr",
    },
    name_text: {
      ...dimens.otp_field,
      color: Colors.text_color_dark,
      lineHeight: "22@msr",
    },
    icon_view: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },

    //-----------------------------PAUSE SURVEY------------------------
    pause_survey_container: {
     flex: 1,
      backgroundColor: 'red',
      height:dimen_size_height(40)
    },
    pause_survey_header: {
      height: "56@vs",
      backgroundColor: Colors.white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: "15@s",
    },
    pause_survey_text: {
      ...dimens.header_title,
      color: Colors.button_color,
    },
    pause_survey_main_view: {
      marginVertical: "20@vs",
    },
   
    cancel_button_text: {
      color: Colors.previous_button_color,
      ...dimens.Block_body,
      marginHorizontal: "4@msr",
    },
    
    proceed_button_text: {
      color: Colors.white,
      ...dimens.button,
      marginHorizontal: "4@msr",

    },
    buttonView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "10@msr",
      alignItems:'center',
    },
    cancel_button: {
      height: "40@vs",
      width: dimen_size_height(20),
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4@msr",
      borderColor: Colors.previous_button_color,
      borderWidth: "1@msr",
      
    },
    proceed_button: {
      height: "40@vs",
      width: dimen_size_height(20),
      backgroundColor: Colors.button_color,
      justifyContent: "center",
      alignItems: "center",
      alignSelf:'center',
      borderRadius: "4@msr",
      
    },
    buttonView_2: {
      alignItems: "center",
      marginVertical: "30@msr",
    },
    submit_screen_field_view: {
      backgroundColor: Colors.white,
      paddingTop: "15@msr",
      paddingBottom: "5@msr",
    },
  });

  export default styles;
