import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

const Container = styled.View`
  width: 100%;
`;

const HomeScreenHeader = () => {
  return (
    <Container>
      <Image
        source={require("../../assets/images/logo-text.png")}
        style={{ width: 140, height: 50, marginLeft: 10 }}
        resizeMode="contain"
      />
    </Container>
  );
};

export default HomeScreenHeader;
