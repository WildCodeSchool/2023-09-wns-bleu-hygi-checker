import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import CampaignUrl, {
  InputAddUrlToCampaign,
  InputDeleteUrlToCampaign,
  CountResult,
} from "../entities/campaignUrl.entity";
import CampaignUrlService from "../services/campaignUrl.service";
import UrlService from "../services/url.service";
import { Message } from "../entities/user.entity";
import { MyContext } from "..";
import AccessCheckResolver from "./accessCheck.resolver";

@Resolver()
export default class CampaignUrlResolver {
  private campaignUrlService: CampaignUrlService;
  private urlService: UrlService;
  private accessChecker: AccessCheckResolver;

  constructor() {
    this.campaignUrlService = new CampaignUrlService();
    this.urlService = new UrlService();
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

  /** ------------------------------------------------------------------------------------------------------------------
   * addUrlToCampaign : Add an URL to a campaign belonging to the currently logged in user
   * @param ctx Context with user infos
   * @param infos Object containing the URL to add and the ID of the campaign to which you want to add the url
   * @returns a message indicating whether the request was successful
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

    // ------------------------ START VERIFICATION -----------------------
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------

    // Step 1 : Verify if the URL format is correct and check if a URL matching the one in the arguments exists in the URL table.
    const isUrlFormatIsGood = await this.urlService.validateURL(infos.url);
    if (!isUrlFormatIsGood) {
      throw new Error("URL do not match the required format");
    }
    const existingUrl = await this.urlService.findIdByUrl(infos.url);

    // Step 2 : If yes, retrieve its ID and check if the combination of the URL ID and the campaign ID already exists.
    // => If yes, it means the user already has this URL in their campaign = END.
    // => If no, insert this URL into the URL table and then return the ID.
    if (existingUrl) {
      const alreadyInThisCampaign =
        await this.campaignUrlService.findIfUrlIsInCampaign(
          existingUrl.id,
          campaignId
        );
      if (alreadyInThisCampaign) {
        throw new Error("This URL is already in your campaign");
      } else {
        const addedUrlToCampaign =
          await this.campaignUrlService.addUrlToCampaign(
            existingUrl.id,
            campaignId
          );
        if (addedUrlToCampaign) {
          m.message = "Your URL has been added to your campaign successfully";
          m.success = true;
        }
      }
    }

    // Step 3 : Finally, if the URL was just added to the table or if the combination of the URL ID and the campaign ID does not already exist,
    //this means the URL can be added.
    if (!existingUrl) {
      const createdUrl = await this.urlService.createUrl(infos.url);
      if (createdUrl) {
        const addedUrlToCampaign =
          await this.campaignUrlService.addUrlToCampaign(
            createdUrl.id,
            campaignId
          );
        if (addedUrlToCampaign) {
          m.message = "Your URL has been added to your campaign successfully";
          m.success = true;
        }
      }
    }

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
    const campaignId = parseInt(infos.campaignId);
    const urlId = parseInt(infos.urlId);

    const m = new Message();

    // ------------------------ START VERIFICATION -----------------------
    const validation = await this.accessChecker.verifyIfCampaignBelongToUser(
      ctx,
      campaignId
    );

    if (validation !== true) {
      throw new Error("You can't perform this action");
    }
    // ------------------------ END VERIFICATION -----------------------

    await this.campaignUrlService.removeUrlFromCampaign(urlId, campaignId);
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
