import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CampaignUrl from "./campaignUrl.entity";

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

  @OneToMany(() => CampaignUrl, (campaignUrl) => campaignUrl.url, {
    onDelete: "CASCADE",
  }) // Here is the onDelete option
  campaignUrl: CampaignUrl[];
}

@InputType()
export class InputCreateUrl {
  @Field()
  urlPath: string;

  @Field(() => String)
  type: UrlType;

  @Field(() => [Number])
  campaignIds: number[];
}
