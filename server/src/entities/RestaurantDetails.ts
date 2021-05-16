import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RestaurantDetails {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  website: string;
}
