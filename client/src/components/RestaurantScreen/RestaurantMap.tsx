import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { userLocationState } from "../../atoms/userLocation";
import { COLORS } from "../../constants/Colors";
import StyledText from "../StyledText";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const DirectionsButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const RestaurantMap: React.FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const ref = useRef<MapView>(null);
  const userLocation = useRecoilValue(userLocationState);

  return (
    <Container>
      <MapView
        style={{ width: Dimensions.get("window").width, height: 500 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        ref={ref}
      >
        <Marker coordinate={{ latitude, longitude }} />
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
        />

        <MapViewDirections
          origin={{ latitude, longitude }}
          apikey="AIzaSyAsUFhBf-Nh3zXO5IVSmqdZymXOfQrk7KE"
          mode="TRANSIT"
          destination={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
          strokeColor={COLORS.ORANGE}
          strokeWidth={3}
        />
      </MapView>
      <DirectionsButtonContainer
        onPress={() => {
          //   handleGetDirections();
        }}
      >
        <FontAwesome5 name="walking" size={30} color="black" />
      </DirectionsButtonContainer>
    </Container>
  );
};

export default RestaurantMap;
