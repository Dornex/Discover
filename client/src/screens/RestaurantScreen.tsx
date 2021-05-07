import React from "react";
import { View } from "react-native";

const RestaurantScreen: React.FC<{ route: any }> = ({ route }) => {
  console.log("Route:", route);
  const { restaurantId } = route.params;

  console.log(restaurantId);

  return <View></View>;
};

export default RestaurantScreen;
