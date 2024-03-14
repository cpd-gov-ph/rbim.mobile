import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import Signature from "react-native-signature-canvas"; //To capture signature
import DeviceInfo from "react-native-device-info"; // To get device information
import Vector from "../../constants/Vector"; // Icons
import Colors from "../../themes/colors"; // Themes
import {
  SignatureStyle,
  snackBar,
  TabSignatureStyle,
} from "../../utils/helpers"; // Helper functions
import Styles from "./signature.styles"; // Signature styles

let { width } = Dimensions.get("window");
const isTablet = DeviceInfo.isTablet();

const EnterSignature = ({ navigation, route }) => {
  const styles = Styles();

  const [clear, setClear] = useState(0);
  const ref = useRef();

  const handleOK = (signature) => {
    navigation.goBack();
    route.params.onSelect({ sign_img: signature });
  };
  const onDraw = (sign) => {
    setClear(1);
  };
  const handleClear = () => {
    setClear(0);

    ref.current.clearSignature();
  };

  const handleEmpty = () => {
    snackBar("Please put your signature");
  };
  const handleConfirm = (signature) => {
    ref.current.readSignature();
  };

  console.log("clear", clear);
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title_text}>Sign here</Text>
        {clear === 1 ? (
          <TouchableOpacity style={styles.clear_button} onPress={handleClear}>
            <View>{Vector.Clear}</View>
            <Text style={styles.clear_button_text}>{"Clear"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.sign_view}>
        <Signature
          onOK={handleOK}
          ref={ref}
          onBegin={onDraw}
          backgroundColor={Colors.white}
          overlayWidth={width - 24}
          style={{ borderRadius: 25 }}
          webStyle={isTablet ? TabSignatureStyle : SignatureStyle}
          onEmpty={handleEmpty}
        />
      </View>
      <View style={styles.confirm_btn_view}>
        <TouchableOpacity style={styles.confirm_btn} onPress={handleConfirm}>
          <Text style={styles.confirm_btn_text}>{"Confirm"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterSignature;
