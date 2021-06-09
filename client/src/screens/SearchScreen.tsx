import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { userLocationState } from "../atoms/userLocation";
import StyledText from "../components/StyledText";
import { COLORS } from "../constants/Colors";
import { DEFAULT_RESTAURANT_IMAGE } from "../constants/constants";
import {
  Restaurant,
  useSearchNearbyRestaurantsMutation,
} from "../generated/graphql";

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const RestaurantImage = styled.Image`
  width: 150px;
  height: 150px;
`;

const RestaurantContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0 20px;
  margin-right: 20px;
  width: 190px;
  margin-top: 15px;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const RestaurantRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchScreen = () => {
  const { navigate } = useNavigation();

  const [searchText, setSearchText] = useState("");

  const userLocation = useRecoilValue(userLocationState);

  const [{ data }, getRestaurants] = useSearchNearbyRestaurantsMutation();

  const searchRestaurants = () => {
    getRestaurants({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      keyword: searchText,
    });
  };

  console.log(data?.searchRestaurants);

  const renderItem: ListRenderItem<Restaurant> = ({ item }) => {
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
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: 15,
            width: "100%",
          }}
        >
          <StyledText fontSize={18} fontWeight={700}>
            {item.name}
          </StyledText>
          <RestaurantRating>
            <StyledText fontSize={16} style={{ marginRight: 5 }}>
              {item.rating}
            </StyledText>
            <Ionicons name="star" color={COLORS.YELLOW} size={20} />
          </RestaurantRating>
        </View>
      </RestaurantContainer>
    );
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <Container>
        <SearchContainer>
          <SearchBar
            platform="default"
            containerStyle={{ width: "100%", backgroundColor: COLORS.ORANGE }}
            placeholder="Enter keywords to search restaurants..."
            onChangeText={(search: string) => {
              setSearchText(search);
            }}
            style={{ backgroundColor: "white" }}
            inputStyle={{ backgroundColor: "white" }}
            inputContainerStyle={{
              backgroundColor: "white",
            }}
            leftIconContainerStyle={{
              backgroundColor: "white",
            }}
            value={searchText}
            onEndEditing={() => {
              searchRestaurants();
            }}
          />
        </SearchContainer>
        <FlatList
          keyExtractor={(item) => `search-${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          data={data?.searchRestaurants as Restaurant[]}
        />
      </Container>
    </SafeAreaView>
  );
};

export default SearchScreen;
