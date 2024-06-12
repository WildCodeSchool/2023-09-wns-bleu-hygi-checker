import { Field, ObjectType, InputType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Url from "./url.entity";
import Campaign from "./campaign.entity";

@ObjectType()
@Entity()
export default class CampaignUrl extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field(() => Campaign)
  @ManyToOne(() => Campaign, (campaign) => campaign.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "campaign_id" })
  campaign: Campaign;

  @Field(() => Url)
  @ManyToOne(() => Url, (url) => url.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "url_id" })
  url: Url;
}

@InputType()
export class InputAddUrlToCampaign {
  @Field()
  url: string;

  @Field()
  campaignId: string;
}

@InputType()
export class InputDeleteUrlToCampaign {
  @Field()
  urlId: string;

  @Field()
  campaignId: string;
}
