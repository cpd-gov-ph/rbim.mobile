import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  NativeModules,
  AppRegistry,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import PushNotification from "react-native-push-notification"; // For Push notification
import AsyncStorage from "@react-native-async-storage/async-storage"; //For local storage
import BackgroundService from "react-native-background-actions"; // For running background tasks forever
import styles from "./home.styles"; // Home styles
import SurveyCard from "../../components/card/SurveyCard"; // Custom survey card component
import Colors from "../../themes/colors"; // Themes
import {
  getOngoingSurveyDetails,
  getOnSyncReCorrectionData,
  getOnSyncSurveyDetails,
  getSurveyDetails,
  getSurveyQuestions,
  getUserInformation,
  setOngoingSurveyDetails,
} from "../../utils/localStorage"; // Local storage data
import { home_text, navigation_screens, storage_key } from "../../strings"; //Strings
import { AssignedTaskAPI, SurveyListAPI } from "../../network/HomeApi"; // API call
import Loader from "../../utils/Loader"; // Custom loader
import { isEmpty, isResponseIsValid } from "../../utils/helpers"; // Helper functions
import { SurveyQuestionsAPI } from "../../network/AuthApi"; // API call
import {
  household_info,
  on_going_list,
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
  survey_submit_success,
  user_id,
} from "../../store/actions/surveyActions"; // Survey action
import {
  BoardCastListener,
  RecorrectionSyncLoading,
  SyncLoading,
} from "../../store/actions/syncAction"; // Sync action
import { LegalDocAPI, ProfileViewAPI } from "../../network/ProfileApi"; // API call
import CheckConnection from "../../utils/CheckConnection"; // To check internet connection
import {
  onSyncRecorrectionSurveyAPICall,
  onSyncSurveyAPICall,
} from "../../network/SyncAPI"; //API call
import { NotificationCountAPI } from "../../network/NotificationApi"; // API call

const Home = ({ navigation }) => {
  const [loading, SetLoading] = useState(false);
  const [ongoingList1, SetOngoingList1] = useState([]);
  const [unSyncList, SetUnSyncList] = useState([]);
  const [recorrectionUnSyncList, SetRecorrectionUnSyncList] = useState([]);

  const dispatch = useDispatch();
  const task_loader = useSelector(
    // assigned task api progress loader
    (state) => state?.homeReducer?.assigned_task_loading
  );
  const task_data = useSelector(
    // assigned task data
    (state) => state?.homeReducer?.assigned_task_response
  );

  const survey_list = useSelector(
    // survey list data
    (state) => state?.homeReducer?.survey_list
  );
  const recorrection_survey_a_loader = useSelector(
    (state) => state?.surveyReducer?.recorrection_survey_a_loading
  );
  const broad_cast = useSelector(
    (state) => state?.syncReducer?.broad_cast_listener
  );
  const isSyncLoading = useSelector(
    (state) => state?.syncReducer?.is_sync_loading
  );
  const isRecorrectionSyncLoading = useSelector(
    (state) => state?.syncReducer?.is_recorrection_sync_loadign
  );

  const [rank_array, setRank_array] = useState([]);
  const [qn_rank_array, setQn_rank_array] = useState([]);
  const [qn_rank_array_c, setQn_rank_array_c] = useState([]);
  const [rank_array_c, setRank_array_c] = useState([]);
  const [page_0_loading, setPage_0_loading] = useState(false);
  const [recorrection_loading,setRecorrection_loading] = useState(false);

  const singlePromise = async (survey_num, user_id) => {
    let survey_response = await AsyncStorage.getItem(survey_num);
    let survey_details = JSON.parse(survey_response);
    let survey_info = survey_details.mb_local;
    onCallSinglePromiseApi(survey_num, survey_info, user_id);
  };

  const onCallSinglePromiseApi = async (survey_num, survey_info, user_id) => {
    const response = await onSyncSurveyAPICall(survey_info);
    if (isResponseIsValid(response)) {
      setTimeout(async () => {
        await AsyncStorage.removeItem(survey_num);
        let survey_unSync_list = await AsyncStorage.getItem(user_id);
        let arr = JSON.parse(survey_unSync_list);
        let filter = arr.filter((item) => item !== `${survey_num}`);
        let js = JSON.stringify(filter);
        if (filter.length === 0) {
          dispatch(SyncLoading(3));
          await BackgroundService.stop();
        }
        console.log("filter-->", filter);
        SetUnSyncList(filter);
        setOngoingSurveyDetails(user_id, js);
      }, Math.random() * 1000);
    } else {
      console.log("Error Message", response);
      showNotification(response?.data);
      dispatch(SyncLoading(0));
      await BackgroundService.stop();
    }
  };

  const veryIntensiveTask = () => {
    getUserInformation(storage_key.user_information)
      .then((res) => {
        let payload_info = JSON.parse(res);
        let id1 = storage_key.survey_unSync + payload_info.id;

        setTimeout(() => {
          getOnSyncSurveyDetails(id1)
            .then(async (res) => {
              let unSync = JSON.parse(res);
              if (unSync !== null) {
                if (unSync.length > 0) {
                  for (const element of unSync) {
                    await singlePromise(element, id1);
                  }
                  console.log("singlePromise");
                } else {
                  BackgroundService.stop();
                }
              } else {
                BackgroundService.stop();
              }
            })
            .catch((err) => {
              dispatch(SyncLoading(0));
              BackgroundService.stop();
              console.log(err);
            });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  };

  const showNotification = (message) => {
    PushNotification.localNotification({
      title: "RBIM",
      message: message,
      channelId: "rbim-id",
    });
  };
  const InternetReceiverAction = async (data) => {
    console.log("InternetReceiverAction data.Internet", data.Internet);
    getUserInformation(storage_key.user_information)
      .then((res) => {
        let payload_info = JSON.parse(res);
        let id1 = storage_key.survey_unSync + payload_info.id;
        let id2 = storage_key.survey_reCorrection + payload_info.id;

        dispatch(user_id(payload_info.id));
        getOnSyncSurveyDetails(id1)
          .then((res) => {
            getOnSyncReCorrectionData(id2)
              .then((recorrection_res) => {
                let recorrection_unsync = JSON.parse(recorrection_res);

                let unsync = JSON.parse(res);
                console.log("recorrection_unsync", recorrection_unsync);
                console.log("Unsync Data", unsync);
                if (data.Internet === "Internet On" && unsync !== null) {
                  if (unsync.length > 0) {
                    toggleBackgroundSyncSurvey();
                  } else if (
                    data.Internet === "Internet On" &&
                    recorrection_unsync !== null
                  ) {
                    console.log("recorrection_unsync-2", recorrection_unsync);
                    if (recorrection_unsync.length > 0) {
                      toggleBackgroundSyncSurvey1();
                    }
                  }
                } else if (
                  data.Internet === "Internet On" &&
                  recorrection_unsync !== null
                ) {
                  console.log("recorrection_unsync-2", recorrection_unsync);
                  if (recorrection_unsync.length > 0) {
                    toggleBackgroundSyncSurvey1();
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AppRegistry.registerHeadlessTask("Heartbeat", () => InternetReceiverAction);
    navigation.addListener("focus", () => {
      SyncAPI(broad_cast);
      dispatch(survey_submit_success([]));
      dispatch(NotificationCountAPI());
      dispatch(SurveyQuestionsAPI());
      dispatch(AssignedTaskAPI());
      dispatch(SurveyListAPI());
      dispatch(ProfileViewAPI());
      dispatch(LegalDocAPI());
      setTimeout(() => {
        getSurveyQuestions(storage_key.survey_questions)
          .then((res) => {
            let form_data = JSON.parse(res);
            dispatch(survey_initial_section(form_data.data.initial_section));
            getUserInformation(storage_key.user_information)
              .then((res) => {
                let payload_info = JSON.parse(res);
                let id = storage_key.survey_ongoing + payload_info.id;
                let id1 = storage_key.survey_unSync + payload_info.id;
                let id2 = storage_key.survey_reCorrection + payload_info.id;
                console.log("payload_info", id);
                dispatch(user_id(payload_info.id));
                setTimeout(() => {
                  getOngoingSurveyDetails(id)
                    .then((res) => {
                      let ongoingList = JSON.parse(res);
                      if (ongoingList !== null) {
                        SetOngoingList1(ongoingList);
                        dispatch(on_going_list(ongoingList));
                      }
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });
                  getOnSyncSurveyDetails(id1)
                    .then((res) => {
                      let unsync = JSON.parse(res);

                      if (unsync != null) {
                        SetUnSyncList(unsync);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  getOnSyncReCorrectionData(id2)
                    .then((res) => {
                      let recorrection_unsync = JSON.parse(res);
                      if (recorrection_unsync != null) {
                        SetRecorrectionUnSyncList(recorrection_unsync);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }, 100);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 0);
    });
  }, []);

  //Item Separator for survey FlatList
  const FlatListItemSeparator = () => {
    return <View style={styles().listItemSeparator} />;
  };
  //Unsync survey Manual Sync OnPress
  const manualSyncOnPress = async () => {
    console.log("manual");
    toggleBackgroundSyncSurvey();
  };
  const manualSyncOnPress1 = async () => {
    console.log("manual");
    toggleBackgroundSyncSurvey1();
  };

  // Header shown while uploading the video
  const toggleBackgroundSyncSurvey = async () => {
    dispatch(SyncLoading(2));

    try {
      const options = {
        taskName: "RBIM",
        taskTitle: "Uploading Survey",
        taskDesc: "",
        taskIcon: {
          name: "ic_launcher",
          type: "mipmap",
        },
        color: "#000",
        parameters: {
          delay: 0,
        },
        progressBar: {
          indeterminate: true,
        },
        linkingURI: "yourSchemeHere://chat/jane", // See Deep Linking for more info
      };

      console.log("Trying to start background service");
      await BackgroundService.start(veryIntensiveTask, options);
      console.log("Successful start! from Network Back");
    } catch (e) {
      console.log("Error", e);
    }
  };
  const toggleBackgroundSyncSurvey1 = async () => {
    dispatch(RecorrectionSyncLoading(2));

    try {
      const options = {
        taskName: "RBIM",
        taskTitle: "Uploading Recorrection Survey",
        taskDesc: "",
        taskIcon: {
          name: "ic_launcher",
          type: "mipmap",
        },
        color: "#000",
        parameters: {
          delay: 0,
        },
        progressBar: {
          indeterminate: true,
        },
        linkingURI: "yourSchemeHere://chat/jane", // See Deep Linking for more info
      };

      console.log("Trying to start recorrection background service");
      await BackgroundService.start(veryIntensiveTask1, options);
      console.log("Successful start recorrection! from Network Back");
    } catch (e) {
      console.log("Error", e);
    }
  };

  const veryIntensiveTask1 = () => {
    getUserInformation(storage_key.user_information)
      .then((res) => {
        let payload_info = JSON.parse(res);
        let id2 = storage_key.survey_reCorrection + payload_info.id;
        setTimeout(() => {
          getOnSyncReCorrectionData(id2)
            .then(async (res) => {
              let recorrection_unsync = JSON.parse(res);
              if (recorrection_unsync !== null) {
                if (recorrection_unsync.length > 0) {
                  for (const element of recorrection_unsync) {
                    await singlePromise1(element, id2);
                  }
                  console.log("singlePromise");
                } else {
                  BackgroundService.stop();
                }
              } else {
                BackgroundService.stop();
              }
            })
            .catch((err) => {
              dispatch(RecorrectionSyncLoading(0));
              BackgroundService.stop();
              console.log(err);
            });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const singlePromise1 = async (survey_num, user_id) => {
    let survey_response = await AsyncStorage.getItem(survey_num);
    let survey_details = JSON.parse(survey_response);
    let survey_info = survey_details.mb_local;
    onCallSinglePromiseApi1(survey_num, survey_info, user_id);
  };

  const onCallSinglePromiseApi1 = async (survey_num, survey_info, user_id) => {
    const response = await onSyncRecorrectionSurveyAPICall(survey_info);
    if (isResponseIsValid(response)) {
      showNotification(
        "Recorrection Survey Number " + survey_num + " synced successfully"
      );
      setTimeout(async () => {
        await AsyncStorage.removeItem(survey_num);
        let survey_unSync_recorrection_list = await AsyncStorage.getItem(
          user_id
        );
        let arr = JSON.parse(survey_unSync_recorrection_list);
        let filter = arr.filter((item) => item !== `${survey_num}`);
        let js = JSON.stringify(filter);
        if (filter.length === 0) {
          dispatch(RecorrectionSyncLoading(3));
          await BackgroundService.stop();
        }
        console.log("filter-->", filter);
        SetRecorrectionUnSyncList(filter);
        setOngoingSurveyDetails(user_id, js);
      }, Math.random() * 1000);
    } else {
      console.log("Error Message", response.data);
      showNotification(response?.data);
      dispatch(RecorrectionSyncLoading(0));
      await BackgroundService.stop();
    }
  };

  //Task notification view
  const TaskView = ({ task_data }) => {
    return (
      <View style={styles().task_notification_card}>
        <Text style={styles().taskTitle}>{home_text.task}</Text>
        <Text style={styles().taskSubTitle}>{task_data.title}</Text>
        <Text style={styles().taskDescription}>{task_data.description}</Text>
      </View>
    );
  };

  const assignedTask = () => {
    if (task_data.total_task_count > 0) {
      navigation.navigate(navigation_screens.AssignedTask); //For AssignedTask
    }
    console.log("assignedTask");
  };
  // Show more OnPress
  const ongoingNavigation = () => {
    navigation.navigate(navigation_screens.OngoingSurvey, {
      status: "survey_ongoing",
      on_going_payload: ongoingList1,
    }); //For OnGoing survey
  };
  const reCorrectionNavigation = () => {
    navigation.navigate(navigation_screens.RecorrectionSurvey, {
      status: "survey_recorrection",
      recorrection_payload: survey_list,
    }); // For ReCorrection survey
  };

  const OnRecorrectionDetail = (item) => {
    setRecorrection_loading(true);
    console.log("item.id", item.id);
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
      // navigation.navigate(navigation_screens.RecorrectionSurveyNumber);
      setRecorrection_loading(false);
      setTimeout(() =>{
        navigation.navigate(navigation_screens.RecorrectionSurveyNumber);
      },100)
    }, 500);
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
        console.log(JSON.stringify(item.mb_local), "item data");
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

  const SyncAPI = async (broad_cast) => {
    console.log("HomeTab----->", broad_cast);
    NativeModules.Heartbeat.startService();
    if (broad_cast === "0") {
      dispatch(BoardCastListener("1"));
    }
  };
  const is_network = CheckConnection();
  console.log("is_network", is_network);
  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={loading} />
      <Loader loading={task_loader} />
      <Loader loading={recorrection_survey_a_loader} />
      <Loader loading={page_0_loading} />
      <Loader loading={recorrection_loading} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles().scroll_container}
      >
        {!isEmpty(task_data.recent_task) ? (
          <TaskView task_data={task_data.recent_task} />
        ) : null}
        <>
          <View>
            <View style={styles().titleView}>
              <Text style={styles().sectionTitle}>{"Ongoing survey"}</Text>
              <TouchableOpacity onPress={ongoingNavigation}>
                <Text style={styles().showMore}> {"Show more"}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={ongoingList1}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <SurveyCard
                      survey_id={item}
                      onCardPress={() => {
                        onGoingSurvey(item, index);
                      }}
                    />
                    <View style={styles().listItemSeparator} />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />

            <View style={styles().titleView}>
              <Text style={styles().sectionTitle}>{"Unsync survey"}</Text>
              {isSyncLoading === 3 && is_network && unSyncList.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    manualSyncOnPress();
                  }}
                >
                  <Text style={styles().showMore}> {"Manual Sync"}</Text>
                </TouchableOpacity>
              ) : isSyncLoading === 0 && is_network && unSyncList.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    manualSyncOnPress();
                  }}
                >
                  <Text style={styles().showMore}> {"Manual Sync"}</Text>
                </TouchableOpacity>
              ) : isSyncLoading === 2 ? (
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text style={styles().syncView}> {"Syncing  "}</Text>
                  <ActivityIndicator
                    size="small"
                    color={Colors.appBackgroundColorSecondary}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <FlatList
              // data={survey_list?.ongoing}
              data={unSyncList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <SurveyCard
                      survey_id={item}
                      onCardPress={() => {
                        onGoingSurvey(item, index);
                      }}
                      type={2}
                    />
                    <View style={styles().listItemSeparator} />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
            <View style={styles().titleView}>
              <Text style={styles().sectionTitle}>
                {"Recorrection Unsync survey"}
              </Text>
              {isRecorrectionSyncLoading === 3 &&
              is_network &&
              recorrectionUnSyncList.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    manualSyncOnPress1();
                  }}
                >
                  <Text style={styles().showMore}> {"Manual Sync"}</Text>
                </TouchableOpacity>
              ) : isRecorrectionSyncLoading === 0 &&
                is_network &&
                recorrectionUnSyncList.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    manualSyncOnPress1();
                  }}
                >
                  <Text style={styles().showMore}> {"Manual Sync"}</Text>
                </TouchableOpacity>
              ) : isRecorrectionSyncLoading === 2 ? (
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text style={styles().syncView}> {"Syncing  "}</Text>
                  <ActivityIndicator
                    size="small"
                    color={Colors.appBackgroundColorSecondary}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <FlatList
              data={recorrectionUnSyncList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <SurveyCard
                      survey_id={item}
                      onCardPress={() => {
                        onGoingSurvey(item, index);
                      }}
                      type={2}
                    />
                    <View style={styles().listItemSeparator} />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />

            <View style={styles().titleView}>
              <Text style={styles().sectionTitle}>{"Recorrection survey"}</Text>
              <TouchableOpacity onPress={reCorrectionNavigation}>
                <Text style={styles().showMore}> {"Show more"}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={survey_list}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <SurveyCard
                      survey_id={item.survey_number}
                      onCardPress={() => {
                        OnRecorrectionDetail(item);
                      }}
                    />
                    <View style={styles().listItemSeparator} />
                  </View>
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </>

        <View style={styles().assigned_task_view}>
          <Text style={styles().sectionTitle}>{home_text.assignedTasks}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles().assigned_task_box}
            onPress={assignedTask}
          >
            <Text style={styles().no_of_task} numberOfLines={1}>
              {home_text.noOfTasks}
            </Text>
            <View style={styles().num_view}>
              <Text style={styles().task_count} numberOfLines={1}>
                {task_data.total_task_count == undefined
                  ? "0"
                  : task_data.total_task_count}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
