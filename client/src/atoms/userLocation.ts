import { LocationObject } from "expo-location";
import { atom } from "recoil";

export const userLocationState = atom<LocationObject>({
    key: "userLocationState",
    default: null
})