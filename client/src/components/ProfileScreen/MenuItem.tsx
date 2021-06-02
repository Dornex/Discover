import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import Line from "../Line";
import StyledText from "../StyledText";

interface IMenuItem {
  name: string;
  description?: string;
  onPress?: () => void;
  withBorder?: boolean;
  nameColor?: COLORS;
  descriptionColor?: COLORS;
}

const ItemContainer = styled.TouchableOpacity<{ withLine?: boolean }>`
  border-bottom-width: ${({ withLine }) => (withLine ? 1 : 0)}px;
  border-color: ${COLORS.GRAY};
  height: 70px;
  padding: 0 20px;
  margin: 0 4px;
`;

const TextContainer = styled.View`
  margin-left: 14px;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const MenuItem: React.FC<IMenuItem> = ({
  descriptionColor,
  nameColor,
  name,
  description = "",
  onPress,
  withBorder = false,
  children,
}) => {
  return (
    <ItemContainer onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          paddingVertical: 15,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {children}
        <TextContainer>
          <StyledText
            fontSize={16}
            color={nameColor || COLORS.BLACK}
            fontWeight="bold"
          >
            {name}
          </StyledText>
          {description ? (
            <StyledText
              style={{ width: "85%" }}
              fontSize={12}
              color={descriptionColor || COLORS.GRAY}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </StyledText>
          ) : null}
        </TextContainer>
      </View>
      {withBorder ? <Line /> : null}
    </ItemContainer>
  );
};

export default MenuItem;
