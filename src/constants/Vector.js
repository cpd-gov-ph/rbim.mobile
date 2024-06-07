/* eslint-disable react-native/no-inline-styles */
// Vector Icons
import React from 'react';
import Colors from '../themes/colors'; // Themes
import DotIcon from 'react-native-vector-icons/Entypo'; //---------------- Icons
import PlusIcon from 'react-native-vector-icons/AntDesign';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UpDownIcon from 'react-native-vector-icons/Entypo';
import UpDownArrow from 'react-native-vector-icons/Ionicons';
import CheckBoxIcon from "react-native-vector-icons/Ionicons";
import RadioIcon from "react-native-vector-icons/Ionicons";
import ArrowIcon from "react-native-vector-icons/AntDesign";
import ClearIcon from "react-native-vector-icons/Fontisto";
import SwitchPersonIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LeftArrowIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CancelIcon from "react-native-vector-icons/Ionicons";
import EyeIcon from "react-native-vector-icons/Ionicons";
import EyeOffIcon from "react-native-vector-icons/Ionicons";
import BlueArrowIcon from "react-native-vector-icons/Ionicons"


import { dimen_size_height, VerifyTablet } from '../utils/helpers'; // Helper functions

const BlueArrow = (
  <BlueArrowIcon  name={'arrow-forward-circle'} color={Colors.appBackgroundColorSecondary} size={VerifyTablet? dimen_size_height(4):dimen_size_height(2)} />
)

const Dot = (
  <DotIcon name={'dot-single'} color={Colors.black_color} size={dimen_size_height(2)} />
);

const PlusCircle = (
  <PlusIcon name={'pluscircle'} color={Colors.button_color} size={dimen_size_height(2.4)} />
);

const Account = (
  <AccountIcon name={'account'} color={Colors.white} size={dimen_size_height(4.4)} />
);

const UpArrow = (
  <UpDownIcon name={'chevron-thin-up'} color={Colors.black_color} size={dimen_size_height(2.2)} />
);

const DownArrow = (
  <UpDownIcon name={'chevron-thin-down'} color={Colors.black_color} size={dimen_size_height(2.2)} />
);

const DropDown_up = (
  <UpDownArrow name={'chevron-up'} color={Colors.drop_down_icon} size={dimen_size_height(3)} />
);

const DropDown_down = (
  <UpDownArrow name={'chevron-down'} color={Colors.drop_down_icon} size={dimen_size_height(3)} />
);

const CheckedBox = (
  <CheckBoxIcon name={'checkbox'} color={Colors.button_color} size={dimen_size_height(3)} />
);

const UnCheckedBox = (
  <CheckBoxIcon name={'square-outline'} color={Colors.borderWidthColor} size={dimen_size_height(3)} />
);

const RadioOn = (
  <RadioIcon name={'radio-button-on'} color={Colors.button_color} size={dimen_size_height(3)} />
);

const RadioOff = (
  <RadioIcon name={'radio-button-off-sharp'} color={Colors.borderWidthColor} size={dimen_size_height(3)} />
);

const Previous = (
  <ArrowIcon name={'arrowleft'} color={Colors.previous_button_color} size={dimen_size_height(2)} />
);

const Next = (
  <ArrowIcon name={'arrowright'} color={Colors.white} size={dimen_size_height(2)} />
);

const Clear = (
  <ClearIcon name={'close'} color={Colors.clear_icon_color} size={dimen_size_height(2)} />
);

const SwitchPerson = (
  <SwitchPersonIcon name={'account-switch'} color={Colors.button_color} size={dimen_size_height(2.4)} />
);

const LeftArrow = (
  <LeftArrowIcon name={'chevron-right'} color={Colors.textGreyColor} size={dimen_size_height(4.7)} />
);

const Cancel = (
  <CancelIcon name={'close-outline'} color={Colors.textGreyColor} size={dimen_size_height(4.5)} />
);

const Eye = (
  <EyeIcon name={'eye'} color={Colors.textGreyColor} size={dimen_size_height(3.2)} />
);

const EyeOff = (
  <EyeOffIcon name={'eye-off'} color={Colors.textGreyColor} size={dimen_size_height(3.2)} />
);

export default {
Dot,
PlusCircle,
Account,
UpArrow,
DownArrow,
DropDown_up,
DropDown_down,
CheckedBox,
UnCheckedBox,
RadioOn,
RadioOff,
Previous,
Next,
Clear,
SwitchPerson,
LeftArrow,
Cancel,
Eye,
EyeOff,
BlueArrow
};
