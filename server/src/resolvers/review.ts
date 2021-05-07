import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Review } from "../entities/Review";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class ReviewInput {
  @Field()
  restaurantId: string;

  @Field()
  title: string;

  @Field()
  content: string;
}

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  reviews(): Promise<Review[]> {
    return Review.find();
  }

  @Query(() => Review, { nullable: true })
  review(@Arg("id", () => Int) id: number): Promise<Review | undefined> {
    return Review.findOne(id);
  }

  @Mutation(() => Review)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg("input") input: ReviewInput,
    @Ctx() { req }: MyContext
  ): Promise<Review> {
    return Review.create({
      ...input,
      creatorId: req.session.userId,
      restaurantId: input.restaurantId,
    }).save();
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Review | null> {
    const review = await Review.findOne(id);
    if (!review) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Review.update({ id }, { title });
    }

    return review;
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Review.delete(id);
    return true;
  }
}
