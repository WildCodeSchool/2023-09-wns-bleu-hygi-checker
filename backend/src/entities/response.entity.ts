// `/entities/response.entity.ts`

import { Field, ObjectType } from "type-graphql";
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
  response_time: number;

  @Field()
  @Column()
  status_code: string;

  @Field()
  @CreateDateColumn()
  creation_date: Date;

  @Column({ name: "url_id" })
  urlId: number;

  @ManyToOne(() => Url)
  @JoinColumn({ name: "url_id" })
  url: Url;
}
