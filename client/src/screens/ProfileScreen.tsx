import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import Button from "../components/Button";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const Container = styled.View`
  flex: 1;
  align-items: "center";
  justify-content: "center";
  border: 1px solid red;
`;

const ProfileScreen = () => {
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const { navigate } = useNavigation();

  let body = null;

  if (fetching) {
    body = <Text>Your data is loading...</Text>;
  } else if (!data?.me) {
    body = <Text>You are not logged in!</Text>;
  } else {
    body = (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Hello, {data.me.username}</Text>{" "}
        <Button
          label="LOGOUT"
          onPress={() => {
            logout();
            navigate("Auth");
          }}
        ></Button>
      </View>
    );
  }

  return <Container>{body}</Container>;
};

export default ProfileScreen;
