import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity } from "typeorm";

@ObjectType()
@Entity()
export default class CheckUrl extends BaseEntity {
  @Field()
  @Column()
  status: number;

  @Field()
  @Column()
  statusText: string;

  @Field()
  @Column()
  responseTime: number;

  @Field()
  @Column()
  responseDate: string;

  // @Field()
  // @Column()
  // error?: string;
}
