/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/Colors";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

const BottomTab = createBottomTabNavigator();

const SearchContainer = styled.View`
  width: 56px;
  height: 56px;
  align-items: center;
  background-color: ${COLORS.ORANGE};
  border: 1px solid white;
  border-radius: 28px;
  justify-content: center;
`;

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: COLORS.ORANGE,
        style: {
          borderTopColor: "rgba(0, 0, 0, 0)",
        },
      }}
    >
      <BottomTab.Screen
        name="Discover"
        component={HomescreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return (
              <SearchContainer>
                <FontAwesome name="search" size={24} color={COLORS.WHITE} />
              </SearchContainer>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-details"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomescreenStack = createStackNavigator();

function HomescreenNavigator() {
  return (
    <HomescreenStack.Navigator>
      <HomescreenStack.Screen
        name="MainScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomescreenStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
