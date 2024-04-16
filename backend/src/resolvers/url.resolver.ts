import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import Url, {
  InputCheckRoute,
  InputCreateUrl,
  UrlResponse,
} from "../entities/url.entity";

@Resolver()
export default class UrlResolver {
  // Obtenir une URL par ID
  @Query(() => Url, { nullable: true })
  async url(@Arg("id") id: number): Promise<Url | undefined> {
    const urlRepository = getRepository(Url);
    const url = await urlRepository.findOne({ where: { id } });
    return url || undefined; // Assurez-vous que la fonction retourne toujours undefined si url est null
  }

  // Create a new URL
  @Mutation(() => UrlResponse)
  async addUrl(
    @Arg("input") inputCreateUrl: InputCreateUrl
  ): Promise<UrlResponse> {
    try {
      const urlRepository = getRepository(Url);
      const newUrl = urlRepository.create(inputCreateUrl);
      await urlRepository.save(newUrl);

      return {
        success: true,
        message: "URL successfully created",
        url: newUrl,
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        message: err.message || "An error occurred",
      };
    }
  }

  // Check if a URL route exists
  @Mutation(() => UrlResponse)
  async checkRoute(
    @Arg("input") inputCheckRoute: InputCheckRoute
  ): Promise<UrlResponse> {
    try {
      const urlRepository = getRepository(Url);
      const url = await urlRepository.findOne({
        where: { id: inputCheckRoute.id },
      });

      if (url) {
        return {
          success: true,
          message: "URL route exists",
          url: url,
        };
      }

      return {
        success: false,
        message: "URL route does not exist",
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        message: err.message || "An error occurred",
      };
    }
  }
}
