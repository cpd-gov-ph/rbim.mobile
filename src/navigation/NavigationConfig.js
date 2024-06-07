import React from "react";
import { Alert, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // For navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //  Navigation stack
import { SafeAreaProvider } from "react-native-safe-area-context"; // To handle safe area insets on devices
import { connect } from "react-redux"; // Redux connect
import CodePush from "react-native-code-push"; // To deploy app updates directly to the end users
import Splash from "react-native-splash-screen"; // To add a customizable splash screen that appears while the app is loading
import messaging from "@react-native-firebase/messaging"; // For integrating Firebase Cloud Messaging (FCM)
import PushNotification from "react-native-push-notification"; // For push notifications
import { openSettings } from "react-native-permissions"; // To request permissions from the user
import { navigationRef } from "./NavigationService"; // For navigation
import { AuthStack, DrawerScreen } from "./NavigationStacks"; // Stack screens
import { getFcmToken } from "../utils/helpers"; // Helper function
import { DrawerSurveyShow } from "../store/actions/navigationActions"; // Navigation actions
import { store } from "../../App"; // Redux store
import { navigation_screens } from "../strings";

const RootStack = createNativeStackNavigator();
class NavigationConfig extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkPermission();
    this.syncImmediate();
    this.AndroidForegroundConfig();
    this.ForegoundPage();
    this.backgroundMessage();
    this.targetScreen();
    Splash.hide();
  }

  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.ON_NEXT_RESTART, updateDialog: true },
      this.codePushStatusDidChange.bind(this)
    );
  }
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("CHECKING_FOR_UPDATE");
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("DOWNLOADING_PACKAGE");
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("AWAITING_USER_ACTION");

        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("INSTALLING_UPDATE");

        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("UP_TO_DATE");

        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log("UPDATE_IGNORED");

        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("UPDATE_INSTALLED");
        Alert.alert(
          "",
          "Update successfully installed, please restart now",
          [{ text: "Restart", onPress: () => this.Restart() }],
          { cancelable: false }
        );
        break;

      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log("UNKNOWN_ERROR");
        break;
    }
  }
  openSettingsAction = () => {
    openSettings().catch(() => console.warn("cannot open settings"));
  };
  checkPermission = async () => {
    const permissioncheck = await messaging().requestPermission({});
    if (permissioncheck) {
      console.log("===> permission", permissioncheck);
      console.log("permission granted", await getFcmToken());
    } else {
      console.log("cancel permission");
    }
  };

  // Foreground Message Receiving Function
  foregroundMessage = async () => {
    if (Platform.OS == "android") {
      const listn = await messaging().onMessage((remoteMessage) => {
        const { title, body } = remoteMessage.notification;
        PushNotification.localNotification({
          title: title,
          message: body,
          data: remoteMessage.data,
          channelId: "rbim-id",
        });
      });
      this.ForegoundPage();
      return listn;
    }
  };
  AndroidForegroundConfig = () => {
    PushNotification.createChannel(
      {
        channelId: "rbim-id", // (required)
        channelName: "rbim channel", // (required)
        channelDescription: "", // (optional) default: undefined.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  // Foreground Message Action
  ForegoundPage = () => {
    PushNotification.configure({
      smallIcon: "ic_notification",
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        const { title, message } = notification;

        PushNotification.localNotification({
          title: title,
          message: message,
          channelId: "rbim-id",
        });
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  // Background Message Receiving Function
  backgroundMessage = async () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // App from background state
      console.log("remoteMessage", JSON.stringify(remoteMessage));
      let NotificationResponse = remoteMessage;
      navigatePage(NotificationResponse);
    });
  };

  //Target screen
  targetScreen = async () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          let NotificationResponse = remoteMessage;
          this.navigatePage(NotificationResponse);
          console.log(remoteMessage, "remoteMessage");
        } else {
        }
      });
  };

  //Target screen navigation
  navigatePage = (NotificationResponse) => {
    if (NotificationResponse.data.target_screen === "notification") {
      console.log(NotificationResponse, "NotificationResponse");
      //NavigationService.navigate('PromptView', { prompt_Item: NotificationResponse.data })
    } else {
      console.log("Empty Target Screen");
      //NavigationService.navigate('StageTab')
    }
  };

  Restart() {
    CodePush.restartApp();
  }
  onReady() {
    const initialScreen = navigationRef.current?.getCurrentRoute().name;
    if ([navigation_screens.Home, navigation_screens.Profile].includes(initialScreen)) {
      store.dispatch(DrawerSurveyShow(1));
    } else {
      store.dispatch(DrawerSurveyShow(0));
    }
  }
  onStateChange = async () => {
    const currentScreen = navigationRef.current?.getCurrentRoute().name;
    if ([navigation_screens.Home, navigation_screens.Profile].includes(currentScreen)) {
      store.dispatch(DrawerSurveyShow(1));
    } else {
      store.dispatch(DrawerSurveyShow(0));
    }
  };

  render() {
    const { navigation_target, show_intro } = this.props.navigationReducer;
    return (
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={this.onReady}
          onStateChange={this.onStateChange}
        >
          {navigation_target === 0 ? (
            <RootStack.Navigator useLegacyImplementation={false}>
              <RootStack.Group>
                <RootStack.Screen options={{ headerShown: false }} name="Auth">
                  {(props) => (
                    <AuthStack
                      {...props}
                      extraData={{ show_intro: show_intro }}
                    />
                  )}
                </RootStack.Screen>
              </RootStack.Group>
            </RootStack.Navigator>
          ) : (
            <RootStack.Navigator useLegacyImplementation={false}>
              <RootStack.Group>
                <RootStack.Screen options={{ headerShown: false }} name={navigation_screens.home}>
                  {(props) => <DrawerScreen {...props} />}
                </RootStack.Screen>
              </RootStack.Group>
            </RootStack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    navigationReducer: state.navigationReducer,
  };
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationConfig);
