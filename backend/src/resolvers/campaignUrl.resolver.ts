import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";
import CampaignUrl, {
  CountResult,
  InputAddUrlToCampaign,
  InputDeleteUrlToCampaign,
} from "../entities/campaignUrl.entity";
import { Message } from "../entities/user.entity";
import CampaignUrlService from "../services/campaignUrl.service";
import ResponseService from "../services/response.service";
import UrlService from "../services/url.service";
import AccessCheckResolver from "./accessCheck.resolver";

@Resolver()
export default class CampaignUrlResolver {
  private campaignUrlService: CampaignUrlService;
  private urlService: UrlService;
  private responseService: ResponseService;
  private accessChecker: AccessCheckResolver;

  constructor() {
    this.campaignUrlService = new CampaignUrlService();
    this.urlService = new UrlService();
    this.responseService = new ResponseService();
    this.accessChecker = new AccessCheckResolver();
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * getUrlFromCampaign : Retrieve all URLs associated with a campaign belonging to the currently logged in user
   * @param ctx Context with user infos
   * @param campaignId ID of the campaign
   * @returns a promise resolving an array of CampaignUrl objects.
   */
  @Query(() => [CampaignUrl])
  async getUrlFromCampaign(
    @Ctx() ctx: MyContext,
    @Arg("campaignId") campaignId: number
  ): Promise<CampaignUrl[] | undefined> {
    // ------------------------ VERIFICATION -----------------------
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );
    if (validation === true) {
      // if verification succeed
      return await this.campaignUrlService.getAllUrlByCampaignId(campaignId);
    }
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * countUrlFromCampaign : Count all URLs associated with a campaign belonging to the currently logged in user
   * @param ctx Context with user infos
   * @param campaignId ID of the campaign
   * @returns a number of count of all URL in this campaign.
   */
  @Query(() => CountResult)
  async countUrlFromCampaign(
    @Ctx() ctx: MyContext,
    @Arg("campaignId") campaignId: number
  ): Promise<CountResult | undefined> {
    // ------------------------ VERIFICATION -----------------------
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );
    if (validation === true) {
      // if verification succeed
      const count =
        await this.campaignUrlService.countUrlByCampaignId(campaignId);
      return { count };
    }
  }

  /**
   * Adds a URL to a specified campaign and performs an immediate health check.
   *
   * This mutation handles the process of adding a new URL to a campaign, including:
   * 1. Validating user permissions
   * 2. Checking and sanitizing the URL format
   * 3. Verifying if the URL already exists in the database
   * 4. Adding the URL to the specified campaign
   * 5. Performing an immediate health check on the URL
   * 6. Recording the health check results in the database
   *
   * @param {MyContext} ctx - The context object containing user information for authorization
   * @param {InputAddUrlToCampaign} infos - An object containing:
   *   - url: The URL to be added to the campaign
   *   - campaignId: The ID of the campaign to which the URL will be added
   *
   * @returns {Promise<Message>} A Message object containing:
   *   - message: A string describing the result of the operation
   *   - success: A boolean indicating whether the operation was successful
   *
   * @throws {Error} If the user doesn't have permission to modify the campaign
   * @throws {Error} If the URL format is invalid
   * @throws {Error} If the URL is already present in the specified campaign
   *
   */
  @Mutation(() => Message)
  async addUrlToCampaign(
    @Ctx() ctx: MyContext,
    @Arg("infos") infos: InputAddUrlToCampaign
  ) {
    const campaignId = parseInt(infos.campaignId);
    const m = new Message();
    m.message = "There is a problem. Your URL can't be added";
    m.success = false;

    // Access verification
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );
    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------
    if (ctx.user && ctx.user.isPremium === false) {
      const count =
        await this.campaignUrlService.countUrlByCampaignId(campaignId);

      if (count >= 5) {
        throw new Error(
          "You have reached the URL limit on this campaign. Unlock Premium to add as many URLs as you want"
        );
      }
    }
    // on enleve "/" a la fin de l'url si present
    const newUrl = infos.url.replace(/\/$/, "");

    // URL validation
    const isUrlFormatIsGood = this.urlService.validateURL(newUrl);
    if (!isUrlFormatIsGood) {
      throw new Error("URL does not match the required format");
    }

    let urlEntity = await this.urlService.findIdByUrl(newUrl);
    let campaignUrl: CampaignUrl;

    if (urlEntity) {
      // URL already exists
      const alreadyInThisCampaign =
        await this.campaignUrlService.findIfUrlIsInCampaign(
          urlEntity.id,
          campaignId
        );
      if (alreadyInThisCampaign) {
        throw new Error("This URL is already in your campaign");
      }
      campaignUrl = await this.campaignUrlService.addUrlToCampaign(
        urlEntity.id,
        campaignId
      );
    } else {
      // New URL
      urlEntity = await this.urlService.createUrl(newUrl);
      campaignUrl = await this.campaignUrlService.addUrlToCampaign(
        urlEntity.id,
        campaignId
      );
    }

    // Check URL and create Response
    const checkResult = await this.urlService.checkURL(newUrl);
    if (checkResult.status !== null && checkResult.responseTime !== null) {
      await this.responseService.createResponse({
        responseTime: checkResult.responseTime,
        statusCode: checkResult.status,
        statusText: checkResult.statusText || "",
        campaignUrlId: campaignUrl.id,
        campaignId: campaignId,
      });
      console.info(
        `Check result saved for URL: ${newUrl}, Campaign: ${campaignId}, Status: ${checkResult.status}, Time: ${checkResult.responseTime}ms`
      );
    } else {
      console.error(
        `Check failed for URL: ${newUrl}, Campaign: ${campaignId}, Error: ${checkResult.error}`
      );
    }

    m.message =
      "Your URL has been added to your campaign successfully and checked";
    m.success = true;

    return m;
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * deleteUrlFromCampaign : Delete an URLs associated with a campaign belonging to the currently logged in user
   * @param ctx Context with user infos
   * @param infos ID of the campaign and ID of the url to delete
   * @returns a message indicating whether the request was successful
   */
  @Mutation(() => Message)
  async deleteUrlFromCampaign(
    @Ctx() ctx: MyContext,
    @Arg("infos") infos: InputDeleteUrlToCampaign
  ) {
    // id de campaignUrl
    const id = infos.id;
    const m = new Message();

    // ------------------------ START VERIFICATION -----------------------
    const validation = await this.accessChecker.verifyIfUrlBelongToUserCampaign(
      ctx,
      id
    );

    if (!validation) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------

    await this.campaignUrlService.removeUrlFromCampaign(id);
    // TODO : verifiy that the url that was just deleted is present in someone's campaign.
    // If so, do nothing. If not, delete this url from the url table

    // if (this URL isn't present in someone's campaign) {
    // await this.urlService.deleteUrl(urlId);
    // }

    m.message = "Your URL has been deleted from your campaign successfully";
    m.success = true;

    return m;
  }
}
