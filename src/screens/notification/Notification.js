import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import { ActivityIndicator } from "react-native-paper"; // UI elements
import {
  NotificationAPI,
  NotificationClearAllAPI,
} from "../../network/NotificationApi"; // API call
import styles from "./notification.style"; // Notification styles
import Colors from "../../themes/colors"; // Themes
import { notification } from "../../strings"; // Strings
import Loader from "../../utils/Loader"; // Custom loader

const Notification = () => {
  const dispatch = useDispatch();

  const notification_list = useSelector(
    (state) => state?.notificationReducer?.notification_data
  );

  const notification_list_loader = useSelector(
    (state) => state?.notificationReducer?.notification_loading
  );

  const notification_clear_all_loader = useSelector(
    (state) => state?.notificationReducer?.notification_clear_all_loading
  );

  const next_page = useSelector(
    (state) => state?.notificationReducer?.next_page
  );

  const [page, setPage] = useState(1);
  const [page_size, setPageSize] = useState(10);
  const [onMomentScroll, setOnMomentScroll] = useState(false);

  useEffect(() => {
    let notificationInput = {
      page: page,
      page_size: page_size,
      search: "",
    };
    dispatch(NotificationAPI(notificationInput, page));
  }, [page]);

  const notificationView = ({ item }) => {
    return (
      <View style={styles().card}>
        <Text style={styles().notificationText}>{item.message}</Text>
      </View>
    );
  };

  // pagination of Notification list
  const endReached = () => {
    if (!onMomentScroll) {
      setOnMomentScroll(true);
      if (next_page) {
        setPage(page + 1);
      }
    }
  };

  const renderFooter = () => {
    if (next_page) {
      return (
        <View style={styles().footerComponent}>
          <ActivityIndicator
            size="small"
            color={Colors.appBackgroundColorSecondary}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  const onMomentData = () => {
    setOnMomentScroll(false);
  };

  const NoData = () => {
    return (
      <View style={styles().empty_component}>
        <Text style={styles().list_empty_text}>{notification.noData}</Text>
      </View>
    );
  };

  const clearAll = () => {
    Alert.alert(
      "",
      "Are you sure want to clear all the notification",
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(NotificationClearAllAPI());
          },
        },
        { text: "No", onPress: () => console.log("") },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles().container}>
      <Loader loading={notification_clear_all_loader} />
      {notification_list_loader === true && page == 1 ? (
        <View style={styles().loader}>
          <ActivityIndicator
            size="small"
            color={Colors.appBackgroundColorSecondary}
          />
        </View>
      ) : (
        <>
          {notification_list.length !== 0 ? (
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles().clearAllText}>{notification.clearAll}</Text>
            </TouchableOpacity>
          ) : null}

          <View>
            <FlatList
              data={notification_list}
              contentContainerStyle={styles().flatList}
              renderItem={(item) => notificationView(item)}
              showsVerticalScrollIndicator={false}
              refreshing={notification_list_loader}
              onEndReachedThreshold={0.5}
              onEndReached={endReached}
              ListFooterComponent={renderFooter}
              onMomentumScrollBegin={onMomentData}
              onMomentumScrollEnd={onMomentData}
              ListEmptyComponent={NoData}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Notification;
