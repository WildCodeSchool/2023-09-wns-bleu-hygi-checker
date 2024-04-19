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
import Url from "./url.entity";

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
  @CreateDateColumn()
  creationDate: Date;

  @Column({ name: "url_id" })
  urlId: number;

  @ManyToOne(() => Url)
  @JoinColumn({ name: "url_id" })
  url: Url;
}

/**----------------------
 **      Input Types
 *------------------------**/
@InputType()
export class InputCreateResponse {
  @Field()
  responseTime: number;

  @Field()
  statusCode: string;

  @Field()
  creationDate: Date;

  @Field()
  urlId: number;
}
