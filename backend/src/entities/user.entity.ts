import * as argon2 from "argon2";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { Length, Matches } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { AVATAR } from "../types";
import Campaign from "./campaign.entity";
type ROLE = "ADMIN" | "USER";
export enum GENDER {
  male = "male",
  female = "female",
  other = "other",
  unspecified = "unspecified",
}

registerEnumType(GENDER, {
  name: "GENDER", // nom de l'énumération dans GraphQL
  description: "The gender of the user", // description facultative
});

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @BeforeInsert()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")) {
      this.password = await argon2.hash(this.password);
    }
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  isPremium: boolean;

  @Field(() => GENDER)
  @Column({
    type: "text",
    enum: GENDER,
    nullable: false,
    default: GENDER.unspecified,
  })
  gender: GENDER;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birth_date: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @Field()
  @Column({ default: "avatar01" })
  avatar: AVATAR;

  @Field()
  @Column()
  accepted_terms: boolean;

  @Field()
  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true,
    default: "USER",
  })
  role: ROLE;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];
}

/**----------------------
 **      Object Types
 *------------------------**/

@ObjectType()
export class UserWithoutPassword {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => String)
  role: ROLE;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@ObjectType()
export class UserProfile {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  gender: GENDER;

  @Field({ nullable: true })
  birth_date: string;

  @Field({ nullable: true })
  country: string;

  @Field()
  avatar: AVATAR;
}

@ObjectType()
export class NewUserAvatar {
  @Field()
  avatar: string;
}

/**----------------------
 **      Input Types
 *------------------------**/
@InputType()
export class InputRegister {
  @Field()
  @Length(3, 30)
  username: string;

  @Field()
  email: string;

  @Field()
  @Matches(passwordRegex)
  password: string;

  @Field()
  accepted_terms: boolean;
}

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class inputUpdateProfile {
  @Field()
  gender: GENDER;

  @Field()
  @Length(10, 10)
  birth_date: string;

  @Field()
  @Length(2, 2)
  country: string;
}

@InputType()
export class inputUpdateName {
  @Field()
  @Length(4, 30)
  username: string;
}

@InputType()
export class inputUpdatePassword {
  @Field()
  previousPassword: string;

  @Field()
  @Matches(passwordRegex)
  newPassword: string;

  @Field()
  @Matches(passwordRegex)
  confirmPassword: string;
}
