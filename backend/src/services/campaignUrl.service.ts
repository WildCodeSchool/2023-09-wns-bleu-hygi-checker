import { Repository } from "typeorm";
import CampaignUrl from "../entities/campaignUrl.entity";
import datasource from "../lib/datasource";

export default class CampaignUrlService {
  db: Repository<CampaignUrl>;
  constructor() {
    this.db = datasource.getRepository(CampaignUrl);
  }

  async getAllUrlByCampaignId(campaignId: number) {
    return this.db.find({
      where: {
        campaign: { id: campaignId },
      },
      relations: ["url", "campaign"],
    });
  }

  async findIfUrlIsInCampaign(
    urlId: number,
    campaignId: number
  ): Promise<CampaignUrl | null> {
    return this.db.findOne({
      where: {
        campaign: { id: campaignId },
        url: { id: urlId },
      },
    });
  }

  async findCampaignWithCampaignUrlId(
    campaignUrlId: number
  ): Promise<CampaignUrl | null> {
    return this.db.findOne({
      where: {
        id: campaignUrlId,
      },
      relations: ["campaign"],
    });
  }

  async addUrlToCampaign(
    urlId: number,
    campaignId: number
  ): Promise<CampaignUrl> {
    const newUrlToCampaign = this.db.create({
      campaign: { id: campaignId },
      url: { id: urlId },
    });
    return this.db.save(newUrlToCampaign);
  }

  async removeUrlFromCampaign(
    urlId: number,
    campaignId: number
  ): Promise<void> {
    const campaignUrl = await this.db.findOneOrFail({
      where: {
        campaign: { id: campaignId },
        url: { id: urlId },
      },
    });
    await this.db.remove(campaignUrl);
  }
}
