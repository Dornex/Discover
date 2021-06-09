import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { favouriteRestaurantsState } from "../../atoms/favouriteRestaurants";
import { useLogoutMutation } from "../../generated/graphql";
import MenuItem from "./MenuItem";

const Container = styled.View`
  width: 100%;
`;
const ProfileMenu: React.FC = () => {
  const { navigate } = useNavigation();

  const [, logout] = useLogoutMutation();

  const setFavouriteRestaurants = useSetRecoilState(favouriteRestaurantsState);

  return (
    <Container>
      <MenuItem
        name="Change Password"
        withBorder
        children={
          <Ionicons name="ios-lock-closed-sharp" size={24} color="black" />
        }
        onPress={() => {
          navigate("ChangePassword");
        }}
      />
      <MenuItem
        onPress={() => {
          logout();
          setFavouriteRestaurants([]);
          navigate("Auth", { screen: "LoginScreen" });
        }}
        name="Logout"
        children={<MaterialIcons name="logout" size={24} color="black" />}
      />
    </Container>
  );
};

export default ProfileMenu;
