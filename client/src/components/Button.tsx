import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../constants/Colors";
import StyledText from "./StyledText";

const Button: React.FC<{
  label: string;
  onPress: () => void;
  height?: number;
  width?: number;
  fontSize?: number;
  disabled?: boolean;
}> = ({ label, onPress, height, width, fontSize, disabled }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: height ? height : 40,
        width: width ? width : 245,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.ORANGE,
      }}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <StyledText fontSize={fontSize ? fontSize : 18} color={COLORS.WHITE}>
        {label}
      </StyledText>
    </TouchableOpacity>
  );
};

export default Button;
