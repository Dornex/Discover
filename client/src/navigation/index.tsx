/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { useMeQuery } from "../generated/graphql";
import LoginScreen from "../screens/LoginScreen";

import RegisterScreen from "../screens/RegisterScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  const [{ fetching, data }] = useMeQuery();

  if (fetching) {
    return null;
  }

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator
        isLoggedIn={data?.me !== undefined && data.me !== null ? true : false}
      />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RestaurantNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Restaurant">
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Root" : "Auth"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Restaurant" component={RestaurantNavigator} />
    </Stack.Navigator>
  );
};
