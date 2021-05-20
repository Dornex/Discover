import React, { useState } from "react";
import { Dimensions, TextInput, View } from "react-native";
import { Modal, Text } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { useCreateReviewMutation } from "../../generated/graphql";
import Button from "../Button";
import Rating from "../Rating";
import StyledText from "../StyledText";

const Container = styled.View`
  background-color: white;
  padding: 10px 28px;
  align-items: center;
  width: ${() => Dimensions.get("screen").width}px;
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

  const handleButtonPress = async () => {
    console.log("Restaurant Id:", restaurantId);
    createReview({ input: { content: review, restaurantId, title } }).then(
      () => {
        closeModal();
      }
    );
  };

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}
      transparent
      animationType="fade"
    >
      <Container>
        <StyledText fontSize={18} fontWeight={700}>
          Add a review
        </StyledText>

        <StyledText fontSize={14} style={{ marginTop: 15, marginBottom: 5 }}>
          Set the review title
        </StyledText>
        <TextInput
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

        <StyledText style={{ marginTop: 20, marginBottom: 5 }} fontSize={14}>
          Choose rating
        </StyledText>
        <Rating numberOfStars={5} rating={rating} setRating={setRating} />
        <StyledText fontSize={14} style={{ marginTop: 20, marginBottom: 5 }}>
          Tell us about the restaurant
        </StyledText>
        <TextInput
          multiline={true}
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
          <Button label="Add review" onPress={handleButtonPress} />
        </View>
      </Container>
    </Modal>
  );
};

export default AddReviewModal;
