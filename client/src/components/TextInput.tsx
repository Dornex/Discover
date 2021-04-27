import React from "react";
import { TextInput as RNTextInput, View, StyleSheet, Text } from "react-native";
import { Entypo as Icon, MaterialIcons } from "@expo/vector-icons";

export default function TextInput({
  icon,
  error,
  ...otherProps
}: {
  icon: string;
  error: string | false | undefined;
}) {
  const validationColor = "#223e4b";
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 48,
          borderRadius: 8,
          borderColor: error ? "red" : validationColor,
          borderWidth: StyleSheet.hairlineWidth,
          padding: 8,
        }}
      >
        <View style={{ padding: 8 }}>
          <Icon name={icon} color={validationColor} size={16} />
        </View>
        <View style={{ flex: 1 }}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            {...otherProps}
          />
        </View>
      </View>
      {error ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="error"
            size={20}
            color="red"
            style={{ paddingTop: 2, paddingBottom: 2 }}
          />
          <Text style={{ color: "red", marginLeft: 5 }}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
