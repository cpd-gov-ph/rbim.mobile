import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList, TextInput } from "react-native";
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import Colors from "../../themes/colors"; // Themes
import styles from "./home.styles"; // Survey details styles
import SurveyCard from "../../components/card/SurveyCard"; // Custom survey card component
import Loader from "../../utils/Loader"; // Custom loader
import { RecorrectionSurveyDetailAPI } from "../../network/SurveyApi"; // API call
import { getSurveyQuestions, getSurveyDetails } from "../../utils/localStorage"; // Local storage data
import { navigation_screens, storage_key } from "../../strings"; // Strings
import {
  household_info,
  recorrection_household_info,
  recorrection_initital_section,
  recorrection_overall_data,
  recorrection_survey_a_data,
  recorrection_survey_b_data,
  recorrection_survey_c_data,
  recorrection_survey_notes,
  recorrection_survey_signature,
  survey_a_data,
  survey_b_members,
  survey_c_data,
  survey_initial_section,
  survey_notes,
} from "../../store/actions/surveyActions"; // Survey actions

const SurveyDetails = ({ route, navigation }) => {
  const { status } = route.params;
  const [loading, SetLoading] = useState(false);
  const { on_going_payload, recorrection_payload } = route.params;

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(""); // Search text state
  const [filteredOnGoingData, setFilteredOnGoingData] =
    useState(on_going_payload);
  const [filteredRecorrectionData, setFilteredRecorrectionData] =
    useState(recorrection_payload);
  const [rank_array, setRank_array] = useState([]);
  const [qn_rank_array, setQn_rank_array] = useState([]);
  const [qn_rank_array_c, setQn_rank_array_c] = useState([]);
  const [rank_array_c, setRank_array_c] = useState([]);
  const [page_0_loading, setPage_0_loading] = useState(false);
  const [recorrection_loading,setRecorrection_loading] = useState(false);

  //Item Separator for survey FlatList
  const FlatListItemSeparator = () => {
    return <View style={styles().listItemSeparator} />;
  };

  const ListHeaderComponent = () => {
    //List Title
    return (
      <View style={styles().statusTitleView}>
        <Text style={styles().sectionTitle}>
          {status === "survey_ongoing"
            ? "Ongoing survey"
            : status === "survey_recorrection"
            ? "Recorrection survey"
            : null}
        </Text>
      </View>
    );
  };

  const searchFunc = (text) => {
    if (status === "survey_recorrection") {
      if (text) {
        const newData = recorrection_payload.filter(function (item) {
          return item.survey_number.indexOf(text) > -1;
        });
        setFilteredRecorrectionData(newData);
      } else {
        setFilteredRecorrectionData(recorrection_payload);
      }
    } else {
      if (text) {
        const newOngoingData = on_going_payload.filter(function (item) {
          return item.indexOf(text) > -1;
        });
        setFilteredOnGoingData(newOngoingData);
      } else {
        setFilteredOnGoingData(on_going_payload);
      }
    }
  };

  const onGoingSurvey = (item, index) => {
    setPage_0_loading(true);
    getSurveyDetails(`${item}`)
      .then((response) => {
        let json = JSON.parse(response);
        console.log("REsp", response);
        getNavigationDetailsPage(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNavigationDetailsPage = (item) => {
    getSurveyQuestions(storage_key.survey_questions)
      .then((res) => {
        let form_data = JSON.parse(res);
        if (item.mb_local.mobile_next_section.page === "page0") {
          let initial_section = item.mb_local.initial_section;
          dispatch(survey_initial_section(initial_section));

          let surveyData = form_data.data.interview_section;
          surveyData.forEach((res_sec) => {
            res_sec.section.forEach((res_qus) => {
              res_qus.questions.forEach((res_ans, index) => {
                qn_rank_array.push(index);
                setQn_rank_array([...qn_rank_array]);
                if (qn_rank_array.length !== 0) {
                  for (let i = 1; i <= qn_rank_array.length; i++) {
                    res_ans.qn_ranking = i;
                  }
                }
                res_ans.answers.forEach((ans, ans_ind) => {
                  rank_array.push(ans_ind);
                  setRank_array([...rank_array]);
                  if (rank_array.length !== 0) {
                    for (let i = 1; i <= rank_array.length; i++) {
                      res_ans.answers[0].ranking = i;
                    }
                  }
                });
              });
            });
          });

          let surveyDataC = form_data.data.final_section;
          surveyDataC.forEach((res_sec) => {
            res_sec.section.forEach((res_qus) => {
              res_qus.questions.forEach((res_ans, index) => {
                qn_rank_array_c.push(index);
                setQn_rank_array_c([...qn_rank_array_c]);
                if (qn_rank_array_c.length !== 0) {
                  for (let i = 1; i <= qn_rank_array_c.length; i++) {
                    res_ans.qn_ranking = i;
                  }
                }

                res_ans.answers.forEach((ans, ans_ind) => {
                  rank_array_c.push(ans_ind);
                  setRank_array_c([...rank_array_c]);
                  if (rank_array_c.length !== 0) {
                    for (let i = 1; i <= rank_array_c.length; i++) {
                      res_ans.answers[ans_ind].ranking = i;
                    }
                  }
                });
              });
            });
          });

          dispatch(survey_a_data(surveyData));
          dispatch(survey_c_data(surveyDataC));
          setTimeout(() => {
            setPage_0_loading(false);
            navigation.navigate(navigation_screens.SurveyFormPartA, {
              no: 0,
            });
          }, 500);
        } else if (item.mb_local.mobile_next_section.page === "page1") {
          let initial_section = item.mb_local.initial_section;
          let pageNo = item.mb_local.mobile_next_section.no;

          dispatch(survey_initial_section(initial_section));
          let interview_section = item.mb_local.interview_section;
          dispatch(survey_a_data(interview_section));
          dispatch(survey_c_data(item.mb_local.final_section));
          setTimeout(() => {
            setPage_0_loading(false);
            navigation.navigate(navigation_screens.SurveyFormPartA, {
              no: pageNo,
            });
          }, 500);
        } else if (item.mb_local.mobile_next_section.page === "household") {
          let interview_section = item.mb_local.interview_section;
          let initial_section = item.mb_local.initial_section;

          dispatch(survey_a_data(interview_section));
          dispatch(survey_initial_section(initial_section));
          dispatch(survey_c_data(item.mb_local.final_section));
          setTimeout(() => {
            setPage_0_loading(false);
            navigation.navigate(navigation_screens.HouseholdMembers);
          }, 500);
        } else if (item.mb_local.mobile_next_section.page === "page2") {
          let initial_section = item.mb_local.initial_section;
          dispatch(survey_initial_section(initial_section));
          let interview_section = item.mb_local.interview_section;
          dispatch(survey_a_data(interview_section));
          let household_data = {
            household_members: item.mb_local.house_hold_member_section.length,
            householdlist: item.mb_local.house_hold_member_section,
          };
          dispatch(household_info(household_data));
          dispatch(survey_c_data(item.mb_local.final_section));
          setTimeout(() => {
            setPage_0_loading(false);
            navigation.navigate(navigation_screens.SurveyFormPartB, {
              user: item.mb_local.mobile_next_section.user,
              no: item.mb_local.mobile_next_section.no,
            });
          }, 500);
        } else if (item.mb_local.mobile_next_section.page === "page3") {
          let initial_section = item.mb_local.initial_section;
          dispatch(survey_initial_section(initial_section));
          let interview_section = item.mb_local.interview_section;
          dispatch(survey_a_data(interview_section));
          let household_data = {
            household_members: item.mb_local.house_hold_member_section.length,
            householdlist: item.mb_local.house_hold_member_section,
          };
          dispatch(household_info(household_data));
          let final_section = item.mb_local.final_section;
          dispatch(survey_c_data(final_section));
          setTimeout(() => {
            setPage_0_loading(false);
            navigation.navigate(navigation_screens.SurveyFormPartC, {
              no: item.mb_local.mobile_next_section.no,
            });
          }, 500);
        }

        if (item.mb_local.members) {
          dispatch(survey_b_members(item.mb_local.members));
        }
        if (item.mb_local?.notes) {
          dispatch(survey_notes(item.mb_local?.notes));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OnRecorrectionDetail = (item) => {
    setRecorrection_loading(true);
    dispatch(recorrection_survey_a_data(item.interview_section));
    dispatch(recorrection_survey_b_data(item.house_hold_member_section));
    dispatch(recorrection_survey_c_data(item.final_section));
    dispatch(recorrection_initital_section(item.initial_section));
    dispatch(recorrection_survey_signature(item.data_collector_signature));
    dispatch(recorrection_overall_data(item));
    let notes = item.notes;
    dispatch(recorrection_survey_notes(notes === null ? "" : notes));

    let household_data = {
      household_members: item.household_member_count,
      householdlist: item.house_hold_member_section,
    };
    dispatch(recorrection_household_info(household_data));
    setTimeout(() => {
      setRecorrection_loading(false);
      setTimeout(() =>{
        navigation.navigate(navigation_screens.RecorrectionSurveyNumber);
      },100)
    }, 500);
  };


  //----------- Render Item view for OnGoing Survey List
  const SurveyView = (item) => {
    return (
      <SurveyCard
        survey_id={status === "survey_recorrection" ? item.survey_number : item}
        onCardPress={() => {
          status === "survey_recorrection"
            ? OnRecorrectionDetail(item)
            : status === "survey_ongoing"
            ? onGoingSurvey(item)
            : null;
        }}
        type={1}
      />
    );
  };
  const NoData = (item) => {
    return (
      <View style={styles().empty_component}>
        <Text style={styles().list_empty_text}>No data found</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles().container, styles().scroll_container]}>
      <Loader loading={loading} />
      <Loader loading={page_0_loading} />
      <Loader loading={recorrection_loading} />
      <View style={styles().searchBar}>
        <View style={styles().searchIconView}>
          <FastImage
            source={Images.search}
            style={styles().searchIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles().textInputView}>
          <TextInput
            style={styles().searchTextInput}
            placeholder={"Search"}
            placeholderTextColor={Colors.placeHolderColor}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchFunc(text);
            }}
            keyboardType={"numeric"}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles().flatListHeight}
        data={
          status === "survey_recorrection"
            ? filteredRecorrectionData
            : filteredOnGoingData
        }
        ListEmptyComponent={({ item }) => NoData(item)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({ item }) => SurveyView(item)}
      />
    </SafeAreaView>
  );
};

export default SurveyDetails;
