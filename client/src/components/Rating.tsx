import { Ionicons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/Colors";

const STAR_SIZE = 28;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface IRating {
  rating: number;
  setRating: (idx: number) => void;
  numberOfStars: number;
}

interface IStar {
  index: number;
  setRating: (rating: number) => void;
}

const FullStar: React.FC<IStar> = ({ index, setRating }) => {
  return (
    <Ionicons
      onPress={() => {
        setRating(index);
      }}
      style={{ padding: 3 }}
      name="star"
      color={COLORS.BRIGHT_YELLOW}
      size={STAR_SIZE}
    />
  );
};

const EmptyStar: React.FC<IStar> = ({ index, setRating }) => {
  return (
    <Ionicons
      onPress={() => {
        setRating(index);
      }}
      style={{ padding: 3 }}
      name="star"
      color={COLORS.GRAY}
      size={STAR_SIZE}
    />
  );
};

const Rating: React.FC<IRating> = ({ rating, setRating, numberOfStars }) => {
  const renderStars = () => {
    const starsArr = new Array(numberOfStars).fill(0).map((_, index) => {
      return index;
    });
    return (
      <>
        {starsArr.map((value) => {
          if (value < rating) {
            return (
              <FullStar
                key={`full-star-${value}`}
                index={value + 1}
                setRating={setRating}
              />
            );
          } else {
            return (
              <EmptyStar
                key={`empty-start-${value}`}
                index={value + 1}
                setRating={setRating}
              />
            );
          }
        })}
      </>
    );
  };

  return <Container>{renderStars()}</Container>;
};

export default Rating;
