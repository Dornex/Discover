import { Arg, Ctx, Float, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { GOOGLE_API_KEY } from "../constants";
import { Restaurant } from "../entities/Restaurant";
import { RestaurantDetails } from "../entities/RestaurantDetails";
import { MyContext } from "../types";

@Resolver()
export class GoogleMapsResolver {
  @Mutation(() => [Restaurant], { nullable: true })
  async getNearbyRestaurants(
    @Arg("latitude", () => Float) latitude: number,
    @Arg("longitude", () => Float) longitude: number,
    @Ctx() { googleClient }: MyContext
  ) {
    const nearbyPlaces = await googleClient.placesNearby({
      params: {
        location: {
          latitude,
          longitude,
        },
        key: GOOGLE_API_KEY,
        type: "restaurant",
        radius: 10500,
      },
    });

    const restaurants = nearbyPlaces.data.results.map(async (place) => {
      getConnection()
        .createQueryBuilder()
        .insert()
        .into(Restaurant)
        .values({
          id: place.place_id,
          latitude: place.geometry?.location.lat,
          longitude: place.geometry?.location.lng,
          name: place.name,
        })
        .onConflict(`("id") DO NOTHING`)
        .execute();

      let photo;
      if (place.photos !== undefined) {
        photo = await googleClient.placePhoto({
          params: {
            photoreference: place.photos[0].photo_reference,
            maxheight: 500,
            maxwidth: 500,
            key: GOOGLE_API_KEY,
          },
          responseType: "stream",
        });
      }

      return {
        id: place.place_id,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        name: place.name,
        rating: place.rating,
        imageUrl: photo ? photo.data.responseUrl : "",
        priceRange: place.price_level !== undefined ? place.price_level : -1,
      };
    });

    return restaurants;
  }

  @Mutation(() => RestaurantDetails)
  async getDetailedRestaurant(
    @Arg("restaurantId", () => String) restaurantId: string,
    @Ctx() { googleClient }: MyContext
  ) {
    const restaurantDetails = await googleClient.placeDetails({
      params: {
        key: GOOGLE_API_KEY,
        place_id: restaurantId,
        fields: ["formatted_address", "formatted_phone_number", "website"],
      },
    });

    return {
      id: restaurantId,
      address: restaurantDetails.data.result.formatted_address,
      phoneNumber: restaurantDetails.data.result.formatted_phone_number,
      website: restaurantDetails.data.result.website,
    };
  }
}
