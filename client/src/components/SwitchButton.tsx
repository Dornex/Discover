import React from "react";
import styled, { css } from "styled-components/native";
import { COLORS } from "../constants/Colors";
import { Text } from "react-native";
import StyledText from "./StyledText";

const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SwitchButton: React.FC<{
  active: boolean;
  text: string;
  onPress: () => void;
}> = ({ active, text, onPress }) => {
  return (
    <Container
      onPress={onPress}
      style={
        active ? { borderBottomColor: COLORS.ORANGE, borderBottomWidth: 4 } : {}
      }
    >
      <StyledText
        color={active ? COLORS.ORANGE : COLORS.GRAY}
        fontWeight="700"
        fontSize={18}
        style={{ padding: 3 }}
      >
        {text}
      </StyledText>
    </Container>
  );
};

export default SwitchButton;
