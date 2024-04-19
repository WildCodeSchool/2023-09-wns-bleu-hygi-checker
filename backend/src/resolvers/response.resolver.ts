import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Response, { InputCreateResponse } from "../entities/response.entity";
import ResponseService from "../services/response.service";

@Resolver()
export default class ResponseResolver {
  @Query(() => [Response])
  async urls(): Promise<Response[]> {
    return await new ResponseService().listResponses();
  }

  @Query(() => Response, { nullable: true })
  async response(@Arg("id", () => Int) uuid: number): Promise<Response | null> {
    return Response.findOneBy({ uuid });
  }

  @Query(() => [Response])
  async responsesByUrlId(
    @Arg("urlId", () => Int) urlId: number
  ): Promise<Response[]> {
    return Response.find({ where: { urlId } });
  }

  @Mutation(() => Response)
  async createResponse(
    @Arg("input") input: InputCreateResponse
  ): Promise<Response> {
    const responseService = new ResponseService();
    const response = await responseService.createResponse(input);
    return response;
  }
}
