import React from "react";
import { Text, View, SafeAreaView, StyleSheet, Linking } from "react-native";
import Colors from "../../src/themes/colors"; // Themes
import { Fonts } from "../../src/fontfamily"; // Typography
import { auth_content } from "../../src/strings"; // Strings
import {
  dimen_size_height,
  dimen_size_width,
  font_size,
} from "../../src/utils/helpers"; // Helper functions

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      errorInfo: "",
      errormessage: "",
      error: false,
    };
  }
  continueAction = () => {
    this.props.pageStatus(1);
  };
  static getDerivedStateFromError(error) {
    return { error: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo: error.toString(),
    });
    console.log("error", error);
    console.log("errorInfo", errorInfo);
    this.setState({ errormessage: errorInfo });
    // deal with errorInfo if needed
  }
  restart = () => {
    CodePush.restartApp();
  };
  render() {
    if (this.state.error) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.success_view}></View>
          <View style={styles.success_textview}>
            <Text style={styles.success_text}>{"Something went wrong"}</Text>
            <Text style={styles.try_text}>{""}</Text>
            <Text style={styles.try_text_1}>
              Contact us{" "}
              <Text
                onPress={() =>
                  Linking.openURL("mailto:freerides@gmail.com?subject=Leshr")
                }
                style={styles.emailText}
              >
                {auth_content.faq_email_link}
              </Text>
            </Text>
          </View>
          <View style={styles.button_view}></View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  success_view: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  success_text: {
    fontFamily: Fonts.Bold,
    fontSize: font_size(22),
    color: Colors.black_color,
  },
  try_text: {
    fontFamily: Fonts.Bold,
    fontSize: font_size(14),
    color: Colors.black_color,
  },
  try_text_1: {
    fontFamily: Fonts.Medium,
    fontSize: font_size(14),
    color: Colors.black_color,
  },
  success_textview: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  success_icon: {
    resizeMode: "contain",
  },
  button_view: {
    flex: 0.1,
  },
  button_style: {
    backgroundColor: Colors.appBackgroundColorSecondary,
    width: dimen_size_width(40),
    height: dimen_size_height(5.2),
    borderRadius: dimen_size_height(1),
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.Regular,
  },
  buttonTextstyle: {
    fontSize: 18,
    color: Colors.primaryColor,
    fontFamily: Fonts.Medium,
    textAlign: "center",
  },
});
