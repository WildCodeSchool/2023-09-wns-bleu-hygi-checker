import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CampaignUrl from "./campaignUrl.entity";

@ObjectType()
@Entity()
export default class Response extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  uuid: number;

  @Field()
  @Column()
  responseTime: number;

  @Field()
  @Column()
  statusCode: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @Column({ name: "campaign_url_id" })
  campaignUrlId: number;

  @ManyToOne(() => CampaignUrl, { onDelete: "CASCADE" })
  @JoinColumn({ name: "campaign_url_id" })
  campaignUrl: CampaignUrl;
}

@InputType()
export class InputCreateResponse {
  @Field()
  responseTime: number;

  @Field()
  statusCode: string;

  @Field()
  createdAt: Date;

  @Field()
  campaignUrlId: number;
}
