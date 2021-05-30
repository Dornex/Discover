import { ObjectType, Field, Float, Int } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class Restaurant extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn()
  id!: string;

  @Field(() => Float)
  @Column("decimal", { precision: 17, scale: 8 })
  latitude!: number;

  @Field(() => Float)
  @Column("decimal", { precision: 17, scale: 8 })
  longitude!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Float, {defaultValue: 1})
  rating!: number;

  @Field(() => String, {defaultValue: ''})
  imageUrl: string;

  @Field(() => Int, {defaultValue: 1})
  priceRange!: number;

  @RelationId((restaurant: Restaurant) => restaurant.reviews)
  reviewIds: number[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.restaurant)
  @TypeormLoader(() => Review, (restaurant: Restaurant) => restaurant.reviewIds)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
