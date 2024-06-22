import { Arg, Ctx, Resolver } from "type-graphql";
import UserService from "../services/user.service";
import CampaignService from "../services/campaign.service";
import { MyContext } from "..";
import { CampaignIds } from "../entities/campaign.entity";
import CampaignUrlService from "../services/campaignUrl.service";

// ===============================> AccessCheckResolver <==================================
// ==> This resolver contains verification processes that are often used in other resolvers.
// ==> The goal is to avoid having to rewrite the same logic in each function
// ========================================================================================
@Resolver()
export default class AccessCheckResolver {
  private userService: UserService;
  private campaignService: CampaignService;
  private campaignUrlService: CampaignUrlService;

  constructor() {
    this.userService = new UserService();
    this.campaignService = new CampaignService();
    this.campaignUrlService = new CampaignUrlService();
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * verifyIfCampaignBelongToUser : Check if the campaign id given in params is a campaign that belong to the connected user
   * @param ctx Context with user infos
   * @param campaignId ID of the campaign
   * @returns a boolean to true if the campaign belong to this user
   */
  async verifyIfCampaignBelongToUser(
    @Ctx() ctx: MyContext,
    @Arg("campaignId") campaignId: number
  ): Promise<boolean> {
    // Step 1 : Verify if the user is logged in.
    if (ctx.user) {
      const user = await this.userService.findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("An error has occurred");
      }
      // Step 2 : Find the campaigns related to this user.
      const allUserCampaignsId =
        await this.campaignService.listCampaignsIdByUserId(user.id);

      if (allUserCampaignsId.length === 0) {
        throw new Error(
          "You don't have any campaign yet. Please start by creating a new campagin"
        );
      }
      // Step 3 : Compare these campaign IDs with the ID sent in the arguments.
      //=> If they match, the user has the right to add the URL because this campaign belongs to him.
      const isUserOwnThisCampaign = allUserCampaignsId.some(
        (element: CampaignIds) => element.id === campaignId
      );
      if (!isUserOwnThisCampaign) {
        throw new Error("You can't perform this action");
      }
      return true;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  async verifyIfUrlBelongToUserCampaign(
    @Ctx() ctx: MyContext,
    @Arg("campaignUrlId") campaignUrlId: number
  ): Promise<boolean> {
    // Step 1 : Verify if the user is logged in.
    if (ctx.user) {
      const user = await this.userService.findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("An error has occurred");
      }

      // Step 2 : Find the campaigns related to this user.
      const allUserCampaignsId =
        await this.campaignService.listCampaignsIdByUserId(user.id);

      if (allUserCampaignsId.length === 0) {
        throw new Error(
          "You don't have any campaign yet. Please start by creating a new campagin"
        );
      }

      // Step 3 : find which campaign this campaignUrlId is attached to
      const campaignUrl =
        await this.campaignUrlService.findCampaignWithCampaignUrlId(
          campaignUrlId
        );

      // Step 4 : Compare these campaign IDs with the ID sent in the arguments.
      //=> If they match, the user has the right to add the URL because this campaign belongs to him.
      const isUserOwnThisCampaign = allUserCampaignsId.some(
        (element: CampaignIds) => element.id === campaignUrl?.campaign.id
      );
      if (!isUserOwnThisCampaign) {
        throw new Error("You can't perform this action");
      }
      return true;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }
}
