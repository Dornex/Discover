import React from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { restaurantReviewsState } from "../../atoms/restaurantReviews";
import { COLORS } from "../../constants/Colors";
import { Review } from "../../generated/graphql";
import { monthToString } from "../../helpers";
import Line from "../Line";
import Rating from "../Rating";
import StyledText from "../StyledText";

const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 0 28px;
`;

const ItemContainer = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const RestaurantReviews: React.FC = () => {
  const reviews = useRecoilValue(restaurantReviewsState);

  const renderItem: ListRenderItem<Review> = ({ item }) => {
    const date = new Date(parseInt(item.createdAt));
    return (
      <ItemContainer>
        <ItemHeader>
          <View style={{ justifyContent: "space-between" }}>
            <StyledText fontSize={14} fontWeight={700}>
              {item.creator.username}
            </StyledText>
            <StyledText fontSize={14} color={COLORS.GRAY}>{`${
              monthToString[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}</StyledText>
          </View>
          <Rating starSize={18} numberOfStars={5} rating={item.points} />
        </ItemHeader>
        <StyledText fontSize={14} color={COLORS.GRAY}>
          {item.content}
        </StyledText>
      </ItemContainer>
    );
  };

  return (
    <Container>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => `review-${item.id}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Line}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            height: "70%",
          }}
        >
          <StyledText fontSize={24} style={{ textAlign: "center" }}>
            This restaurant has no reviews. Be the first one to share your
            experience!
          </StyledText>
        </View>
      )}
    </Container>
  );
};

export default RestaurantReviews;
