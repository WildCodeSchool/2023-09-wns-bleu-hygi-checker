// `/entities/url.entity.ts`

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

@ObjectType()
export class UrlResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Url, { nullable: true })
  url?: Url;
}

/**----------------------
 **      Input Types
 *------------------------**/
@InputType()
export class InputCreateUrl {
  @Field()
  urlPath: string;

  @Field(() => String)
  type: UrlType;
}

@InputType()
export class InputCheckRoute {
  @Field()
  id: number;
}
