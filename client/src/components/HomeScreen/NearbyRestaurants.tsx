import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ListRenderItem, Text, FlatList } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { userLocationState } from "../../atoms/userLocation";
import { COLORS } from "../../constants/Colors";
import {
  Restaurant,
  useGetNearbyRestaurantsMutation,
} from "../../generated/graphql";
import StyledText from "../StyledText";

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
  const userLocation = useRecoilValue(userLocationState);

  useEffect(() => {
    if (userLocation) {
      console.log(userLocation.coords);
      getNearbyRestaurants({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    }
  }, [userLocation]);

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
      <StyledText
        fontWeight={700}
        fontSize={24}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginVertical: 10,
        }}
      >
        Restaurants near you
      </StyledText>
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
        data={data.getNearbyRestaurants as Restaurant[]}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderNearbyRestaurants}
      />
    </Container>
  );
};

export default NearbyRestaurants;
