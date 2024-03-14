import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation from header component
import FastImage from "react-native-fast-image"; // To load images faster
import Images from "../../constants/Images"; // Images
import styles from "./header.style"; // Header styles
import { auth_content } from "../../strings"; // Strings

const LegalDocHeader = ({ title, updated_at }) => {
  const navigation = useNavigation();
  return (
    <View style={styles().legal_container}>
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
        <View style={styles().titleView}>
          <Text style={styles().legal_title}>{title}</Text>
          <Text style={[styles().heading_Sub_Txt]}>
            {" "}
            {auth_content.Last_updated}
            {updated_at}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LegalDocHeader;
