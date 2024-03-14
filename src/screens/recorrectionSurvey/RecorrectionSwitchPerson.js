import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
  } from "react-native";
  import React from "react";
  import { useSelector } from "react-redux"; // Retrieving the state from the Redux store
  import Styles from "../survey/survey.styles"; // Re correction Switch person styles
  import Vector from "../../constants/Vector"; // Icons
  
  const RecorrectionSwitchPerson = ({ navigation,route }) => {
    const styles = Styles();
    const householdlist = useSelector(
      (state) => state?.surveyReducer?.recorrection_household_info.householdlist
    );
  
    //Item Separator for Flat List
    const FlatListItemSeparator = () => {
      return <View style={styles.flatListSeparator} />;
    };
  
    //Total person name list view
    const NameView = (item, index) => {
      return (
        <TouchableOpacity
          style={styles.name_card}
          activeOpacity={0.6}
          onPress={() => {
            route.params.backData({index:index});
            navigation.goBack();
          }}
        >
          <View style={styles.name_text_view}>
            <Text style={styles.name_text} numberOfLines={1}>
              {item.member_name}
            </Text>
          </View>
          <View style={styles.icon_view}>{Vector.LeftArrow}</View>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.switch_person_container}>
        <FlatList
          data={householdlist}
          contentContainerStyle={styles.switch_person_flatList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({ item, index }) => NameView(item, index)}
          keyExtractor={(item) => item.member_id}
        />
      </SafeAreaView>
    );
  };
  
  export default RecorrectionSwitchPerson;
  