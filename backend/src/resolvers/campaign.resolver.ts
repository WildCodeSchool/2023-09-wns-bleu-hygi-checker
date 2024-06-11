import { Arg, Int, Mutation, Ctx, Query, Resolver } from "type-graphql";
import Campaign, { InputCreateCampaign } from "../entities/campaign.entity";
import CampaignService from "../services/campaign.service";
import { MyContext } from "..";
import UserService from "../services/user.service";

@Resolver()
export default class CampaignResolver {
  private campaignService: CampaignService;

  constructor() {
    this.campaignService = new CampaignService();
  }

  @Query(() => [Campaign])
  async campaigns(): Promise<Campaign[]> {
    return await this.campaignService.listCampaigns();
  }

  @Query(() => [Campaign])
  async activeCampaigns(): Promise<Campaign[]> {
    return await this.campaignService.listActiveCampaigns();
  }

  @Query(() => [Campaign])
  async campaignsByUserId(
    @Arg("userId", () => String) userId: string
  ): Promise<Campaign[]> {
    return await this.campaignService.listCampaignsByUserId(userId);
  }

  @Query(() => Campaign, { nullable: true })
  async campaign(@Arg("id", () => Int) id: number): Promise<Campaign | null> {
    return await this.campaignService.findCampaignById(id);
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
    }
  }

  @Mutation(() => Campaign)
  async deleteCampaign(@Arg("id", () => Int) id: number): Promise<Campaign> {
    return await this.campaignService.deleteCampaign(id);
  }
}
