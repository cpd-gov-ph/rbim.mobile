import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation from header component
import FastImage from "react-native-fast-image"; // To load images faster
import Images from "../../constants/Images"; // Images
import styles from "./header.style"; // Back header styles 
import { navigation_screens } from "../../strings";

const BackHeader = ({ title = "" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles().container}>
      <View style={styles().headerView}>
        <TouchableOpacity
          style={styles().backIconView}
          onPress={() => navigation.goBack()}
        >
          <FastImage
            source={Images.back}
            resizeMode={FastImage.resizeMode.contain}
            style={styles().backIcon}
          />
        </TouchableOpacity>
        <View style={{ flex: title === navigation_screens.Notes ? 0.5 : 0.85 }}>
          <Text style={styles().title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {title === navigation_screens.Notes ? (
          <View style={styles().saveView}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles().saveButtonView}
            >
              <Text style={styles().save_title}>{"Save"}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default BackHeader;
