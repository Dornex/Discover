import { Arg, Ctx, Float, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { GOOGLE_API_KEY } from "../constants";
import { Restaurant } from "../entities/Restaurant";
import { MyContext } from "../types";

@Resolver()
export class GoogleMapsResolver {
  @Query(() => [Restaurant], { nullable: true })
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
      };
    });

    return restaurants;
  }
}
