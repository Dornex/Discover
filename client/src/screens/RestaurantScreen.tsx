import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { COLORS } from "../constants/Colors";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/core";
import SwitchButton from "../components/SwitchButton";
import RestaurantDetailedInfo from "../components/RestaurantScreen/RestaurantDetailedInfo";
import {
  Review,
  useGetDetailedRestaurantMutation,
  useGetRestaurantReviewsQuery,
  useIsRestaurantFavouriteQuery,
  useToggleFavouriteMutation,
} from "../generated/graphql";
import { PriceRange } from "../components/PriceRange";
import AddReviewModal from "../components/RestaurantScreen/AddReviewModal";
import StyledText from "../components/StyledText";
import RestaurantReviews from "../components/RestaurantScreen/RestaurantReviews";
import { useRecoilState, useSetRecoilState } from "recoil";
import { restaurantReviewsState } from "../atoms/restaurantReviews";
import { favouriteRestaurantsState } from "../atoms/favouriteRestaurants";
import RestaurantMap from "../components/RestaurantScreen/RestaurantMap";
import { DEFAULT_RESTAURANT_IMAGE } from "../constants/constants";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

const RestaurantImageContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.9);
`;

const RestaurantImage = styled.ImageBackground`
  position: absolute;
  width: ${Dimensions.get("screen").width}px;
  height: 250px;
  border-radius: 50px;
`;

const RestaurantDetails = styled.View`
  padding: 25px 28px;
  height: 250px;
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

  //#region State
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [selectedSection, setSelectedSection] = useState<SECTIONS>(
    SECTIONS.DETAILS
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  //#endregion

  //#region Recoil State
  const setRestaurantReviews = useSetRecoilState(restaurantReviewsState);
  const [favouriteRestaurants, setFavouriteRestaurants] = useRecoilState(
    favouriteRestaurantsState
  );
  //#endregion

  //#region GRAPHQL
  const [{ data: reviews }] = useGetRestaurantReviewsQuery({
    variables: { id: restaurantId },
  });
  const [
    { data: detailedRestaurantData, fetching: detailedRestaurantFetching },
    getDetailedRestaurant,
  ] = useGetDetailedRestaurantMutation();
  const [, toggleFavourite] = useToggleFavouriteMutation();
  const [{ data: isFavouriteData }] = useIsRestaurantFavouriteQuery({
    variables: { id: restaurantId },
  });
  //#endregion

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => setImageSize({ width, height }));
    getDetailedRestaurant({ restaurantId });
  }, []);

  useEffect(() => {
    if (isFavouriteData && isFavouriteData?.isFavourite !== null) {
      setIsFavourite(isFavouriteData.isFavourite);
    }
  }, [isFavouriteData?.isFavourite]);

  useEffect(() => {
    if (
      reviews !== undefined &&
      reviews.restaurant !== undefined &&
      reviews &&
      reviews.restaurant
    ) {
      setRestaurantReviews(reviews.restaurant.reviews as Review[]);
    }
  }, [reviews]);

  const handleFavouriteState = () => {
    if (isFavourite) {
      setFavouriteRestaurants([
        ...favouriteRestaurants.filter((rest) => rest.id !== restaurantId),
      ]);
    } else {
      setFavouriteRestaurants([
        ...favouriteRestaurants,
        {
          id: restaurantId,
          name,
          longitude,
          latitude,
          rating,
          imageUrl,
          priceRange,
          updatedAt: "",
          createdAt: "",
          reviews: [],
        },
      ]);
    }
  };

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
              reviews !== null &&
              reviews.restaurant !== undefined &&
              reviews.restaurant !== null
                ? (reviews.restaurant.reviews as Review[])
                : []
            }
          />
        );
      case SECTIONS.MAP:
        return <RestaurantMap latitude={latitude} longitude={longitude} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <RestaurantImageContainer>
          <RestaurantImage
            resizeMode="cover"
            source={{ uri: imageUrl || DEFAULT_RESTAURANT_IMAGE }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, .6)",
              }}
            ></View>
          </RestaurantImage>
        </RestaurantImageContainer>

        <BackButton
          onPress={() => {
            goBack();
          }}
        />

        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 10, zIndex: 10 }}
          hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}
          onPress={() => {
            toggleFavourite({ id: restaurantId });
            setIsFavourite(!isFavourite);
            handleFavouriteState();
          }}
        >
          <AntDesign
            name="heart"
            size={26}
            color={isFavourite ? COLORS.ORANGE : COLORS.WHITE}
          />
        </TouchableOpacity>

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
            <StyledText color={COLORS.WHITE} fontSize={20}>
              {rating} <Ionicons name="star" color={COLORS.WHITE} size={24} />
              {priceRange !== -1 ? (
                <>
                  <StyledText fontSize={20} color={COLORS.WHITE}>
                    {" "}
                    |{" "}
                  </StyledText>
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
        }}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
};

export default RestaurantScreen;
