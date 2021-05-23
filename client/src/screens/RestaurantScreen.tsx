import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { COLORS } from "../constants/Colors";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/core";
import SwitchButton from "../components/SwitchButton";
import RestaurantDetailedInfo from "../components/RestaurantScreen/RestaurantDetailedInfo";
import {
  useGetDetailedRestaurantMutation,
  useGetRestaurantReviewsQuery,
} from "../generated/graphql";
import { PriceRange } from "../components/PriceRange";
import AddReviewModal from "../components/RestaurantScreen/AddReviewModal";
import StyledText from "../components/StyledText";
import RestaurantReviews from "../components/RestaurantScreen/RestaurantReviews";

const Container = styled.View`
  flex-direction: column;
`;

const RestaurantImageContainer = styled.View<{ height: number }>``;

const RestaurantImage = styled.Image<{ height: number }>`
  position: absolute;
  left: -150px;
  width: ${Dimensions.get("screen").width + 300}px;
  height: ${({ height }) => `${height}px`};
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  filter: brightness(50%);
`;

const RestaurantDetails = styled.View<{ height: number }>`
  padding: 25px 28px;
  height: ${({ height }) => `${height}px`};
  justify-content: center;
  align-items: center;
`;

const PriceRangeContainer = styled.View`
  flex-direction: row;
`;

const SectionSelectorContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;

const AddReviewContainer = styled.TouchableOpacity`
  flex-direction: row;
  border: 2px solid ${COLORS.ORANGE};
  padding: 5px;
  margin-top: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

enum SECTIONS {
  DETAILS,
  REVIEWS,
  MAP,
}

const RestaurantScreen: React.FC<{ route: any }> = ({ route }) => {
  const {
    restaurantId,
    name,
    longitude,
    latitude,
    rating,
    imageUrl,
    priceRange,
  }: {
    priceRange: number;
    restaurantId: string;
    name: string;
    longitude: number;
    latitude: number;
    rating: number;
    imageUrl: string;
  } = route.params;
  const { goBack } = useNavigation();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedSection, setSelectedSection] = useState<SECTIONS>(
    SECTIONS.DETAILS
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [{ data: reviews, fetching: reviewsFetching }] =
    useGetRestaurantReviewsQuery({
      variables: { id: restaurantId },
    });

  const [
    { data: detailedRestaurantData, fetching: detailedRestaurantFetching },
    getDetailedRestaurant,
  ] = useGetDetailedRestaurantMutation();

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => setImageSize({ width, height }));
    getDetailedRestaurant({ restaurantId });
  }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case SECTIONS.DETAILS: {
        if (detailedRestaurantFetching) {
          return <Text>Loading...</Text>;
        }
        return (
          <RestaurantDetailedInfo
            address={
              detailedRestaurantData === undefined
                ? ""
                : detailedRestaurantData.getDetailedRestaurant.address
            }
            phoneNumber={
              detailedRestaurantData === undefined
                ? ""
                : detailedRestaurantData?.getDetailedRestaurant.phoneNumber
            }
            priceLevel={priceRange}
            rating={rating}
            website={
              detailedRestaurantData === undefined
                ? ""
                : detailedRestaurantData?.getDetailedRestaurant.website
            }
          />
        );
      }
      case SECTIONS.REVIEWS:
        return (
          <RestaurantReviews
            reviews={
              reviews !== undefined &&
              reviews.restaurant !== undefined &&
              reviews.restaurant !== null
                ? reviews.restaurant.reviews
                : []
            }
          />
        );
      // case SECTIONS.MAP:
      //   return <RestaurantMap />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <Container style={{ width: Dimensions.get("screen").width }}>
        <RestaurantImageContainer
          height={
            (imageSize.height * Dimensions.get("screen").width) /
            imageSize.width
          }
        >
          <RestaurantImage
            height={
              (imageSize.height * Dimensions.get("screen").width) /
              imageSize.width
            }
            source={{ uri: imageUrl }}
          />
        </RestaurantImageContainer>

        <BackButton
          onPress={() => {
            goBack();
          }}
        />

        <RestaurantDetails
          height={
            (imageSize.height * Dimensions.get("screen").width) /
            imageSize.width
          }
        >
          <StyledText
            fontSize={25}
            fontWeight={700}
            color={COLORS.WHITE}
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {name}
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledText color={COLORS.WHITE} fontSize={18}>
              {rating}
              <Ionicons name="star" color={COLORS.WHITE} size={20} />
              {priceRange !== -1 ? (
                <>
                  <Text style={{ fontSize: 20, color: COLORS.WHITE }}> | </Text>
                  <PriceRangeContainer>
                    <PriceRange priceLevel={priceRange} />
                  </PriceRangeContainer>
                </>
              ) : null}
            </StyledText>
          </View>
          <AddReviewContainer
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <StyledText fontSize={16} fontWeight={700} color={COLORS.ORANGE}>
              + ADD REVIEW
            </StyledText>
          </AddReviewContainer>
        </RestaurantDetails>
        <SectionSelectorContainer>
          <SwitchButton
            active={selectedSection === SECTIONS.DETAILS}
            onPress={() => {
              setSelectedSection(SECTIONS.DETAILS);
            }}
            text="Details"
          />
          <SwitchButton
            active={selectedSection === SECTIONS.REVIEWS}
            onPress={() => {
              setSelectedSection(SECTIONS.REVIEWS);
            }}
            text="Reviews"
          />
          <SwitchButton
            active={selectedSection === SECTIONS.MAP}
            onPress={() => {
              setSelectedSection(SECTIONS.MAP);
            }}
            text="Map"
          />
        </SectionSelectorContainer>
        {renderContent()}
      </Container>
      <AddReviewModal
        restaurantId={restaurantId}
        closeModal={() => {
          setModalVisible(false);
          console.log("Closed the modal!");
        }}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
};

export default RestaurantScreen;
