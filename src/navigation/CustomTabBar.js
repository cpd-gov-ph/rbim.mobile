import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient"; // UI elements
import { dimen_size_height, font_size, isIphoneX } from "../utils/helpers"; // Helper functions
import Colors from "../themes/colors"; // Themes
import { Fonts } from "../fontfamily"; // Typography
import { navigation_screens } from "../strings";

function CustomTabBar({ state, descriptors, navigation, tab_icon }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const inactive_icons = tab_icon[index].inactive_icon;
        const active_icons = tab_icon[index].active_icon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          let routes = route.name;

          if (isFocused && routes === navigation_screens.Plus && !event.defaultPrevented) {
            navigation.navigate({
              name: state.routes[index - 1].name,
              merge: true,
            });
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            testID={options.tabBarTestID}
            onPress={() => onPress()}
            activeOpacity={1}
            onLongPress={onLongPress}
            style={[styles.container]}
          >
            {isFocused && label !== navigation_screens.Plus? (
              <LinearGradient
                useAngle={true}
                angle={90.13}
                colors={[
                  Colors.appBackgroundColorSecondary,
                  Colors.appBackgroundColorSecondary,
                ]}
                style={styles.linear_line}
              ></LinearGradient>
            ) : (
              <View style={{ height: dimen_size_height(0.7) }} />
            )}
            {label === navigation_screens.Plus ? (
              <View style={styles.plus_view}>
                <View style={[styles.tab_image_view]}>
                  <Image
                    style={{
                      height: dimen_size_height(5),
                      width: dimen_size_height(5),
                    }}
                    source={isFocused ? active_icons : inactive_icons}
                  ></Image>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View style={[styles.tab_image_view]}>
                  <Image
                    style={{
                      height: dimen_size_height(4),
                      width: dimen_size_height(4),
                    }}
                    source={isFocused ? active_icons : inactive_icons}
                  ></Image>
                </View>
                <View style={styles.tab_text_view}>
                  <Text
                    style={[
                      styles.tab_text,
                      {
                        color: isFocused
                          ? Colors.a_tab_color
                          : Colors.in_a_tab_color,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimen_size_height(8),
    flexDirection: "column",
    backgroundColor: Colors.appBackgroundColorPrimary,
    shadowColor: "#C4C4C4",
    shadowOpacity: 0.8,
    borderTopWidth: 0,
    bottom: isIphoneX() ? dimen_size_height(2) : 0,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  tab_text: {
    fontFamily: Fonts.Medium,
    fontSize: font_size(11),
  },
  tab_text_view: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  line_tab_text_view: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  tab_image_view: { flex: 0.7, justifyContent: "center", alignItems: "center" },
  linear_line: {
    overflow: "hidden",

    height: dimen_size_height(0.7),
    marginHorizontal: dimen_size_height(2.7),
    borderBottomRightRadius: dimen_size_height(0.7),
    borderBottomLeftRadius: dimen_size_height(0.7),
  },
  plus_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomTabBar;
