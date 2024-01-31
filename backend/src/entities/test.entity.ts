import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
@Entity()
export default class Test {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  text: string;
}

@InputType()
export class InputTest {
  @Field()
  text: string;
}

@ObjectType()
export class TestResult {
  @Field()
  text: string;
}
