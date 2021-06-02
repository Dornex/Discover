import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ListRenderItem, Text, FlatList } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { userLocationState } from "../../atoms/userLocation";
import { COLORS } from "../../constants/Colors";
import { DEFAULT_RESTAURANT_IMAGE } from "../../constants/constants";
import {
  Restaurant,
  useGetNearbyImportantRestaurantsQuery,
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

const NearbyExclusiveRestaurants = () => {
  const { navigate } = useNavigation();
  const userLocation = useRecoilValue(userLocationState);

  const [{ data }] = useGetNearbyImportantRestaurantsQuery({
    variables: {
      latitude: userLocation ? userLocation.coords.latitude : 0,
      longitude: userLocation ? userLocation.coords.longitude : 0,
    },
  });

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
        <RestaurantImage
          source={{
            uri: item.imageUrl ? item.imageUrl : DEFAULT_RESTAURANT_IMAGE,
          }}
        />
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
        fontWeight={700}
        fontSize={24}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginVertical: 10,
        }}
      >
        Exclusive Restaurants
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
          `nearby-exclusive-restaurants-${item.id}-${index}`
        }
        data={data.getNearbyImportantRestaurants as Restaurant[]}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderNearbyRestaurants}
      />
    </Container>
  );
};

export default NearbyExclusiveRestaurants;
