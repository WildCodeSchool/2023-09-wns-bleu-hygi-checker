import { Repository } from "typeorm";
import Campaign, { InputCreateCampaign } from "../entities/campaign.entity";
import datasource from "../lib/datasource";

export default class CampaignService {
  db: Repository<Campaign>;
  constructor() {
    this.db = datasource.getRepository(Campaign);
  }

  async listCampaigns(): Promise<Campaign[]> {
    return this.db.find({ relations: ["urls"] });
  }

  async listActiveCampaigns(): Promise<Campaign[]> {
    return this.db.find({
      where: { isWorking: true },
      relations: ["urls"],
    });
  }

  async listCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return this.db.find({
      where: { userId },
      relations: ["urls"],
    });
  }

  async findCampaignById(id: number): Promise<Campaign | null> {
    return this.db.findOne({ where: { id }, relations: ["urls"] });
  }

  async createCampaign(input: InputCreateCampaign): Promise<Campaign> {
    // const newPictureForProject = await fetch(
    //   "https://source.unsplash.com/random?wallpapers&landscape"
    // )
    //   .then((res) => {
    //     return res.request.responseURL;
    //   })
    //   .catch(() => {
    //     throw new Error("Failed to get image");
    //   });
    const newCampaign = this.db.create(input);
    return this.db.save(newCampaign);
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