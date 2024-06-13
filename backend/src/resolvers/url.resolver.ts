import { Arg, Int, Query, Resolver } from "type-graphql";
import Url from "../entities/url.entity";
import UrlService from "../services/url.service";
import CheckUrl from "../entities/checkUrl.entity";

@Resolver()
export default class UrlResolver {
  private urlService: UrlService;

  constructor() {
    this.urlService = new UrlService();
  }

  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all URLs in the db (or maybe just admin)
  @Query(() => [Url])
  async urls(): Promise<Url[]> {
    return await this.urlService.listUrls();
  }

  //@Authorized(["ADMIN"]) TODO : Uncomment this for final production => no one could see all URLs in the db (or maybe just admin)
  @Query(() => Url, { nullable: true })
  async url(@Arg("id", () => Int) id: number): Promise<Url | null> {
    return await this.urlService.findUrlById(id);
  }

  @Query(() => CheckUrl)
  async checkUrl(@Arg("urlPath") urlPath: string) {
    const result = await this.urlService.checkURL(urlPath);

    if (result.error) {
      return `Erreur: ${result.error}`;
    }

    return result;
  }
}
