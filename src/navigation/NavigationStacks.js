import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // For navigating between screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // To create bottom tab
import { createDrawerNavigator } from "@react-navigation/drawer"; // To create app drawer
import DeviceInfo from "react-native-device-info"; // To get device information
import { navigate } from "./NavigationService"; // For navigation
import CustomTabBar from "./CustomTabBar"; // Custom tab bar component
import MainHeader from "../components/header/MainHeader"; // ----------- Custom header
import BackHeader from "../components/header/BackHeader";
import CustomDrawer from "./CustomDrawer"; // Custom app drawer component
import GetStarted from "../screens/getstarted/GetStarted"; // ------------ Screens
import Login from "../screens/auth/Login";
import ForgotPassword from "../screens/auth/ForgotPassword";
import CodeVerification from "../screens/auth/CodeVerification";
import ResetPassword from "../screens/auth/ResetPassword";
import MyProfile from "../screens/profile/MyProfile";
import Notification from "../screens/notification/Notification";
import Notes from "../screens/notes/Notes";
import RecorrectionNotes from "../screens/recorrectionSurvey/RecorrectionNotes";
import PasswordChanged from "../screens/auth/PasswordChanged";
import TermsAndConditions from "../screens/termsAndConditions/TermsAndConditions";
import HomeTab from "../screens/home/HomeTab";
import SurveyDetails from "../screens/home/SurveyDetails";
import SurveyNumber from "../screens/survey/SurveyNumber";
import HouseholdMembers from "../screens/survey/HouseholdMembers";
import AssignedTask from "../screens/home/AssignedTask";
import EnterSignature from "../screens/signature/EnterSignature";
import VerifySignature from "../screens/signature/VerifySignature";
import RecorrectionVerifySignature from "../screens/recorrectionSurvey/RecorrectionVerifySignature";
import SurveyFormPartA from "../screens/survey/SurveyFormPartA";
import SurveyFormPartB from "../screens/survey/SurveyFormPartB";
import SurveyFormPartC from "../screens/survey/SurveyFormPartC";
import RecorrectionSurveyFormPartA from "../screens/recorrectionSurvey/RecorrectionSurveyFormPartA";
import RecorrectionSurveyFormPartB from "../screens/recorrectionSurvey/RecorrectionSurveyFormPartB";
import RecorrectionSurveyFormPartC from "../screens/recorrectionSurvey/RecorrectionSurveyFormPartC";
import RecorrectionSurveyNumber from "../screens/recorrectionSurvey/RecorrectionSurveyNumber";
import SwitchPerson from "../screens/survey/SwitchPerson";
import RecorrectionSwitchPerson from "../screens/recorrectionSurvey/RecorrectionSwitchPerson";
import PauseSurvey from "../screens/survey/PauseSurvey";
import FormSubmitPage from "../screens/survey/FormSubmitPage";
import RecorrectionFormSubmitPage from "../screens/recorrectionSurvey/RecorrectionFormSubmitPage";
import LegalDocument from "../screens/home/LegalDocument";
import { navigation_screens } from "../strings";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();

const isTablet = DeviceInfo.isTablet();

const tab_icon = [
  {
    active_icon: require("../../assets/icons/home_active.png"),
    inactive_icon: require("../../assets/icons/home_inactive.png"),
  },
  {
    active_icon: require("../../assets/icons/plus_i.png"),
    inactive_icon: require("../../assets/icons/plus_i.png"),
  },
  {
    active_icon: require("../../assets/icons/person.png"),
    inactive_icon: require("../../assets/icons/person_inactive.png"),
  },
];

export function AuthStack(data) {
  return (
    <Stack.Navigator useLegacyImplementation={false}
      initialRouteName={
        data.extraData.show_intro === 0 ? navigation_screens.GetStarted : navigation_screens.Login
      }
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigation_screens.Login}
        component={Login}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigation_screens.GetStarted}
        component={GetStarted}
      />

      <Stack.Screen
        options={{
          header: () => <BackHeader />,
        }}
        name={navigation_screens.ForgotPassword}
        component={ForgotPassword}
      />

      <Stack.Screen
        options={{
          header: () => <BackHeader />,
        }}
        name={navigation_screens.CodeVerification}
        component={CodeVerification}
      />

      <Stack.Screen
        options={{
          header: () => <BackHeader />,
        }}
        name={navigation_screens.ResetPassword}
        component={ResetPassword}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigation_screens.PasswordChanged}
        component={PasswordChanged}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={navigation_screens.TermsAndConditions}
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
}
const SurveyNumberStack = () => {};
const HomeTabStack = () => (
  <Tab.Navigator useLegacyImplementation={false}
    tabBar={(props) => <CustomTabBar tab_icon={tab_icon} {...props} />}
    initialRouteName={"HomeTab"}
    backBehavior={"order"}
  >
    <Tab.Screen
      name={navigation_screens.Home}
      component={HomeTab}
      options={{
        tabBarButton: CustomTabButton,
        header: () => <MainHeader />,
      }}
    />

    <Tab.Screen
      name={navigation_screens.Plus}
      component={SurveyNumber}
      options={{
        header: () => <MainHeader />,
      }}
      listeners={{
        tabPress: (event) => {
          event.preventDefault(); // To Avoid Tab Action
          navigate(navigation_screens.SurveyNumber); // Naviagation
        },
      }}
    />
    <Tab.Screen
      name={navigation_screens.Profile}
      component={MyProfile}
      options={{
        tabBarButton: CustomTabButton,
        header: () => <MainHeader />,
      }}
    />
  </Tab.Navigator>
);

const MainScreens = () => {
  return (
    <MainStack.Navigator useLegacyImplementation={false}>
      <MainStack.Screen
        name={navigation_screens.MainScreens}
        component={HomeTabStack}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.SurveyNumber}
        component={SurveyNumber}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionSurveyNumber}
        component={RecorrectionSurveyNumber}
        options={{
          header: () => <MainHeader />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.Notification}
        component={Notification}
        options={{
          header: () => <BackHeader title={"Notification"} />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.OngoingSurvey}
        component={SurveyDetails}
        options={{
          header: () => <BackHeader title={"Ongoing survey"} />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionSurvey}
        component={SurveyDetails}
        options={{
          header: () => <BackHeader title={"Recorrection Survey"} />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.LegalDocument}
        component={LegalDocument}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.HouseholdMembers}
        component={HouseholdMembers}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.AssignedTask}
        component={AssignedTask}
        options={{
          header: () => <BackHeader title={"Assigned Task"} />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.SwitchPerson}
        component={SwitchPerson}
        options={{
          header: () => <BackHeader title={"Switch Person"} />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.RecorrectionSwitchPerson}
        component={RecorrectionSwitchPerson}
        options={{
          header: () => <BackHeader title={"Switch Person"} />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.Notes}
        component={Notes}
        options={{
          header: () => <BackHeader title={"Notes"} />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionNotes}
        component={RecorrectionNotes}
        options={{
          header: () => <BackHeader title={"Notes"} />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.SurveyFormPartA}
        component={SurveyFormPartA}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.SurveyFormPartB}
        component={SurveyFormPartB}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.SurveyFormPartC}
        component={SurveyFormPartC}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.VerifySignature}
        component={VerifySignature}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionVerifySignature}
        component={RecorrectionVerifySignature}
        options={{
          header: () => <MainHeader />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.EnterSignature}
        component={EnterSignature}
        options={{
          header: () => <BackHeader title={"Enter signature"} />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.PauseSurvey}
        component={PauseSurvey}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.FormSubmitPage}
        component={FormSubmitPage}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionFormSubmitPage}
        component={RecorrectionFormSubmitPage}
        options={{
          header: () => <MainHeader />,
        }}
      />

      <MainStack.Screen
        name={navigation_screens.RecorrectionSurveyFormPartA}
        component={RecorrectionSurveyFormPartA}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionSurveyFormPartB}
        component={RecorrectionSurveyFormPartB}
        options={{
          header: () => <MainHeader />,
        }}
      />
      <MainStack.Screen
        name={navigation_screens.RecorrectionSurveyFormPartC}
        component={RecorrectionSurveyFormPartC}
        options={{
          header: () => <MainHeader />,
        }}
      />
    </MainStack.Navigator>
  );
};

const DrawerScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator useLegacyImplementation={false}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName={navigation_screens.DrawerScreen}
      screenOptions={{
        drawerStyle: {
          width: isTablet
            ? Dimensions.get("window").width * 0.75
            : Dimensions.get("window").width * 0.77,
        },
      }}
    >
      <Drawer.Screen
        name={navigation_screens.DrawerScreen}
        component={MainScreens}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderTopWidth: 2 }]
        : props.style
    }
  />
);

export { HomeTabStack, CustomTabButton, MainScreens, DrawerScreen };
