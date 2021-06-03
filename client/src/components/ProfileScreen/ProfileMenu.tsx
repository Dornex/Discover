import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import { useLogoutMutation } from "../../generated/graphql";
import MenuItem from "./MenuItem";

const Container = styled.View`
  width: 100%;
`;
const ProfileMenu: React.FC = () => {
  const { navigate } = useNavigation();

  const [, logout] = useLogoutMutation();

  return (
    <Container>
      <MenuItem
        name="Change Password"
        withBorder
        children={
          <Ionicons name="ios-lock-closed-sharp" size={24} color="black" />
        }
      />
      <MenuItem
        onPress={() => {
          logout();
          navigate("LoginScreen");
        }}
        name="Logout"
        children={<MaterialIcons name="logout" size={24} color="black" />}
      />
    </Container>
  );
};

export default ProfileMenu;
