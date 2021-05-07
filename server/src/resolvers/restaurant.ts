import { Arg, Query, Resolver } from "type-graphql";
import { Restaurant } from "../entities/Restaurant";

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
}
