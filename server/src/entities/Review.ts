import { ObjectType, Field, Int } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ type: "int", default: 1 })
  points!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  restaurantId: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  @TypeormLoader(() => Restaurant, (review: Review) => review.restaurantId)
  restaurant: Restaurant;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.reviews)
  @TypeormLoader(() => User, (review: Review) => review.creatorId)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
