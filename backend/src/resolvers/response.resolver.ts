import { Arg, Int, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Response, { InputCreateResponse } from "../entities/response.entity";
import ResponseService from "../services/response.service";
import CampaignUrlService from "../services/campaignUrl.service";
import AccessCheckResolver from "./accessCheck.resolver";
import { MyContext } from "..";

@Resolver()
export default class ResponseResolver {
  private responseService: ResponseService;
  private campaignUrlService: CampaignUrlService;

  constructor() {
    this.responseService = new ResponseService();
    this.campaignUrlService = new CampaignUrlService();
  }
  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all responses in the db (or maybe just admin)
  @Query(() => [Response])
  async responses(): Promise<Response[]> {
    return await this.responseService.listResponses();
  }

  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all responses in the db (or maybe just admin)
  @Query(() => Response, { nullable: true })
  async response(@Arg("id", () => Int) uuid: number): Promise<Response | null> {
    return await this.responseService.findResponseById(uuid);
  }

  // -------------------------------------------------------------------------
  /**
   * responsesByCampaignUrlId : get every responses on all URLs belonging to a given campaign
   * @param campaignId the ID of the campaign you want to get the responses from
   * @returns an array of Responses
   */
  @Query(() => [Response])
  async responsesByCampaignUrlId(
    @Ctx() ctx: MyContext,
    @Arg("campaignId", () => Int) campaignId: number
  ) {
    // ------------------------ START VERIFICATION -----------------------
    const accessChecker = await new AccessCheckResolver();
    const validation = await accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------

    const allCampaignUrl =
      await this.campaignUrlService.getAllUrlByCampaignId(campaignId);

    if (!allCampaignUrl) {
      throw new Error("No url in this campaign");
    }

    const responses: Response[] = [];

    for (const campaignUrl of allCampaignUrl) {
      const urlResponses =
        await this.responseService.listResponsesByCampaignUrlId(campaignUrl.id);
      responses.push(...urlResponses);
    }

    return responses;
  }

  // -------------------------------------------------------------------------
  /**
   * latestResponsesByCampaignUrlId : get the latest response on all URLs belonging to a given campaign
   * @param campaignId the ID of the campaign you want to get the responses from
   * @returns an array of Responses
   */
  @Query(() => [Response])
  async latestResponsesByCampaignUrlId(
    @Ctx() ctx: MyContext,
    @Arg("campaignId", () => Int) campaignId: number
  ) {
    // ------------------------ START VERIFICATION -----------------------
    const accessChecker = await new AccessCheckResolver();
    const validation = await accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------

    const allCampaignUrl =
      await this.campaignUrlService.getAllUrlByCampaignId(campaignId);

    if (!allCampaignUrl) {
      throw new Error("No url in this campaign");
    }

    const latestResponses: Response[] = [];

    for (const campaignUrl of allCampaignUrl) {
      const urlResponses =
        await this.responseService.listLatestResponseByCampaignUrlId(
          campaignUrl.id
        );

      if (urlResponses) {
        latestResponses.push(urlResponses);
      }
    }

    return latestResponses;
  }

  /**
   * createResponse : Add a response to an URL included in the connected user campaign
   * @param ctx Context with user infos
   * @param input  Object containing the checkURL response including the campaignUrlId (The ID of the URL where the test is attached)
   * and the ID of the campaign to verify if she belongs to the connected user
   * @returns the response that has just been added
   */
  @Mutation(() => Response)
  async createResponse(
    @Ctx() ctx: MyContext,
    @Arg("input") input: InputCreateResponse
  ): Promise<Response> {
    // ------------------------ START VERIFICATION -----------------------

    const accessChecker = await new AccessCheckResolver();
    const validation = await accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      input.campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------
    return await this.responseService.createResponse(input);
  }
}
