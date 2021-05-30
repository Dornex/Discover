import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FavouriteRestaurants from "../components/HomeScreen/FavouriteRestaurants";
import HomeScreenHeader from "../components/HomeScreen/HomeScreenHeader";
import NearbyRestaurants from "../components/HomeScreen/NearbyRestaurants";
import RecentReviews from "../components/HomeScreen/RecentReviews";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <HomeScreenHeader />
      <RecentReviews />
      <NearbyRestaurants />
      <FavouriteRestaurants />
    </SafeAreaView>
  );
};

export default HomeScreen;
