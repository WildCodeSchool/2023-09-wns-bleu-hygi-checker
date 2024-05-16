import { Repository } from "typeorm";
import Campaign, { InputCreateCampaign } from "../entities/campaign.entity";
import datasource from "../lib/datasource";

export default class CampaignService {
  db: Repository<Campaign>;
  constructor() {
    this.db = datasource.getRepository(Campaign);
  }

  async listCampaigns() {
    return this.db.find();
  }

  async listActiveCampaigns(): Promise<Campaign[]> {
    return this.db.find({
      where: { isWorking: true },
    });
  }

  async listCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return this.db.find({
      where: { userId },
    });
  }

  async findCampaignById(id: number) {
    return await this.db.findOneBy({ id });
  }

  async createCampaign({
    name,
    intervalTest,
    isMailAlert,
    isWorking,
    userId,
  }: InputCreateCampaign) {
    const newCampaign = this.db.create({
      name,
      intervalTest,
      isMailAlert,
      isWorking,
      userId,
    });
    return await this.db.save(newCampaign);
  }

  async deleteCampaign(id: number): Promise<Campaign> {
    const campaign = await this.findCampaignById(id);
    if (!campaign) {
      throw new Error(`Campaign with id ${id} not found`);
    }
    await this.db.remove(campaign);
    campaign.id = id;
    return campaign;
  }
}
