import React from "react";
import { Modal, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: white;
  padding: 28px;
  align-items: center;
`;

const AddReviewModal: React.FC<{
  modalVisible: boolean;
  closeModal: () => void;
}> = ({ modalVisible, closeModal }) => {
  console.log(modalVisible);
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
        <Text>Add a review</Text>
      </Container>
    </Modal>
  );
};

export default AddReviewModal;
