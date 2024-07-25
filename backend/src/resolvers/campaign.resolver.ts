import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";
import Campaign, {
  InputCreateCampaign,
  InputEditCampaign,
  InputSwitchWorkingCampaign,
} from "../entities/campaign.entity";
import { Message } from "../entities/user.entity";
import CampaignService from "../services/campaign.service";
import { CampaignManagerService } from "../services/campaignManager.service";
import UserService from "../services/user.service";
import AccessCheckResolver from "./accessCheck.resolver";

@Resolver()
export default class CampaignResolver {
  private campaignService: CampaignService;
  private accessChecker: AccessCheckResolver;
  private campaignManagerService: CampaignManagerService;

  constructor() {
    this.campaignService = new CampaignService();
    this.accessChecker = new AccessCheckResolver();
    this.campaignManagerService = new CampaignManagerService();
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
      const newCampaign = await this.campaignService.createCampaign(
        input,
        user
      );
      if (newCampaign) {
        this.campaignManagerService.initializeCampaign(newCampaign);
      }
      return newCampaign;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  @Mutation(() => Message)
  async deleteCampaign(
    @Ctx() ctx: MyContext,
    @Arg("campaignId") campaignId: number
  ) {
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    await this.campaignService.deleteCampaign(campaignId);
    this.campaignManagerService.removeCampaign(campaignId);
    const m = new Message();
    m.message = "Campaign deleted successfully";
    m.success = true;
    return m;
  }

  @Mutation(() => Message)
  async modifyCampaign(
    @Ctx() ctx: MyContext,
    @Arg("input") input: InputEditCampaign
  ) {
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      input.id
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    const updatedCampaign = await this.campaignService.updateCampaign(input);
    if (updatedCampaign) {
      this.campaignManagerService.updateCampaign(updatedCampaign);
    }
    const m = new Message();
    m.message = "Campaign updated successfully";
    m.success = true;
    return m;
  }

  @Mutation(() => Message)
  async switchWorkingCampaign(
    @Ctx() ctx: MyContext,
    @Arg("input") input: InputSwitchWorkingCampaign
  ) {
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      input.campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    const updatedCampaign = await this.campaignService.switchWorking(input);
    if (updatedCampaign) {
      this.campaignManagerService.updateCampaign(updatedCampaign);
    }
    const m = new Message();
    m.message =
      input.isWorking === true
        ? "Campaign is now working ▶️"
        : "Campaign has been stopped successfully ⏸️";
    m.success = true;
    return m;
  }
}
