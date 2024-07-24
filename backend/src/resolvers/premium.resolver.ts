import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "..";
import Premium from "../entities/premium.entity";
import { Message } from "../entities/user.entity";
import PremiumService from "../services/premium.service";
import { generateFormattedPremiumCode } from "../utils/generatePremiumCode";
import UserService from "../services/user.service";

@Resolver()
export default class PremiumResolver {
  private premiumService: PremiumService;
  private userService: UserService;

  constructor() {
    this.premiumService = new PremiumService();
    this.userService = new UserService();
  }

  @Mutation(() => Premium)
  async addCode() {
    const premiumCode: string = generateFormattedPremiumCode();

    const newTest = await this.premiumService.createNewPremiumCode({
      code: premiumCode,
    });
    return newTest;
    // TODO : send a mail to user with the premium code inside
  }

  @Mutation(() => Message)
  async addPremiumToUser(
    @Ctx() ctx: MyContext,
    @Arg("inputCode") inputCode: string
  ) {
    const m = new Message();
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      const verifiedCode =
        await this.premiumService.findExistingCode(inputCode);
      if (!verifiedCode) {
        throw new Error("Error, please try again");
      }
      if (verifiedCode.isUsed === true) {
        throw new Error("Error, code already used");
      }

      const premiumToUser = await this.userService.upgradeToPremium(user);

      if (premiumToUser) {
        await this.premiumService.useCode(verifiedCode);
        m.message = "Your account has been upgraded to Premium successfully 🚀";
        m.success = true;
      } else {
        m.message = "Something went wrong";
        m.success = false;
      }
      return m;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => Message)
  async RemovePremiumToUser(@Ctx() ctx: MyContext) {
    const m = new Message();
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }

      if (user.isPremium === true) {
        await this.userService.removePremium(user);
        m.message = "You have successfully unsubscribed from Premium ✅";
        m.success = true;
      } else if (user.isPremium === false) {
        m.message = "You are not currently subscribed to Premium";
        m.success = false;
      } else {
        m.message = "Something went wrong";
        m.success = false;
      }
      return m;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }
}
