import { Language } from "@googlemaps/google-maps-services-js";
import { PlacesNearbyRanking } from "@googlemaps/google-maps-services-js/dist/places/placesnearby";
import { Arg, Ctx, Float, Mutation, Query, Resolver } from "type-graphql";
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
        language: Language.ro,
        rankby: PlacesNearbyRanking.distance
      },
    });

    const restaurants = nearbyPlaces.data.results.map(async (place) => {
      let foundRestaurant = await Restaurant.findOne(place.place_id);

      if (foundRestaurant) {
        return {
          id: place.place_id,
          latitude: place.geometry?.location.lat,
          longitude: place.geometry?.location.lng,
          name: place.name,
          rating: place.rating,
          imageUrl: foundRestaurant.imageUrl,
          priceRange: place.price_level !== undefined ? place.price_level : -1,
        };
      }

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

      getConnection()
      .createQueryBuilder()
      .insert()
      .into(Restaurant)
      .values({
        id: place.place_id,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        name: place.name,
        imageUrl: photo ? photo.data.responseUrl : "",
        rating: place.rating !== undefined ? place.rating : 1,
        priceRange: place.price_level !== undefined ? place.price_level : -1
      })
      .onConflict(`("id") DO NOTHING`)
      .execute();

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

  @Mutation(() => [Restaurant], { nullable: true })
  async searchRestaurants(
    @Arg("latitude", () => Float) latitude: number,
    @Arg("longitude", () => Float) longitude: number,
    @Arg("keyword", () => String) keyword: string,
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
        language: Language.ro,
        keyword,
        rankby: PlacesNearbyRanking.distance
      },
    });

    const restaurants = nearbyPlaces.data.results.map(async (place) => {
      let foundRestaurant = await Restaurant.findOne(place.place_id);

      if (foundRestaurant) {
        return {
          id: place.place_id,
          latitude: place.geometry?.location.lat,
          longitude: place.geometry?.location.lng,
          name: place.name,
          rating: place.rating,
          imageUrl: foundRestaurant.imageUrl,
          priceRange: place.price_level !== undefined ? place.price_level : -1,
        };
      }

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

      getConnection()
      .createQueryBuilder()
      .insert()
      .into(Restaurant)
      .values({
        id: place.place_id,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        name: place.name,
        imageUrl: photo ? photo.data.responseUrl : "",
        rating: place.rating !== undefined ? place.rating : 1,
        priceRange: place.price_level !== undefined ? place.price_level : -1
      })
      .onConflict(`("id") DO NOTHING`)
      .execute();

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

  @Query(() => [Restaurant], { nullable: true })
  async getNearbyImportantRestaurants(
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
        radius: 25000,
        language: Language.ro,
      },
    });

    const restaurants = nearbyPlaces.data.results.map(async (place) => {
      let foundRestaurant = await Restaurant.findOne(place.place_id);

      if (foundRestaurant) {
        return {
          id: place.place_id,
          latitude: place.geometry?.location.lat,
          longitude: place.geometry?.location.lng,
          name: place.name,
          rating: place.rating,
          imageUrl: foundRestaurant.imageUrl,
          priceRange: place.price_level !== undefined ? place.price_level : -1,
        };
      }

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

      getConnection()
      .createQueryBuilder()
      .insert()
      .into(Restaurant)
      .values({
        id: place.place_id,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        name: place.name,
        imageUrl: photo ? photo.data.responseUrl : "",
        rating: place.rating !== undefined ? place.rating : 1,
        priceRange: place.price_level !== undefined ? place.price_level : -1
      })
      .onConflict(`("id") DO NOTHING`)
      .execute();

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
