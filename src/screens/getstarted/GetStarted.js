import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image"; // To load images faster
import { useDispatch } from "react-redux"; // To dispatch actions
import Images from "../../constants/Images"; // Images
import { auth_content, navigation_screens } from "../../strings"; // Strings
import { styles } from "./GetStarted.style"; // Get started styles
import AuthButton from "../../components/buttons/AuthButton"; // Custom button component
import { show_intro } from "../../store/actions/navigationActions"; // Navigation action

const GetStarted = ({ navigation }) => {
  const dispatch = useDispatch();
  dispatch(show_intro(1));

  const onClick = () => {
    navigation.navigate(navigation_screens.Login);
  };
  return (
    <SafeAreaView style={styles().container}>
      <View>
        <FastImage source={Images.Flag} style={styles().flagStyle} />
      </View>
      <View>
        <View style={styles().logoView}>
          <FastImage
            resizeMode="contain"
            source={Images.Logo}
            style={styles().logoStyle}
          />
          <Text style={styles().title}>{auth_content.RBIM}</Text>
          <Text style={styles().subTitle}>{auth_content.RBIM_Fullform}</Text>
          <TouchableOpacity style={styles().button}>
            <AuthButton
              text={auth_content.Started}
              onPress={() => {
                onClick();
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles().bottom_view}>
        <Text style={styles().bottom_text}>{auth_content.ImprintMessage}</Text>
        <Text style={styles().version_text}>{auth_content.AppVersion}</Text>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
