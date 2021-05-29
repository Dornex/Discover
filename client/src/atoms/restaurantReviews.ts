import { atom } from "recoil";
import { Review } from "../generated/graphql";

export const restaurantReviewsState = atom<Review[]>({
    key: "restaurantReviews",
    default: []
})