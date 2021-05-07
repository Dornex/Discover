import React from "react";
import styled from "styled-components/native";
import HomeScreenHeader from "../components/HomeScreen/HomeScreenHeader";
import NearbyRestaurants from "../components/HomeScreen/NearbyRestaurants";

const Container = styled.View`
  flex: 1;
`;

const HomeScreen = () => {
  return (
    <Container>
      <HomeScreenHeader />
      <NearbyRestaurants />
    </Container>
  );
};

export default HomeScreen;
