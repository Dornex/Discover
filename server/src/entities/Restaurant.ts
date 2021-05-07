import { ObjectType, Field, Float } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class Restaurant extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => Float)
  @Column("decimal", { precision: 7, scale: 2 })
  latitude!: number;

  @Field(() => Float)
  @Column("decimal", { precision: 7, scale: 2 })
  longitude!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Float)
  rating!: number;

  @Field(() => String)
  imageUrl: string;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
