import React from "react";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  border: 1px solid "#858585";
  border-radius: 5px;
  flex: 1;
`;

const StyledTextInput: React.FC<{
  placeholder: string;
  value: string;
  onChangeText: any;
  onBlur?: () => void;
}> = ({ placeholder, onChangeText }) => {
  const textInputStyle = {} as TextInputProps;

  return (
    <Container>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#858585"
        style={textInputStyle}
      />
    </Container>
  );
};

export default StyledTextInput;
