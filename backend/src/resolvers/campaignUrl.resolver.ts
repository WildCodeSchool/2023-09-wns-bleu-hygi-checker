import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import CampaignUrl, {
  InputAddUrlToCampaign,
  InputDeleteUrlToCampaign,
} from "../entities/campaignUrl.entity";
import CampaignUrlService from "../services/campaignUrl.service";
import UrlService from "../services/url.service";
import UserService from "../services/user.service";
import CampaignService from "../services/campaign.service";
import { Message } from "../entities/user.entity";
import { MyContext } from "..";
import { CampaignIds } from "../entities/campaign.entity";

@Resolver()
export default class CampaignUrlResolver {
  private campaignUrlService: CampaignUrlService;
  private urlService: UrlService;
  private userService: UserService;
  private campaignService: CampaignService;

  constructor() {
    this.campaignUrlService = new CampaignUrlService();
    this.urlService = new UrlService();
    this.userService = new UserService();
    this.campaignService = new CampaignService();
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
    if (ctx.user) {
      const user = await this.userService.findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("An error has occurred");
      }
      const allUserCampaignsId =
        await this.campaignService.listCampaignsIdByUserId(user.id);

      if (allUserCampaignsId.length === 0) {
        throw new Error(
          "You don't have any campaign yet. Please start by creating a new campagin"
        );
      }

      const isUserOwnThisCampaign = allUserCampaignsId.some(
        (element: CampaignIds) => element.id === campaignId
      );
      if (!isUserOwnThisCampaign) {
        throw new Error("You can't perform this action");
      }
      return await this.campaignUrlService.getAllUrlByCampaignId(campaignId);
    } else {
      throw new Error("You must be authenticated to perform this action");
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
    const m = new Message();
    m.message = "There is a problem. Your URL can't be added";
    m.success = false;

    // Step 1 : Verify if the user is logged in.
    if (ctx.user) {
      const user = await this.userService.findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("An error has occurred");
      }

      // Step 2 : Find the campaigns related to this user.
      const allUserCampaignsId =
        await this.campaignService.listCampaignsIdByUserId(user.id);

      if (allUserCampaignsId.length === 0) {
        throw new Error(
          "You don't have any campaign yet. Please start by creating a new campagin"
        );
      }

      // Step 3 :Compare these campaign IDs with the ID sent in the arguments.
      //=> If they match, the user has the right to add the URL because this campaign belongs to them.
      const campaignId = parseInt(infos.campaignId);
      const isUserOwnThisCampaign = allUserCampaignsId.some(
        (element: CampaignIds) => element.id === campaignId
      );
      if (!isUserOwnThisCampaign) {
        throw new Error("You can't perform this action");
      }

      // Step 4 : Verify if the URL format is correct and check if a URL matching the one in the arguments exists in the URL table.
      const isUrlFormatIsGood = await this.urlService.validateURL(infos.url);
      if (!isUrlFormatIsGood) {
        throw new Error("URL do not match the required format");
      }
      const existingUrl = await this.urlService.findIdByUrl(infos.url);

      // Step 5 : If yes, retrieve its ID and check if the combination of the URL ID and the campaign ID already exists.
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

      // Step 6 : Finally, if the URL was just added to the table or if the combination of the URL ID and the campaign ID does not already exist,
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
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * deleteUrlFromCampaign : Delete an URLs associated with a campaign belonging to the currently logged in user
   * @param ctx Context with user infos
   * @param campaignId ID of the campaign
   * @returns a promise resolving an array of CampaignUrl objects.
   */
  @Mutation(() => Message)
  async deleteUrlFromCampaign(
    @Ctx() ctx: MyContext,
    @Arg("infos") infos: InputDeleteUrlToCampaign
  ) {
    const m = new Message();

    if (ctx.user) {
      const user = await this.userService.findUserByEmail(ctx.user.email);
      if (!user) {
        throw new Error("An error has occurred");
      }
      const allUserCampaignsId =
        await this.campaignService.listCampaignsIdByUserId(user.id);

      if (allUserCampaignsId.length === 0) {
        throw new Error(
          "You don't have any campaign yet. Please start by creating a new campagin"
        );
      }
      const campaignId = parseInt(infos.campaignId);
      const urlId = parseInt(infos.urlId);

      const isUserOwnThisCampaign = allUserCampaignsId.some(
        (element: CampaignIds) => element.id === campaignId
      );
      if (!isUserOwnThisCampaign) {
        throw new Error("You can't perform this action");
      }
      await this.campaignUrlService.removeUrlFromCampaign(urlId, campaignId);
      // TODO : verifiy that the url that was just deleted is present in someone's campaign.
      // If so, do nothing. If not, delete this url from the url table

      // if (this URL isn't present in someone's campaign) {
      // await this.urlService.deleteUrl(urlId);
      // }

      m.message = "Your URL has been deleted from your campaign successfully";
      m.success = true;

      return m;
    } else {
      throw new Error("You must be authenticated to perform this action");
    }
  }
}