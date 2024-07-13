import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CampaignUrl from "./campaignUrl.entity";

@ObjectType()
@Entity()
export default class Response extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  responseTime: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  statusCode: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  statusText: string;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field(() => CampaignUrl)
  @ManyToOne(() => CampaignUrl, { onDelete: "CASCADE" })
  campaignUrl: CampaignUrl;
}

@InputType()
export class InputCreateResponse {
  @Field()
  responseTime: number;

  @Field()
  statusCode: number;

  @Field()
  statusText: string;

  @Field()
  campaignUrlId: number;

  @Field()
  campaignId: number;
}
