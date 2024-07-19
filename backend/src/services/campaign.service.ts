import { Repository } from "typeorm";
import Campaign, {
  InputCreateCampaign,
  InputEditCampaign,
  InputEditCampaignImage,
  InputSwitchWorkingCampaign,
} from "../entities/campaign.entity";
import User from "../entities/user.entity";
import datasource from "../lib/datasource";

export default class CampaignService {
  db: Repository<Campaign>;
  constructor() {
    this.db = datasource.getRepository(Campaign);
  }

  async listCampaigns(): Promise<Campaign[]> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async listCampaignsIdByUserId(userId: string): Promise<any> {
    const campaigns = await this.db.find({
      where: { userId },
    });

    // return IDs of campaign only
    return campaigns.map((campaign: Campaign) => ({ id: campaign.id }));
  }

  async findCampaignById(
    campaignId: number,
    userId?: string
  ): Promise<Campaign | null> {
    const campaign = await this.db.findOne({
      where: { id: campaignId },
    });
    if (campaign && userId && campaign.userId !== userId) {
      throw new Error("Acces denied.");
    }
    return campaign;
  }

  async createCampaign(
    input: InputCreateCampaign,
    user: User
  ): Promise<Campaign> {
    const newPictureForProject = await fetch(
      "https://picsum.photos/1920/1080",
      {
        redirect: "follow",
      }
    )
      .then((res) => {
        return res.url;
      })
      .catch(() => {
        throw new Error("Failed to get image");
      });

    const newCampaign = this.db.create(input);
    newCampaign.image = newPictureForProject;
    newCampaign.userId = user.id;
    return this.db.save(newCampaign);
  }

  async deleteCampaign(id: number) {
    const campaign = await this.db.findOneOrFail({
      where: {
        id: id,
      },
    });
    if (!campaign) {
      throw new Error(`Campaign not found`);
    }
    return this.db.remove(campaign);
  }

  async updateCampaign(input: InputEditCampaign) {
    const campaign = await this.db.findOneOrFail({
      where: {
        id: input.id,
      },
    });
    if (!campaign) {
      throw new Error(`Campaign not found`);
    }
    const editedCampaign = this.db.create({ ...campaign });
    editedCampaign.name = input.name;
    editedCampaign.intervalTest = input.intervalTest;
    editedCampaign.isWorking = input.isWorking;
    editedCampaign.isMailAlert = input.isMailAlert;
    return await this.db.save(editedCampaign);
  }

  async updateImageCampaign(input: InputEditCampaignImage) {
    const campaign = await this.db.findOneOrFail({
      where: {
        id: input.id,
      },
    });
    if (!campaign) {
      throw new Error(`Campaign not found`);
    }
    const editedCampaign = this.db.create({ ...campaign });
    editedCampaign.image = input.image;
    return await this.db.save(editedCampaign);
  }

  async switchWorking(input: InputSwitchWorkingCampaign) {
    const campaign = await this.db.findOneOrFail({
      where: {
        id: input.campaignId,
      },
    });
    if (!campaign) {
      throw new Error(`Campaign not found`);
    }
    const editedCampaign = this.db.create({ ...campaign });
    editedCampaign.isWorking = input.isWorking;
    return await this.db.save(editedCampaign);
  }
}
