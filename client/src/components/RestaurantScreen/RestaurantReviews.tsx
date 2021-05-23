import React from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { Review } from "../../generated/graphql";
import StyledText from "../StyledText";

const Container = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const ItemContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RestaurantReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const renderItem: ListRenderItem<Review> = ({ item }) => {
    const date = new Date(item.createdAt);
    return (
      <ItemContainer>
        <ItemHeader>
          <View>
            <StyledText fontSize={14} fontWeight={700}>
              {item.creator.username}
            </StyledText>
            <StyledText
              fontSize={14}
              color={COLORS.GRAY}
            >{`${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`}</StyledText>
          </View>
          <StyledText fontSize={14}>{item.points}</StyledText>
        </ItemHeader>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => `review-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default RestaurantReviews;
