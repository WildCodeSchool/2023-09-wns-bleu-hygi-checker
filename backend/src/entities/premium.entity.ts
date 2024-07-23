import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
@Entity()
export default class Premium extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column({ default: false })
  isUsed: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}

@InputType()
export class InputCreateCode {
  @Field()
  code: string;
}

@ObjectType()
export class PremiumCodeResponse {
  @Field()
  code: string;
}
