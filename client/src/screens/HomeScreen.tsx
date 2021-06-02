import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FavouriteRestaurants from "../components/HomeScreen/FavouriteRestaurants";
import HomeScreenHeader from "../components/HomeScreen/HomeScreenHeader";
import NearbyRestaurants from "../components/HomeScreen/NearbyRestaurants";
import RecentReviews from "../components/HomeScreen/RecentReviews";
import * as Location from "expo-location";
import { useSetRecoilState } from "recoil";
import { userLocationState } from "../atoms/userLocation";

const HomeScreen = () => {
  const setUserLocation = useSetRecoilState(userLocationState);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    } else {
      const userLocation = await Location.getCurrentPositionAsync();
      setUserLocation(userLocation);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

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
