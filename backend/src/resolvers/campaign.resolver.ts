import { Arg, Int, Mutation, Ctx, Query, Resolver } from "type-graphql";
import Campaign, { InputCreateCampaign } from "../entities/campaign.entity";
import CampaignService from "../services/campaign.service";
import { MyContext } from "..";
import UserService from "../services/user.service";
import { Message } from "../entities/user.entity";

@Resolver()
export default class CampaignResolver {
  private campaignService: CampaignService;

  constructor() {
    this.campaignService = new CampaignService();
  }

  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all campaigns in the db (or maybe just admin)
  @Query(() => [Campaign])
  async campaigns(): Promise<Campaign[]> {
    return await this.campaignService.listCampaigns();
  }

  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all campaigns in the db (or maybe just admin)
  @Query(() => [Campaign])
  async activeCampaigns(): Promise<Campaign[]> {
    return await this.campaignService.listActiveCampaigns();
  }

  @Query(() => Campaign, { nullable: true })
  async campaignById(
    @Ctx() ctx: MyContext,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Campaign | undefined | null> {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      return await this.campaignService.findCampaignById(campaignId, user.id);
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Query(() => [Campaign])
  async campaignsByUserId(
    @Ctx() ctx: MyContext
  ): Promise<Campaign[] | undefined> {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      return await this.campaignService.listCampaignsByUserId(user.id);
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => Campaign)
  async createCampaign(
    @Ctx() ctx: MyContext,
    @Arg("input") input: InputCreateCampaign
  ): Promise<Campaign | null | undefined> {
    if (ctx.user) {
      const user = await new UserService().findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("Error, please try again");
      }
      return await this.campaignService.createCampaign(input, user);
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => Message)
  async deleteCampaign(@Arg("campaignId") campaignId: number) {
    await this.campaignService.deleteCampaign(campaignId);
    const m = new Message();
    m.message = "Campaign deleted successfully";
    m.success = true;
    return m;
  }
}
