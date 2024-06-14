import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Response, { InputCreateResponse } from "../entities/response.entity";
import ResponseService from "../services/response.service";

@Resolver()
export default class ResponseResolver {
  private responseService: ResponseService;

  constructor() {
    this.responseService = new ResponseService();
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
  async responsesByUrlId(
    @Arg("campaignUrlId", () => Int) campaignUrlId: number
  ): Promise<Response[]> {
    return await this.responseService.listResponsesByUrlId(campaignUrlId);
  }

  @Mutation(() => Response)
  async createResponse(
    @Arg("input") input: InputCreateResponse
  ): Promise<Response> {
    return await this.responseService.createResponse(input);
  }
}
