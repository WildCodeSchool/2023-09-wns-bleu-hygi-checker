import * as argon2 from "argon2";
import * as Cookies from "cookies";
import { SignJWT } from "jose";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";
import User, {
  InputLogin,
  InputRegister,
  Message,
  UserWithoutPassword,
  NewUserAvatar,
  UserProfile,
  inputUpdateProfile,
  inputUpdateName,
  inputUpdatePassword,
} from "../entities/user.entity";
import UserService from "../services/user.service";
import { AVATAR } from "../types";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await new UserService().listUsers();
  }

  @Authorized(["USER", "ADMIN"])
  @Query(() => UserProfile)
  async getUserProfile(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const connectedUser = await new UserService().findUserByEmail(
        ctx.user.email
      );
      if (!connectedUser) {
        throw new Error("user not found");
      }
      return connectedUser;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Query(() => User)
  async getAvatar(@Ctx() ctx: MyContext) {
    // TODO : remove this query as the getUserProfile is enough to get the avatar => make a query on front with getUserProfile but just select avatar
    if (ctx.user) {
      const avatar = await new UserService().findUserByEmail(ctx.user.email);
      if (!avatar) {
        throw new Error("avatar not found");
      }
      return avatar;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => NewUserAvatar)
  async changeAvatar(
    @Ctx() ctx: MyContext,
    @Arg("newAvatar") newAvatar: AVATAR
  ) {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const editedAvatar = await new UserService().changeAvatarOfThisUser(
        user,
        newAvatar
      );
      return editedAvatar;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => UserProfile)
  async updateProfile(
    @Ctx() ctx: MyContext,
    @Arg("updateData") updateData: inputUpdateProfile
  ) {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const updatedProfile = await new UserService().updateProfileOfThisUser(
        user,
        updateData
      );
      return updatedProfile;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => UserProfile)
  async updateName(
    @Ctx() ctx: MyContext,
    @Arg("updateName") updateName: inputUpdateName
  ) {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const updatedName = await new UserService().updateNameOfThisUser(
        user,
        updateName
      );
      return updatedName;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Authorized(["USER", "ADMIN"])
  @Mutation(() => Message)
  async changePassword(
    @Ctx() ctx: MyContext,
    @Arg("passwordData") passwordData: inputUpdatePassword
  ) {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const m = new Message();

      const isNewPasswordMatchConfirmPassword =
        passwordData.newPassword === passwordData.confirmPassword;

      if (!isNewPasswordMatchConfirmPassword) {
        m.message = "New password doesn't match the confirmation password";
        m.success = false;
        return m;
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        passwordData.previousPassword
      );
      if (isPasswordValid) {
        await new UserService().changeUserPassword(user, passwordData);
        m.message = "Password changed successfully";
        m.success = true;
      } else {
        m.message = "Wrong password !";
        m.success = false;
      }
      return m;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }
  @Authorized(["USER", "ADMIN"])
  @Mutation(() => Message)
  async deleteAccount(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const m = new Message();

      await new UserService().deleteThisAccount(user);

      const cookies = await new Cookies(ctx.req, ctx.res);
      cookies.set("token"); // without value, cookie will be deleted

      m.message = "Account deleted";
      m.success = true;
      return m;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Query(() => Message)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (!user) {
      throw new Error("Error, please try again");
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(`${process.env.JWT_PRIVATE_KEY}`));

      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = "Welcome";
      m.success = true;
    } else {
      m.message = "Check your informations !";
      m.success = false;
    }
    return m;
  }

  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const cookies = await new Cookies(ctx.req, ctx.res);
      cookies.set("token"); // without value, cookie will be deleted
    }
    const m = new Message();
    m.message = "You are logout.";
    m.success = true;

    return m;
  }

  @Mutation(() => UserWithoutPassword)
  async register(@Arg("infos") infos: InputRegister) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (user) {
      throw new Error("Error, please try again");
    }
    const newUser = await new UserService().createUser(infos);
    return newUser;
  }

  @Authorized(["USER"]) // TODO : remove this function for final production (except if we work on admin rights)
  @Mutation(() => [User])
  async upgradeRole(@Arg("id") id: string) {
    const user = await new UserService().findUserById(id);
    if (!user) {
      throw new Error("Error, please try again");
    }
    const newRole = await new UserService().upgradeRoleToAdmin(user);
    return newRole;
  }
}
