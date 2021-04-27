import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const HomeScreen = () => {
  return (
    <Container>
      <Text>This is the HomeScreen</Text>
    </Container>
  );
};

export default HomeScreen;
