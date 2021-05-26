import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { PriceRange } from "../PriceRange";
import StyledText from "../StyledText";

const Container = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  padding: 5px 28px;
`;

const Column = styled.View`
  flex-direction: column;
  flex: 1;
`;

const RestaurantDetailedInfo: React.FC<{
  address: string;
  phoneNumber: string;
  website: string;
  priceLevel: number;
  rating: number;
}> = ({ address, phoneNumber, website, priceLevel, rating }) => {
  return (
    <Container>
      <Row>
        <Column>
          <StyledText fontSize={16} fontWeight={700}>
            Address
          </StyledText>
        </Column>
        <Column>
          <StyledText fontSize={16}>{address}</StyledText>
        </Column>
      </Row>
      <Row>
        <Column>
          <StyledText fontSize={16} fontWeight={700}>
            Phone Number
          </StyledText>
        </Column>
        <Column>
          <StyledText fontSize={16}>{phoneNumber}</StyledText>
        </Column>
      </Row>
      <Row>
        <Column>
          <StyledText fontSize={16} fontWeight={700}>
            Website
          </StyledText>
        </Column>
        <Column>
          <StyledText fontSize={16}>{website}</StyledText>
        </Column>
      </Row>
      {priceLevel !== -1 ? (
        <Row>
          <Column>
            <StyledText fontSize={16} fontWeight={700}>
              Price Level
            </StyledText>
          </Column>
          <Column>
            <PriceRange priceLevel={priceLevel} fullColor={COLORS.BLACK} />
          </Column>
        </Row>
      ) : null}

      <Row>
        <Column>
          <StyledText fontSize={16} fontWeight={700}>
            Rating
          </StyledText>
        </Column>
        <Column>
          <StyledText fontSize={16}>
            {rating} <Ionicons name="star" color={COLORS.BLACK} size={20} />
          </StyledText>
        </Column>
      </Row>
    </Container>
  );
};

export default RestaurantDetailedInfo;
