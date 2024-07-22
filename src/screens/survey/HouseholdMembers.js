import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ScrollView to make entire screen scrollable
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import moment from "moment"; // For formatting date and time
import {
  CustomTextInputField,
  FieldTitle,
  Footer,
  Header,
} from "../../components"; // Custom components
import Styles from "./survey.styles"; // Survey styles
import { household_members, navigation_screens, storage_key } from "../../strings"; // Strings
import { allownumonly, snackBar, validateSpace } from "../../utils/helpers"; // Helper functions
import {
  household_info,
  survey_a_data,
  survey_b_data,
  survey_b_members,
} from "../../store/actions/surveyActions"; // Survey actions
import { getSurveyQuestions, setSurveyDetails } from "../../utils/localStorage"; // Local storage data
import * as constant from "../../utils/constant";
import { APIRequest } from "../../network/AxiosUtils";
import PauseSurvey from "./PauseSurvey"; // Pause survey modal component
import Loader from "../../utils/Loader"; // Custom loader

const HouseholdMembers = ({ navigation, route }) => {
  const styles = Styles();
  const dispatch = useDispatch();
  const number_input = useRef(null);

  const [PauseModel, setPauseModel] = useState(false);
  const [newUser, SetNewUser] = useState(true);
  const surveyInputData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.surveyInputData
  );
  const survey_initialData = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_initial_section
  );
  const survey_part_a_data = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_part_a
  );
  const householdlist = useSelector(
    (state) => state?.surveyReducer?.household_info.householdlist
  );
  const survey_part_c_data = useSelector(
    (state) => state?.surveyReducer?.survey_part_c
  );
  const members_list = useSelector((state) => state?.surveyReducer?.members);
  const [totalMembers, setTotalMembers] = useState(""); // Total Household members state

  const survey_info_data = useSelector(
    // forgotPassword api progress loader
    (state) => state?.surveyReducer?.survey_info
  );
  const isSingle = 0;
  let part_a = [...survey_part_a_data];

  const [loading, SetLoading] = useState(false);
  const [membersError, setMembersError] = useState(false); // Members text field error state
  const [membersErrorText, setMembersErrorText] = useState(""); // Members text field error message state
  const [personError, setPersonError] = useState(false); // Person name text field error state
  const [personField, setPersonField] = useState(false); // Person name text field error message state
  const [nextButtonDisable, setNextButtonDisable] = useState(true); //Next button disable state

  const [personIndex, setPersonIndex] = useState(""); // Person Error field index state
  const [partB_data, setPartB] = useState("");
  const [data, setData] = useState([]); // Array data to store person names state

  useEffect(() => {
    if (members_list.length > 0) {
      setTotalMembers(members_list.length.toString());
      setData([...householdlist]);
    }
  }, []);

  useEffect(() => {
    if (totalMembers >= 1) {
      onClickProceed();
    }
    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let form_data = JSON.parse(res);
        setPartB(form_data.data.house_hold_member_section);
        let arr = form_data.data.house_hold_member_section;
        dispatch(survey_b_data(arr));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [totalMembers]);
  //Proceed function and validation
  const onClickProceed = () => {
    if (totalMembers === "") {
      setMembersError(true);
      setMembersErrorText(household_members.members_empty_error);
    } else if (totalMembers < 1) {
      setMembersError(true);
      setMembersErrorText(household_members.members_empty_error);
    } else if (totalMembers > household_members.member_limit) {
      setMembersError(true);
      setMembersErrorText(household_members.members_more_than_25);
    } else {
      setPersonField(true);
      setNextButtonDisable(false);
      let input;
      if (data.length === 0) {
        input = 1;
      } else {
        input = data.length + 1;
      }
      if (totalMembers < data.length) {
        data.splice(totalMembers);
        setData([...data]);
      } else {
        for (input; input <= totalMembers; input++) {
          data.push({
            member_id: input,
            member_name: "",
            member_passes: false,
            member_completed_status: 0,
            category: [
              {
                _id: 1,
                page: [
                  {
                    category_name: "Demographic Characteristics",
                    position: 5,
                    page: 1,
                    section: [
                      {
                        section_name: "FOR ALL HOUSEHOLD MEMBERS",
                        is_subheader: true,
                        position: 6,
                        qcount: 10,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q1",
                            title:
                              "1.What is the name of the household member (start from the HH head)",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 1,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the name of the head",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid name to proceed.",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 1,
                              },
                            ],
                          },
                          {
                            qno: "Q2",
                            title:
                              "2. What is ___ ‘s relationship to HH head ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 2,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder:
                                  "Select the relationship to household head",
                                options: [
                                  "Head",
                                  "Spouse",
                                  "Son",
                                  "Daughter",
                                  "Stepson",
                                  "Stepdaughter",
                                  "Son-in-law",
                                  "Daughter-in-law",
                                  "Grandson",
                                  "Granddaughter",
                                  "Father",
                                  "Mother",
                                  "Brother",
                                  "Sister",
                                  "Uncle",
                                  "Aunt",
                                  "Nephew",
                                  "Niece",
                                  "Other relative",
                                  "Non-relative",
                                  "Boarder",
                                  "Domestic helper",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 2,
                              },
                            ],
                          },
                          {
                            qno: "Q3",
                            title: "3. Is ___ male or female ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 3,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select the gender",
                                options: ["Male", "Female"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select a gender to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 3,
                              },
                            ],
                          },
                          {
                            qno: "Q4",
                            title:
                              "4. How old is ___ as of his/her last birthday ?",
                            is_required: true,
                            is_read_only: false,
                            position: 4,
                            others_status: null,
                            qn_ranking: 4,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder:
                                  "Write the age as of last birthday",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid age to proceed",
                                keyboard_type: "number",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 4,
                              },
                            ],
                          },
                          {
                            qno: "Q5",
                            title: "5. When was ___ born ?",
                            is_required: true,
                            is_read_only: false,
                            position: 5,
                            others_status: null,
                            qn_ranking: 5,
                            answers: [
                              {
                                dtype: "age_picker",
                                position: 1,
                                placeholder: "MM/YYYY",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 5,
                              },
                            ],
                          },
                          {
                            qno: "Q6",
                            title: "6. Place of birth? ",
                            is_required: true,
                            is_read_only: false,
                            position: 6,
                            others_status: null,
                            qn_ranking: 6,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder:
                                  "Enter the Province or City/ Municipality",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid province to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 6,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "Enter the province",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid province to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 7,
                              },
                            ],
                          },
                          {
                            qno: "Q7",
                            title:
                              "7. Is ___ a Filipino? If not, what is ___’s nationality?",
                            is_required: true,
                            is_read_only: false,
                            position: 7,
                            others_status: null,
                            qn_ranking: 7,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: ["Filipino", "Non-Filipino"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Select the nationality to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 8,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "Enter the nationality",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Enter the nationality to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 9,
                              },
                            ],
                          },
                          {
                            qno: "Q8",
                            title: "8. What is ___’s current marital status ?",
                            is_required: true,
                            is_read_only: false,
                            position: 8,
                            others_status: null,
                            qn_ranking: 8,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Single",
                                  "Married",
                                  "Living-in",
                                  "Widowed",
                                  "Separated",
                                  "Divorced",
                                  "Unknown",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 10,
                              },
                            ],
                          },
                          {
                            qno: "Q9",
                            title: "9. What is the religion of ___ ?",
                            is_required: true,
                            is_read_only: false,
                            position: 9,
                            others_status: null,
                            qn_ranking: 9,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Roman Catholic",
                                  "Protestant",
                                  "Iglesia ni Cristo",
                                  "Aglipay",
                                  "Islam",
                                  "Hinduism",
                                  "Jehovah's Witnesses",
                                  "Seventh-Day Adventists",
                                  "Christian",
                                  "Other Christian",
                                  "No religion",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 11,
                              },
                            ],
                          },
                          {
                            qno: "Q10",
                            title:
                              "10. What is ___ ‘s ethnicity or is ___ a Tagalog, Bicolana, Bisaya, etc ?",
                            is_required: true,
                            is_read_only: false,
                            position: 10,
                            others_status: null,
                            qn_ranking: 10,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed.",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 12,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                _id: 2,
                page: [
                  {
                    category_name: "A. Demographic Characteristics",
                    position: 6,
                    page: 2,
                    section: [
                      {
                        section_name: "FOR 5 YRS & ABOVE",
                        is_subheader: false,
                        position: 7,
                        qcount: 1,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q11",
                            title:
                              "11. What is the highest level of education completed by ___?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 11,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "No education",
                                  "Pre-school",
                                  "Elementary level",
                                  "Elementary graduate",
                                  "High school level",
                                  "High school graduate",
                                  "Junior HS",
                                  "Junior HS graduate",
                                  "Senior HS level",
                                  "Senior HS graduate",
                                  "Vocational/Tech ",
                                  "College level",
                                  "College graduate",
                                  "Post-graduate",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 13,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        section_name: "FOR 3-24 YEARS OLD",
                        is_subheader: false,
                        position: 8,
                        qcount: 3,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q12",
                            title: "12. Is ___ currently enrolled ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 12,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: ["Yes, public", "Yes, private", "No"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 14,
                              },
                            ],
                          },
                          {
                            qno: "Q13",
                            title: "13. What type of school is  ___ on ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 13,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Pre-school",
                                  "Elementary",
                                  "Junior High School",
                                  "Senior High School",
                                  "Vocational/Technical",
                                  "College/University",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 15,
                              },
                            ],
                          },
                          {
                            qno: "Q14",
                            title:
                              "14. In what City / Municipality is ___ currently attending school?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 14,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 16,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    category_name: "B. Economic Activity",
                    position: 7,
                    page: 2,
                    section: [
                      {
                        section_name: "FOR 15 YEARS OLD AND ABOVE",
                        is_subheader: false,
                        position: 9,
                        qcount: 4,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q15",
                            title: "15.How much is ___’s monthly income?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 15,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "number",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 17,
                              },
                            ],
                          },
                          {
                            qno: "Q16",
                            title:
                              "16. What is the major source of  ___’s income ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 16,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Employment",
                                  "Business",
                                  "Remittance",
                                  "Investments",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 18,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 19,
                              },
                            ],
                          },
                          {
                            qno: "Q17",
                            title:
                              "17. What is the status of  ___’s work /business ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 17,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Permanent Work",
                                  "Casual Work",
                                  "Contractual Work",
                                  "Individually Owned Business",
                                  "Shared/Partnership Business",
                                  "Corporate Business",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 20,
                              },
                            ],
                          },
                          {
                            qno: "Q18",
                            title:
                              " 18. In what City / Municipality is ___’s work/business located ?",
                            is_required: true,
                            is_read_only: false,
                            position: 4,
                            others_status: null,
                            qn_ranking: 18,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 21,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                _id: 3,
                page: [
                  {
                    category_name: "C. Health Information",
                    position: 8,
                    page: 3,
                    section: [
                      {
                        section_name: "FOR 0 TO 11 MONTHS OLD",
                        is_subheader: false,
                        position: 10,
                        qcount: 3,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q19",
                            title: "19. Where was ___ delivered ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 19,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: [
                                  "Public hospital",
                                  "Private hospital",
                                  "Lying-in clinic",
                                  "Home",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 22,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 23,
                              },
                            ],
                          },
                          {
                            qno: "Q20",
                            title: "20. Who attended in the delivery of ___ ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 20,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: [
                                  "Doctor",
                                  "Nurse",
                                  "Midwife",
                                  "Hilot",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 24,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 25,
                              },
                            ],
                          },
                          {
                            qno: "Q21",
                            title:
                              "21. What is the last vaccine received by ___ ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 21,
                            answers: [
                              {
                                dtype: "textarea",
                                position: 1,
                                placeholder:
                                  "Enter the vaccine last received by the infant. Mother / Baby Book or Immunization card may be used as reference",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 26,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        section_name: "FOR WOMEN 10 TO 54 YEARS",
                        is_subheader: false,
                        position: 11,
                        qcount: 4,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q22",
                            title:
                              "22. How many pregnancies does ___  had ? How many children are still living?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 22,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Select the number of pregnancies",
                                options: [],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "number",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 27,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder:
                                  "How many are still living as time of interview",
                                options: [],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "number",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 28,
                              },
                            ],
                          },
                          {
                            qno: "Q23",
                            title:
                              "23. What family planning method does ___  and partner currently use ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 23,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: [
                                  "Female sterilization/Ligation",
                                  "Male sterilization/Vasectomy",
                                  "IUD",
                                  "Injectables",
                                  "Implants",
                                  "Pill",
                                  "Condom",
                                  "Modern natural FP",
                                  "Lactational Amenorrhea Method (LAM)",
                                  "Traditional",
                                  "Not Applicable",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 29,
                              },
                            ],
                          },
                          {
                            qno: "Q24",
                            title:
                              "24. If using FP, where did they obtain the FP ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 24,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: [
                                  "Government hospital",
                                  "RHU/Health center",
                                  "Brgy. Health Station",
                                  "Private hospital",
                                  "Pharmacy",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 30,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 31,
                              },
                            ],
                          },
                          {
                            qno: "Q25",
                            title:
                              "25. Does ____ and partner intend to use FP method ?",
                            is_required: true,
                            is_read_only: false,
                            position: 4,
                            others_status: null,
                            qn_ranking: 25,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: ["Yes", "No", "Not Applicable"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 32,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "FP method or reason",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 33,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                _id: 4,
                page: [
                  {
                    category_name: "C. Health Information",
                    position: 9,
                    page: 4,
                    section: [
                      {
                        section_name: "FOR ALL HOUSEHOLD MEMBERS",
                        is_subheader: true,
                        position: 12,
                        qcount: 4,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q26",
                            title:
                              "26. What is the primary health insurance ____ have ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 26,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select One",
                                options: [
                                  "PhilHealth paying member",
                                  "PhilHealth dependent of paying member",
                                  "PhilHealth indigent member",
                                  "PhilHealth dependent of indigent member",
                                  "GSIS",
                                  "SSS",
                                  "Private/HMO",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 34,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 35,
                              },
                            ],
                          },
                          {
                            qno: "Q27",
                            title:
                              "27. What facility did ____ visit in the past 12 months ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 27,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select One",
                                options: [
                                  "Government hospital",
                                  "RHU/Health center",
                                  "Brgy. Health Station",
                                  "Private hospital",
                                  "Private clinic",
                                  "Pharmacy",
                                  "Hilot/Herbalist",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 36,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 37,
                              },
                            ],
                          },
                          {
                            qno: "Q28",
                            title:
                              "28. What is the reason for the visit in health facility ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 28,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select One",
                                options: [
                                  "Sick/Injured",
                                  "Prenatal/Postnatal",
                                  "Gave birth",
                                  "Dental",
                                  "Medical check-up",
                                  "Medical requirement",
                                  "NHTS/CCT/4Ps requirement",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 38,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "For others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 39,
                              },
                            ],
                          },
                          {
                            qno: "Q29",
                            title:
                              "29. Does the household member have any disability/ies? What is the disability ?",
                            is_required: true,
                            is_read_only: false,
                            position: 4,
                            others_status: null,
                            qn_ranking: 29,
                            answers: [
                              {
                                dtype: "textarea",
                                position: 1,
                                placeholder:
                                  "If with disability, write the disability type, if no write none",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 40,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    category_name: "D. Socio-Civic Participation",
                    position: 10,
                    page: 4,
                    section: [
                      {
                        section_name: "FOR 10 & ABOVE",
                        is_subheader: false,
                        position: 13,
                        qcount: 1,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q30",
                            title:
                              "30. Is there a member of the HH that is a solo parent ? Is he/she registered ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 30,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select One",
                                options: [
                                  "Registered Solo parent",
                                  "Non-Solo Parent",
                                  "Unregistered Solo Parent",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 41,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        section_name: "FOR 60 & ABOVE",
                        is_subheader: false,
                        position: 14,
                        qcount: 1,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q31",
                            title: "31. Is ___ a registered senior citizen ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 31,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select One",
                                options: ["Yes", "No"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 42,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        section_name: "FOR 15 & ABOVE",
                        is_subheader: false,
                        position: 15,
                        qcount: 1,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q32",
                            title:
                              "32. In what barangay is ___ a registered voter ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 32,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the barangay",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 43,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                _id: 5,
                page: [
                  {
                    category_name: "E. Migration Information",
                    position: 11,
                    page: 5,
                    section: [
                      {
                        section_name: "FOR ALL HOUSEHOLD MEMBERS",
                        is_subheader: true,
                        position: 16,
                        qcount: 4,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q33",
                            title:
                              "33. In what City / Municipality did ____ reside  five years ago ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 33,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter city / Municipality",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 44,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "Enter barangay",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 45,
                              },
                            ],
                          },
                          {
                            qno: "Q34",
                            title:
                              "34. In what City / Municipality did ____ reside six months ago ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 34,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter city / Municipality",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 46,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "Enter barangay",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 47,
                              },
                            ],
                          },
                          {
                            qno: "Q35",
                            title:
                              "35. How long is ____ been staying in this barangay ? No. of years / No. of months ?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 35,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Select the number of years",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "number",
                                limitation: 4,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 48,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "Select the number of months",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "number",
                                limitation: 2,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 49,
                              },
                            ],
                          },
                          {
                            qno: "Q36",
                            title:
                              "36. Indicate if Non - migrant , Migrant or Transient ?",
                            is_required: true,
                            is_read_only: false,
                            position: 4,
                            others_status: null,
                            qn_ranking: 36,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Non-Migrant",
                                  "Migrant",
                                  "Transient",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 50,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        section_name: "FOR MIGRANTS AND TRANSIENTS",
                        is_subheader: false,
                        position: 17,
                        qcount: 2,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q37",
                            title:
                              "37. When did ____ transfer in the barangay ? MM / YYYY  ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 37,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "MM",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: "number",
                                limitation: 2,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 51,
                              },
                              {
                                dtype: "textbox",
                                position: 2,
                                placeholder: "YYYY",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: "number",
                                limitation: 4,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 52,
                              },
                            ],
                          },
                          {
                            qno: "Q38",
                            title:
                              "38. What are the reasons why ____ left his/her previous residence ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 38,
                            answers: [
                              {
                                dtype: "multiselectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Lack of employment",
                                  "Perception of better income in other place",
                                  "Schooling",
                                  "Presence of relatives and friends in other place",
                                  "Employment/Job Relocation",
                                  "Disaster-related Relocation",
                                  "Retirement",
                                  "To live with Parents",
                                  "To live with Children",
                                  "Marriage",
                                  "Annulment/Divorce/ Separation",
                                  "Commuting-related Reasons",
                                  "Health-related Reasons",
                                  "Peace and Security",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 53,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "Others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 54,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                _id: 6,
                page: [
                  {
                    category_name: "E. Migration Information",
                    position: 12,
                    page: 6,
                    section: [
                      {
                        section_name: "FOR MIGRANTS AND TRANSIENTS",
                        is_subheader: true,
                        position: 18,
                        qcount: 3,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q39",
                            title:
                              "39. Does ____ plan to return to previous residence ? When ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 39,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select Yes / No",
                                options: ["Yes", "No"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 55,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 56,
                              },
                              {
                                dtype: "other_datepicker",
                                position: 3,
                                placeholder: "Select date",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message: "Select a date to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 57,
                              },
                            ],
                          },
                          {
                            qno: "Q40",
                            title:
                              "40. What are the reasons why ____ transferred in this barangay?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 40,
                            answers: [
                              {
                                dtype: "multiselectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Availability of jobs",
                                  "Higher wage",
                                  "Presence of schools or universities",
                                  "Presence of relatives and friends in other place",
                                  "Housing",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 58,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "Others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 59,
                              },
                            ],
                          },
                          {
                            qno: "Q41",
                            title:
                              "41. Until when does ___ intend to stay in this barangay?",
                            is_required: true,
                            is_read_only: false,
                            position: 3,
                            others_status: null,
                            qn_ranking: 41,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 60,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    category_name: "F. Community Tax Certificate",
                    position: 13,
                    page: 6,
                    section: [
                      {
                        section_name: "FOR 18 & ABOVE",
                        is_subheader: true,
                        position: 19,
                        qcount: 2,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q42A",
                            title: "42 A. Does ___ have a valid CTC ?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 42,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select Yes / No",
                                options: ["Yes", "No"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 61,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "If no, enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 62,
                              },
                            ],
                          },
                          {
                            qno: "Q42B",
                            title:
                              "42 B. Was the CTC issued in this barangay ?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 43,
                            answers: [
                              {
                                dtype: "selectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: ["Yes", "No"],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select an option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 63,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    category_name: "G. Skill Development",
                    position: 14,
                    page: 6,
                    section: [
                      {
                        section_name: "FOR 15 & ABOVE",
                        is_subheader: true,
                        position: 20,
                        qcount: 2,
                        anscount: 0,
                        questions: [
                          {
                            qno: "Q43",
                            title:
                              "43. What type of skills development training is ____ interested to join in?",
                            is_required: true,
                            is_read_only: false,
                            position: 1,
                            others_status: null,
                            qn_ranking: 44,
                            answers: [
                              {
                                dtype: "textbox",
                                position: 1,
                                placeholder: "Enter the response",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 64,
                              },
                            ],
                          },
                          {
                            qno: "Q44",
                            title: "44. What type of skills do you have?",
                            is_required: true,
                            is_read_only: false,
                            position: 2,
                            others_status: null,
                            qn_ranking: 45,
                            answers: [
                              {
                                dtype: "multiselectbox",
                                position: 1,
                                placeholder: "Select one",
                                options: [
                                  "Refrigeration and Airconditioning",
                                  "Automotive/Heavy Equipment Servicing",
                                  "Metal Worker",
                                  "Building Wiring Installation",
                                  "Heavy Equipment Operation",
                                  "Plumbing",
                                  "Welding",
                                  "Carpentry",
                                  "Baking",
                                  "Dressmaking",
                                  "Linguist",
                                  "Computer Graphics",
                                  "Painting",
                                  "Beauty Care",
                                  "Commercial Cooking",
                                  "Housekeeping",
                                  "Massage Therapy",
                                  "Others",
                                ],
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please select atleast one option to proceed",
                                keyboard_type: null,
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 65,
                              },
                              {
                                dtype: "other_textbox",
                                position: 2,
                                placeholder: "Others",
                                options: null,
                                answer_value: null,
                                is_error: false,
                                error_message:
                                  "Please enter a valid answer to proceed",
                                keyboard_type: "text",
                                limitation: null,
                                show_dropdown_modal: null,
                                show_time_picker: null,
                                show_multi_dropdown_modal: null,
                                show_picker: null,
                                ranking: 66,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          });
          setData([...data]);
        }
      }
    }
  };
  //Person field on change text function
  const ChangeFunc = (text, index) => {
    let ch = data.map((it, ind) => {
      var temp = Object.assign({}, it);
      if (ind === index) {
        temp.member_name = text;
        setPersonError(false);
        return temp;
      } else {
        return temp;
      }
    });
    setData(ch);
  };

  //Next function with field validation
  const nextFunction = () => {
    var index = data.findIndex(
      (it) => it.member_name === "" || !validateSpace(it.member_name)
    );
    setPersonIndex(index);
    if (totalMembers === "") {
      setMembersError(true);
      setMembersErrorText(household_members.members_empty_error);
    } else if (totalMembers < 1) {
      setMembersError(true);
      setMembersErrorText(household_members.members_empty_error);
    } else if (totalMembers > household_members.member_limit) {
      setMembersError(true);
      setMembersErrorText(household_members.members_more_than_25);
    } else if (index !== -1) {
      setPersonError(true);
    } else {
      let household_data = {
        household_members: totalMembers,
        householdlist: data,
      };
      let members = [];
      data.forEach((item, index) => {
        members.push({
          member_id: index + 1,
          member_name: item.member_name,
          member_completed_status: 0,
        });
      });

      dispatch(household_info(household_data));
      dispatch(survey_b_members(members));
      navigation.navigate(navigation_screens.SurveyFormPartB, {
        user: 0,
        no: 0,
      });
    }
  };

  const onChangeHouseholdCount = (num) => {
    setTotalMembers(allownumonly(num));
    setMembersError(false);
  };
  const inputRef = useRef([]);

  const lastIndex = data.length - 1;

  //Text input field on submit editing
  const onSubmitEditing = (index) => {
    console.log("onSubmitEditing", index);
    if (index !== lastIndex) {
      inputRef.current[index + 1].focus();
    } else {
    }
  };

  const onPauseCancel = () => {
    console.log("onPauseCancel");
    setPauseModel(false);
  };

  const onProceedBtn = async () => {
    let part_a = [...survey_part_a_data];
    let time_end = part_a[1].section[0].questions[3].answers[0].answer_value;
    let date_next_visit =
      part_a[1].section[0].questions[5].answers[0].answer_value;
    let result = part_a[1].section[0].questions[4].answers[0].answer_value;
    if (time_end === null) {
      part_a[1].section[0].questions[3].answers[0].is_error = true;
    } else if (result === null) {
      part_a[1].section[0].questions[4].answers[0].is_error = true;
    } else if (date_next_visit == null) {
      part_a[1].section[0].questions[5].answers[0].is_error = true;
    } else {
      setPauseModel(false);
      setTimeout(async () => {
        SetLoading(true);
        let survey_num =
          survey_initialData.section[0].questions[0].answers[0].answer_value;
        let data = {
          ...surveyInputData,
          survey_number: survey_num,
          mobile_next_section: {
            page: "household",
            no: 0,
          },
          initial_section: survey_initialData,
          status: "survey_ongoing",
          members: [],
          household_member_count: 0,
          interview_section: survey_part_a_data,
          house_hold_member_section: householdlist,
          final_section: survey_part_c_data,
        };
        let entry_dummy_request = {
          mb_local: data,
        };
        let js = JSON.stringify(entry_dummy_request);
        setSurveyDetails(`${survey_num}`, js);
        SetLoading(false);
        navigation.navigate(navigation_screens.MainScreens);
      }, 500);
    }
    dispatch(survey_a_data(part_a));
  };

  const pausePress = async () => {
    setPauseModel(true);
  };
  let survey_num =
    survey_initialData.section[0].questions[0].answers[0].answer_value;
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Header
        survey_num={survey_num}
        onNotesPress={() => navigation.navigate(navigation_screens.Notes)}
        onPausePress={() => {
          pausePress();
        }}
      />
      <View>
        <Text style={styles.question}>{household_members.title}</Text>
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view}
      >
        <View style={styles.field_parent_view}>
          <FieldTitle fieldTitle={household_members.field_title} />
          <TouchableOpacity>
            <CustomTextInputField
              handleInputChange={(num) => {
                onChangeHouseholdCount(num);
              }}
              value={totalMembers}
              keyboardType="numeric"
              is_error={membersError}
              errorText={membersErrorText}
              onSubmitEditing={onClickProceed}
              textInputRef={number_input}
            />
          </TouchableOpacity>
          {personField ? (
            <View>
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <FieldTitle fieldTitle={`Person ${item.member_id}`} />
                      <CustomTextInputField
                        handleInputChange={(text) => {
                          ChangeFunc(text, index);
                        }}
                        value={item.member_name}
                        is_error={index === personIndex ? personError : false}
                        errorText={household_members.name_error_text}
                        textInputRef={(input) => {
                          inputRef.current[index] = input;
                        }}
                        onSubmitEditing={() => onSubmitEditing(index)}
                        returnKeyType={index === lastIndex ? "done" : "next"}
                        blurOnSubmit={index === lastIndex ? true : false}
                      />
                    </>
                  );
                }}
                keyExtractor={(item) => item.member_id}
              />
            </View>
          ) : (
            <View style={styles.proceed_button_view}>
              <TouchableOpacity
                style={styles.proceed_button}
                onPress={onClickProceed}
              >
                <Text style={styles.proceed_button_text}>
                  {household_members.proceed}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <PauseSurvey
          isVisible={PauseModel}
          OnCancel={onPauseCancel}
          onProcced={onProceedBtn}
          TimeError={part_a[1].section[0].questions[3].answers[0].is_error}
          DateError={part_a[1].section[0].questions[5].answers[0].is_error}
          ResultError={part_a[1].section[0].questions[4].answers[0].is_error}
          time_data={part_a[1].section[0].questions[3].answers[0].answer_value}
          date_data={part_a[1].section[0].questions[5].answers[0].answer_value}
          result_data={
            part_a[1].section[0].questions[4].answers[0].answer_value
          }
          time_error_message={
            part_a[1].section[0].questions[3].answers[0].error_message
          }
          result_error_message={
            part_a[1].section[0].questions[4].answers[0].error_message
          }
          date_error_message={
            part_a[1].section[0].questions[5].answers[0].error_message
          }
          onTimeChange={(res) => {
            let time = moment(res).format("LT");
            console.log("time", time);
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[3].answers[0].answer_value = time;
            part_a[1].section[0].questions[3].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
          onDateChange={(res) => {
            console.log("date", res);
            let date = moment(res).format("DD/MM/YYYY");
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[5].answers[0].answer_value = date;
            part_a[1].section[0].questions[5].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
          onResultChange={(result) => {
            console.log("result", result);
            let part_a = [...survey_part_a_data];
            part_a[1].section[0].questions[4].answers[0].answer_value = result;
            part_a[1].section[0].questions[4].answers[0].is_error = false;

            dispatch(survey_a_data(part_a));
          }}
        />
      </KeyboardAwareScrollView>

      <Footer
        onPressPreviousButton={() =>
          navigation.navigate(navigation_screens.SurveyFormPartA, { no: 2 })
        }
        onPressNextButton={nextFunction}
        next_disabled={nextButtonDisable}
      />
    </View>
  );
};

export default HouseholdMembers;
