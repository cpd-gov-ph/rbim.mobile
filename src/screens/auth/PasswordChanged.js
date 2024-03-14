import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import Images from "../../constants/Images"; // Images
import FastImage from "react-native-fast-image"; // To load images faster
import { auth_content, navigation_screens } from "../../strings"; // Auth strings
import { styles } from "./PasswordChanged.style"; // Password changed styles
import AuthButton from "../../components/buttons/AuthButton"; // Custom button component

const PasswordChanged = ({ navigation }) => {
  const loginAction = () => {
    navigation.navigate(navigation_screens.Login);
  };
  return (
    <SafeAreaView style={styles().container}>
      <View style={styles().checkedView}>
        <FastImage
          resizeMode="contain"
          source={Images.Green_tick}
          style={styles().logoStyle}
        />
      </View>
      <View style={styles().passwordView}>
        <Text style={styles().subTitle}>{auth_content.Password_Success}</Text>
        <TouchableOpacity
          onPress={() => {
            loginAction();
          }}
          style={styles().button}
        >
          <AuthButton
            text={auth_content.Back_Sign_in}
            onPress={() => {
              loginAction();
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordChanged;
