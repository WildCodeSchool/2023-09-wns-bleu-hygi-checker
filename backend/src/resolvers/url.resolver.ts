import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Url, { InputCreateUrl } from "../entities/url.entity";
import UrlService from "../services/url.service";
import CheckUrl from "../entities/checkUrl.entity";

@Resolver()
export default class UrlResolver {
  private urlService: UrlService;

  constructor() {
    this.urlService = new UrlService();
  }

  @Query(() => [Url])
  async urls(): Promise<Url[]> {
    return await this.urlService.listUrls();
  }

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

  @Mutation(() => Url)
  async createUrl(@Arg("input") input: InputCreateUrl): Promise<Url> {
    return this.urlService.createUrl(input);
  }

  @Mutation(() => Url)
  async deleteUrl(@Arg("id", () => Int) id: number): Promise<Url> {
    return await this.urlService.deleteUrl(id);
  }

  @Mutation(() => Url)
  async addUrlToCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.addUrlToCampaign(urlId, campaignId);
  }

  @Mutation(() => Url)
  async removeUrlFromCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.removeUrlFromCampaign(urlId, campaignId);
  }

  @Query(() => String)
  async checkUrl(@Arg("urlPath") urlPath: string) {
    const result = await this.urlService.checkURL(urlPath);

    if (result.error) {
      return `Erreur: ${result.error}`;
    }

    return result;
  }

  @Mutation(() => Url)
  async createUrl(@Arg("input") input: InputCreateUrl): Promise<Url> {
    return this.urlService.createUrl(input);
  }

  @Mutation(() => Url)
  async deleteUrl(@Arg("id", () => Int) id: number): Promise<Url> {
    return await this.urlService.deleteUrl(id);
  }

  @Mutation(() => Url)
  async addUrlToCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.addUrlToCampaign(urlId, campaignId);
  }

  @Mutation(() => Url)
  async removeUrlFromCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.removeUrlFromCampaign(urlId, campaignId);
  }

  @Query(() => String)
  async checkUrl(@Arg("urlPath") urlPath: string) {
    const result = await this.urlService.checkURL(urlPath);

    if (result.error) {
      return `Erreur: ${result.error}`;
    }

    return `Statut: ${result.status}, Temps de réponse: ${result.responseTime} ms, Date de réponse: ${result.responseDate}`;
  }

  @Mutation(() => Url)
  async createUrl(@Arg("input") input: InputCreateUrl): Promise<Url> {
    return this.urlService.createUrl(input);
  }

  @Mutation(() => Url)
  async deleteUrl(@Arg("id", () => Int) id: number): Promise<Url> {
    return await this.urlService.deleteUrl(id);
  }

  @Mutation(() => Url)
  async addUrlToCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.addUrlToCampaign(urlId, campaignId);
  }

  @Mutation(() => Url)
  async removeUrlFromCampaign(
    @Arg("urlId", () => Int) urlId: number,
    @Arg("campaignId", () => Int) campaignId: number
  ): Promise<Url> {
    return await this.urlService.removeUrlFromCampaign(urlId, campaignId);
  }

  @Query(() => String)
  async checkUrl(@Arg("urlPath") urlPath: string) {
    const result = await this.urlService.checkURL(urlPath);

    if (result.error) {
      return `Erreur: ${result.error}`;
    }

    return `Statut: ${result.status}, Temps de réponse: ${result.responseTime} ms, Date de réponse: ${result.responseDate}`;
  }

  @Mutation(() => Url)
  async createUrl(@Arg("input") input: InputCreateUrl): Promise<Url> {
    return await this.urlService.createUrl(input);
  }

  @Mutation(() => Url)
  async deleteUrl(@Arg("id", () => Int) id: number): Promise<Url> {
    return await this.urlService.deleteUrl(id);
  }
}
