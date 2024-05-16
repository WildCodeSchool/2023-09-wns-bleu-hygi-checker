import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type UrlType = "API" | "PAGE";

@ObjectType()
@Entity()
export default class Url extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  urlPath: string;

  @Field(() => String)
  @Column({
    type: "enum",
    enum: ["API", "PAGE"],
    default: "PAGE",
  })
  type: UrlType;
}

@InputType()
export class InputCreateUrl {
  @Field()
  urlPath: string;

  @Field(() => String)
  type: UrlType;
}
