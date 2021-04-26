import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../constants/Colors";

const Button: React.FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.ORANGE,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: "white", textTransform: "uppercase" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
