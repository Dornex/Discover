import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/Colors";

const PriceRangeContainer = styled.View`
  flex-direction: row;
`;

export const PriceRange: React.FC<{
  priceLevel: number;
  fullColor?: string;
  emptyColor?: string;
}> = ({ priceLevel, fullColor, emptyColor }) => {
  let fullDollarSigns = [];
  let emptyDollarSigns = [];

  for (let i = 0; i < priceLevel; i++) {
    fullDollarSigns.push(
      <FontAwesome
        key={`full-${i}`}
        name="dollar"
        color={fullColor ? fullColor : COLORS.WHITE}
        size={20}
      />
    );
  }

  for (let i = 0; i < 5 - priceLevel; i++) {
    emptyDollarSigns.push(
      <FontAwesome
        key={`empty-${i}`}
        name="dollar"
        color={emptyColor ? emptyColor : "gray"}
        size={20}
      />
    );
  }

  return (
    <PriceRangeContainer>
      {fullDollarSigns.map((item) => item)}
      {emptyDollarSigns.map((item) => item)}
    </PriceRangeContainer>
  );
};
