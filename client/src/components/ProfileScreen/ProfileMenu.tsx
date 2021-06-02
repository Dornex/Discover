import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";
import MenuItem from "./MenuItem";

const Container = styled.View`
  width: 100%;
`;
const ProfileMenu: React.FC = () => {
  return (
    <Container>
      <MenuItem
        name="Your Reviews"
        withBorder
        children={<MaterialIcons name="rate-review" size={24} color="black" />}
      />
      <MenuItem
        name="Change Password"
        withBorder
        children={
          <Ionicons name="ios-lock-closed-sharp" size={24} color="black" />
        }
      />
      <MenuItem
        name="Logout"
        children={<MaterialIcons name="logout" size={24} color="black" />}
      />
    </Container>
  );
};

export default ProfileMenu;
