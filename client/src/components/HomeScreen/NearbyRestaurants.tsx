import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ListRenderItem, View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import {
  Restaurant,
  useGetNearbyRestaurantsMutation,
} from "../../generated/graphql";

const Container = styled.View``;

const RestaurantImage = styled.Image`
  width: 150px;
  height: 150px;
`;

const RestaurantContainer = styled.TouchableOpacity`
  flex-direction: column;
  padding: 0 20px;
  margin-right: 20px;
  width: 190px;
  height: 100%;
  justify-content: flex-start;
`;

const RestaurantRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NearbyRestaurants = () => {
  const { navigate } = useNavigation();

  const [{ data }, getNearbyRestaurants] = useGetNearbyRestaurantsMutation();

  useEffect(() => {
    getNearbyRestaurants({ latitude: 44.434486, longitude: 26.086292 });
  }, []);

  const renderNearbyRestaurants: ListRenderItem<Restaurant> = ({ item }) => {
    return (
      <RestaurantContainer
        onPress={() => {
          navigate("Restaurant", {
            screen: "Restaurant",
            params: {
              restaurantId: item.id,
              name: item.name,
              latitude: item.latitude,
              longitude: item.longitude,
              rating: item.rating,
              imageUrl: item.imageUrl,
              priceRange: item.priceRange,
            },
          });
        }}
      >
        <RestaurantImage source={{ uri: item.imageUrl }} />
        <Text>{item.name}</Text>
        <RestaurantRating>
          <Text style={{ fontSize: 20 }}>{item.rating}</Text>
          <Ionicons name="star" color={COLORS.YELLOW} size={20} />
        </RestaurantRating>
      </RestaurantContainer>
    );
  };

  const NearbyRestaurantsHeader = () => {
    return (
      <Text
        style={{
          fontSize: 24,
          marginLeft: 20,
          marginRight: 20,
          marginVertical: 10,
        }}
      >
        Restaurants near you
      </Text>
    );
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <NearbyRestaurantsHeader />
      <FlatList
        keyExtractor={(item, index) => `nearby-restaurants-${item.id}-${index}`}
        data={data.getNearbyRestaurants}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderNearbyRestaurants}
      />
    </Container>
  );
};

export default NearbyRestaurants;
