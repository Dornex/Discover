import React from "react";
import styled from "styled-components/native";
import { ImageBackground } from "react-native";
import BackgroundImage from "../../assets/images/profile.jpeg";
import StyledText from "../StyledText";
import { COLORS } from "../../constants/Colors";
import { useMeQuery } from "../../generated/graphql";

const Container = styled.View`
  width: 100%;
`;

const BackgroundImageContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const NameContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ProfileHeader: React.FC = () => {
  const [{ data }] = useMeQuery();

  return (
    <Container>
      <StyledText
        fontWeight={700}
        fontSize={18}
        style={{ marginBottom: 10, marginLeft: 10 }}
      >
        MY PROFILE
      </StyledText>

      <ImageBackground
        resizeMode="cover"
        source={BackgroundImage}
        style={{
          height: 100,
          width: "100%",
        }}
      >
        <BackgroundImageContainer>
          <NameContainer>
            <StyledText
              fontFamily="Roboto Condensed"
              fontSize={20}
              color={COLORS.WHITE}
              fontWeight="bold"
            >
              {data?.me?.username || ""}
            </StyledText>
            {/* <StyledText
              fontFamily="Roboto Condensed"
              fontSize={14}
              color={COLORS.WHITE}
            >
              eduard@snkrsden.com
            </StyledText> */}
          </NameContainer>
        </BackgroundImageContainer>
      </ImageBackground>
    </Container>
  );
};

export default ProfileHeader;
