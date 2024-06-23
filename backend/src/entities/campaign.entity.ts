import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";
import CampaignUrl from "./campaignUrl.entity";

@ObjectType()
@Entity()
export default class Campaign extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 60 })
  intervalTest?: number = 60; // Interval in minutes, default 60

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  isMailAlert?: boolean = false; // Send e-mail alerts, disabled by default

  @Field({ nullable: true })
  @Column({ nullable: true, default: true })
  isWorking?: boolean = true; // Indicates whether the campaign is active, enabled by default

  @Field()
  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User, (user) => user.campaigns, { onDelete: "CASCADE" }) // Here is the onDelete option
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => CampaignUrl, (campaignUrl) => campaignUrl.campaign, {
    onDelete: "CASCADE",
  })
  campaignUrl: CampaignUrl[];
}

@InputType()
export class InputCreateCampaign {
  @Field()
  name: string;

  @Field({ nullable: true })
  intervalTest?: number;

  @Field({ nullable: true })
  isMailAlert?: boolean;

  @Field({ nullable: true })
  isWorking?: boolean;
}

@InputType()
export class InputEditCampaign {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  intervalTest?: number;

  @Field({ nullable: true })
  isMailAlert?: boolean;

  @Field({ nullable: true })
  isWorking?: boolean;
}

@InputType()
export class InputEditCampaignImage {
  @Field()
  id: number;

  @Field()
  image: string;
}

@ObjectType()
export class CampaignIds {
  @Field()
  id: number;
}
