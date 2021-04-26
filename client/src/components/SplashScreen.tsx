import React from "react";
import { Text } from "react-native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: "center";
  justify-content: "center";
`;

const SplashScreen = () => {
  return (
    <SafeAreaView>
      <Container>
        <Text>Discover</Text>
        <ActivityIndicator style={{ height: 80 }} />
      </Container>
    </SafeAreaView>
  );
};

export default SplashScreen;
