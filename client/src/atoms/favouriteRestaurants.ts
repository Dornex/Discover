import { atom } from "recoil";
import { Restaurant } from "../generated/graphql";

export const favouriteRestaurantsState = atom<Restaurant[]>({
    key: "favouriteRestaurantsState",
    default: []
})