import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Response, { InputCreateResponse } from "../entities/response.entity";
import ResponseService from "../services/response.service";
import CampaignUrlService from "../services/campaignUrl.service";

@Resolver()
export default class ResponseResolver {
  private responseService: ResponseService;
  private campaignUrlService: CampaignUrlService;

  constructor() {
    this.responseService = new ResponseService();
    this.campaignUrlService = new CampaignUrlService();
  }

  @Query(() => [Response])
  async responses(): Promise<Response[]> {
    return await this.responseService.listResponses();
  }

  @Query(() => Response, { nullable: true })
  async response(@Arg("id", () => Int) uuid: number): Promise<Response | null> {
    return await this.responseService.findResponseById(uuid);
  }

  @Query(() => [Response])
  async responsesByCampaignUrlId(
    @Arg("campaignId", () => Int) campaignId: number
  ) {
    const allCampaignUrlId =
      await this.campaignUrlService.getAllUrlByCampaignId(campaignId);
    if (!allCampaignUrlId) {
      throw new Error("No url in this campaign");
    }
    const responses = [];
    allCampaignUrlId.forEach(async (url) => {
      responses.push(
        ...allCampaignUrlId,
        await this.responseService.listResponsesByCampaignUrlId(url.id)
      );
    });
  }

  @Mutation(() => Response)
  async createResponse(
    @Arg("input") input: InputCreateResponse
  ): Promise<Response> {
    return await this.responseService.createResponse(input);
  }
}
