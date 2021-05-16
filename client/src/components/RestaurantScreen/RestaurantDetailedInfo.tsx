import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { PriceRange } from "../PriceRange";

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
          <Text style={{ fontSize: 16, fontWeight: 700 }}>Address</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 16 }}>{address}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>Phone Number</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 16 }}>{phoneNumber}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>Website</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 16 }}>{website}</Text>
        </Column>
      </Row>
      {priceLevel !== -1 ? (
        <Row>
          <Column>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>Price Level</Text>
          </Column>
          <Column>
            <PriceRange priceLevel={priceLevel} fullColor={COLORS.BLACK} />
          </Column>
        </Row>
      ) : null}

      <Row>
        <Column>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>Rating</Text>
        </Column>
        <Column>
          <Text style={{ fontSize: 16 }}>
            {rating} <Ionicons name="star" color={COLORS.BLACK} size={20} />
          </Text>
        </Column>
      </Row>
    </Container>
  );
};

export default RestaurantDetailedInfo;
