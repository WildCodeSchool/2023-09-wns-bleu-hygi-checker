import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Campaign from "./campaign.entity";

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

  @Field(() => [Campaign], { nullable: true })
  @ManyToMany(() => Campaign, (campaign) => campaign.urls, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "url_campaign",
    joinColumn: {
      name: "url",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "campaign",
      referencedColumnName: "id",
    },
  })
  campaigns: Campaign[];
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
