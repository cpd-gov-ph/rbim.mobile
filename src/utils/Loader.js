/* eslint-disable no-unused-vars */
import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import Colors from "../themes/colors"; // Themes

const Loader = (props) => {
  const { loading } = props;
  return (
    <Modal visible={loading} transparent={true} animationType={"none"}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          size="large"
          animating={loading}
          color={Colors.appBackgroundColorSecondary}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default Loader;
