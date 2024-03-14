import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // To dispatch actions
import styles from "./home.styles"; // Assigned task styles
import { home_text } from "../../strings"; // Strings
import { AssignedTaskListAPI } from "../../network/HomeApi"; // API call
import Loader from "../../utils/Loader"; // Custom loader

const AssignedTask = () => {
  const [page, setPage] = useState(1); // Email state
  const [page_size, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const task_loader = useSelector(
    // assigned task api progress loader
    (state) => state?.homeReducer?.assigned_list_loading
  );
  const task_data = useSelector(
    // assigned task data
    (state) => state?.homeReducer?.assigned_task_list
  );
  useEffect(() => {
    let taskInput = {
      page: page,
      page_size: page_size,
      search: search,
    };
    dispatch(AssignedTaskListAPI(taskInput));
  }, []);
  //Item Separator for survey FlatList
  const FlatListItemSeparator = () => {
    return <View style={styles().flatListSeparator} />;
  };

  //Assigned Task view
  const TaskView = (item, index) => {
    return (
      <View style={styles().task_notification_card_2}>
        <Text style={styles().taskTitle}>{home_text.task}</Text>
        <Text style={styles().taskSubTitle}>{item.title}</Text>
        <Text style={styles().taskDescription}>{item.description}</Text>
      </View>
    );
  };
  console.log("task_data", task_data?.data);
  return (
    <SafeAreaView style={[styles().container, styles().scroll_container]}>
      <Loader loading={task_loader} />
      <FlatList
        data={task_data?.data}
        contentContainerStyle={styles().flatList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({ item, index }) => TaskView(item, index)}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default AssignedTask;
