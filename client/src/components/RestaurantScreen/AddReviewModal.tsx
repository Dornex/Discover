import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, TextInput, View } from "react-native";
import { Modal, Text } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { restaurantReviewsState } from "../../atoms/restaurantReviews";
import { COLORS } from "../../constants/Colors";
import { Review, useCreateReviewMutation } from "../../generated/graphql";
import Button from "../Button";
import Rating from "../Rating";
import StyledText from "../StyledText";

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
  background-color: white;
  padding: 10px 28px;
  align-items: center;
  width: ${() => Dimensions.get("screen").width - 30}px;
  border-radius: 10px;
`;

const AddReviewModal: React.FC<{
  restaurantId: string;
  modalVisible: boolean;
  closeModal: () => void;
}> = ({ modalVisible, closeModal, restaurantId }) => {
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [{ data, fetching }, createReview] = useCreateReviewMutation();

  const [restaurantReviews, setRestaurantReviews] = useRecoilState(
    restaurantReviewsState
  );

  const handleButtonPress = async () => {
    createReview({
      input: { content: review, restaurantId, title, points: rating },
    }).then((review) => {
      setRestaurantReviews([
        ...restaurantReviews,
        { ...review.data?.createReview } as Review,
      ]);
      closeModal();
    });
  };

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      transparent
      animationType="fade"
    >
      <MainContainer>
        <Container>
          <Ionicons
            name="close"
            size={30}
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={() => {
              closeModal();
            }}
          />
          <StyledText fontSize={20} fontWeight={700}>
            Add a review
          </StyledText>

          <StyledText fontSize={16} style={{ marginTop: 15, marginBottom: 5 }}>
            Set the review title
          </StyledText>
          <TextInput
            autoCompleteType="off"
            autoCorrect={false}
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={{
              fontSize: 14,
              width: "70%",
              borderColor: COLORS.GRAY,
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: "solid",
              padding: 1,
            }}
            numberOfLines={1}
          />

          <StyledText style={{ marginTop: 20, marginBottom: 5 }} fontSize={16}>
            Choose rating
          </StyledText>
          <Rating numberOfStars={5} rating={rating} setRating={setRating} />
          <StyledText fontSize={16} style={{ marginTop: 20, marginBottom: 5 }}>
            Tell us about the restaurant
          </StyledText>
          <TextInput
            multiline={true}
            autoCompleteType="off"
            autoCorrect={false}
            value={review}
            onChangeText={(text) => setReview(text)}
            style={{
              fontSize: 14,
              width: "90%",
              borderColor: COLORS.GRAY,
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: "solid",
              padding: 1,
            }}
            numberOfLines={7}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              label="Add review"
              onPress={handleButtonPress}
              width={200}
              height={30}
              fontSize={16}
            />
          </View>
        </Container>
      </MainContainer>
    </Modal>
  );
};

export default AddReviewModal;
