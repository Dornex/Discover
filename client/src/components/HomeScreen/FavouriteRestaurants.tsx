import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ListRenderItem, Text, FlatList } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { favouriteRestaurantsState } from "../../atoms/favouriteRestaurants";
import { COLORS } from "../../constants/Colors";
import {
  Restaurant,
  useGetFavouriteRestaurantsQuery,
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

const FavouriteRestaurants = () => {
  const { navigate } = useNavigation();

  const [once, setOnce] = useState(true);

  const [{ data }] = useGetFavouriteRestaurantsQuery();

  const [favouriteRestaurants, setFavouriteRestaurants] = useRecoilState(
    favouriteRestaurantsState
  );

  useEffect(() => {
    if (data?.getFavouriteRestaurants && once) {
      setFavouriteRestaurants(data.getFavouriteRestaurants as Restaurant[]);
      setOnce(false);
    }
  }, [data]);

  const renderFavouriteRestaurant: ListRenderItem<Restaurant> = ({ item }) => {
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
        <RestaurantImage source={{ uri: item.imageUrl ? item.imageUrl : "" }} />
        <StyledText
          fontSize={14}
          fontWeight={600}
          style={{ marginVertical: 5 }}
        >
          {item.name}
        </StyledText>
        <RestaurantRating>
          <StyledText fontSize={14} style={{ marginRight: 5 }}>
            {item.rating}
          </StyledText>
          <Ionicons name="star" color={COLORS.YELLOW} size={18} />
        </RestaurantRating>
      </RestaurantContainer>
    );
  };

  const NearbyRestaurantsHeader = () => {
    return (
      <StyledText
        fontSize={24}
        fontWeight={700}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginVertical: 10,
        }}
      >
        Favourite Restaurants
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
        keyExtractor={(item, index) =>
          `favourite-restaurants-${item.id}-${index}`
        }
        data={favouriteRestaurants}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderFavouriteRestaurant}
      />
    </Container>
  );
};

export default FavouriteRestaurants;
