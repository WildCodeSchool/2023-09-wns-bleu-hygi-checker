import { Arg, Int, Query, Resolver } from "type-graphql";
import Url from "../entities/url.entity";
import UrlService from "../services/url.service";

@Resolver()
export default class UserResolver {
  @Query(() => [Url])
  async urls(): Promise<Url[]> {
    return await new UrlService().listUrls();
  }

  @Query(() => Url, { nullable: true })
  async url(@Arg("id", () => Int) id: number): Promise<Url | null> {
    return Url.findOneBy({ id });
  }

  @Query(() => String)
  async checkUrl(@Arg("urlPath") urlPath: string) {
    const result = await new UrlService().checkURL(urlPath);

    if (result.error) {
      return `Erreur: ${result.error}`;
    }

    return `Statut: ${result.status}, Temps de réponse: ${result.responseTime} ms, Date de réponse: ${result.responseDate}`;
  }
}
