import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import Response from "../entities/response.entity";

@Resolver()
export default class ResponseResolver {
  // Get all responses for a specific URL
  @Query(() => [Response])
  async getResponsesByURL(@Arg("urlId") urlId: number): Promise<Response[]> {
    const responseRepository = getRepository(Response);
    // Assurez-vous que les relations et les noms de colonnes correspondent
    return await responseRepository.find({ where: { url: { id: urlId } } });
  }

  // Create a new Response for a URL
  @Mutation(() => Response)
  async addResponse(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("response_time") responseTime: number,
    @Arg("status_code") statusCode: string
  ): Promise<Response> {
    const responseRepository = getRepository(Response);
    const response = responseRepository.create({
      urlId, // Assurez-vous que ceci correspond à la colonne de clé étrangère définie dans votre entité
      response_time: responseTime,
      status_code: statusCode,
    });

    await responseRepository.save(response);
    return response;
  }
}
