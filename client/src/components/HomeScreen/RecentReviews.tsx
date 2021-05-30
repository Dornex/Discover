import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ListRenderItem, Text, FlatList, View } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { Review, useGetRecentReviewsMutation } from "../../generated/graphql";
import { monthToString } from "../../helpers";
import Rating from "../Rating";
import StyledText from "../StyledText";

const Container = styled.View``;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  margin-right: 40px;
  width: 250px;
  height: 100px;
`;

const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const RecentReviews = () => {
  const { navigate } = useNavigation();

  const [{ data }, getRecentReviews] = useGetRecentReviewsMutation();

  useFocusEffect(
    useCallback(() => {
      getRecentReviews();
    }, [])
  );

  const renderReview: ListRenderItem<Review> = ({ item }) => {
    const date = new Date(parseInt(item.createdAt));
    return (
      <ItemContainer
        onPress={() => {
          navigate("Restaurant", {
            screen: "Restaurant",
            params: {
              restaurantId: item.id,
              name: item.restaurant.name,
              latitude: item.restaurant.latitude,
              longitude: item.restaurant.longitude,
              rating: item.restaurant.rating,
              imageUrl: item.restaurant.imageUrl,
              priceRange: item.restaurant.priceRange,
            },
          });
        }}
      >
        <ItemHeader>
          <View style={{ flex: 1 }}>
            <StyledText
              fontSize={18}
              fontWeight={700}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.restaurant.name}
            </StyledText>
            <StyledText fontSize={14} fontWeight={700}>
              {item.creator.username}
            </StyledText>
          </View>

          <View
            style={{ flexDirection: "column", alignItems: "center", flex: 0.7 }}
          >
            <Rating numberOfStars={5} rating={item.points} starSize={10} />
            <StyledText fontSize={14} color={COLORS.GRAY}>{`${
              monthToString[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()}`}</StyledText>
          </View>
        </ItemHeader>
        <StyledText
          fontSize={14}
          color={COLORS.GRAY}
          style={{ marginTop: 10 }}
          ellipsizeMode="tail"
        >
          {item.content}
        </StyledText>
      </ItemContainer>
    );
  };

  const MostRecentReviewsHeader = () => {
    return (
      <StyledText
        fontSize={24}
        fontWeight={700}
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        Most Recent Reviews
      </StyledText>
    );
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <MostRecentReviewsHeader />
      <FlatList
        contentContainerStyle={{ padding: 28 }}
        keyExtractor={(item, index) => `recent-review-${item.id}-${index}`}
        data={data.recentReviews as Review[]}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderReview}
      />
    </Container>
  );
};

export default RecentReviews;
