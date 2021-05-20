import { ObjectType, Field, Int } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
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
  @Column({ type: "int", default: 0 })
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

  @ManyToOne(() => User, (user) => user.reviews)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
