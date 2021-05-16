import React from "react";
import styled, { css } from "styled-components/native";
import { COLORS } from "../constants/Colors";
import { Text } from "react-native";

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
    <Container onPress={onPress}>
      <Text
        style={
          active
            ? {
                borderBottomColor: COLORS.ORANGE,
                borderBottomWidth: 4,
                padding: 3,
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.ORANGE,
              }
            : { padding: 3, color: COLORS.BLACK, fontSize: 18, fontWeight: 700 }
        }
      >
        {text}
      </Text>
    </Container>
  );
};

export default SwitchButton;
