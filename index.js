import {AppRegistry,TextInput,LogBox,Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { InternetReceiverAction } from './src/screens/home/HomeTab';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
// console.log = function(){}
// console.error = function(){}
// console.warn = function(){}
console.reportErrorsAsExceptions = false;
if (Text.defaultProps == null) Text.defaultProps = {};
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);
