import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Restaurant } from "../entities/Restaurant";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class RestaurantResolver {
  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return Restaurant.find();
  }

  @Query(() => Restaurant, { nullable: true })
  restaurant(
    @Arg("id", () => String) id: string
  ): Promise<Restaurant | undefined> {
    return Restaurant.findOne({ id });
  }

  @Query(() => Boolean) 
  async isFavourite(
    @Arg("id", () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean | null> {
    const user = await User.findOne(req.session.userId);

    if (user?.favouriteRestaurants.find((restaurantId) => restaurantId === id) !== undefined) {
      return true;
    }

    return false;
  }

  @Mutation(() => Boolean, {nullable: true})
  @UseMiddleware(isAuth)
  async toggleFavourite(
    @Arg("id", () => String!) id: string,
    @Ctx() {req}: MyContext
  ): Promise<Boolean | null> {
    const user = await User.findOne(req.session.userId);

    if (user === undefined) {
      return null;
    }

    let resp = false;

    if (user.favouriteRestaurants.length > 0 && user.favouriteRestaurants !== null) {
      if (user.favouriteRestaurants.find((restaurantId) => restaurantId === id) !== undefined) {
        user.favouriteRestaurants = user.favouriteRestaurants.filter((restaurantId) => restaurantId !== id);
      } else {
        user.favouriteRestaurants.push(id);
        resp = true;
      }
    }
    else {
      user.favouriteRestaurants.push(id);
      resp = true;
    }

    User.save(user);
    return resp;
  }
}
