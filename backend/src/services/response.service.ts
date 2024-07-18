import { MoreThan, Repository } from "typeorm";
import Response, { InputCreateResponse } from "../entities/response.entity";
import datasource from "../lib/datasource";

export default class ResponseService {
  db: Repository<Response>;
  constructor() {
    this.db = datasource.getRepository(Response);
  }

  async findResponseById(id: number) {
    return await this.db.findOneBy({ id });
  }

  async listResponses() {
    return this.db.find({
      relations: ["campaignUrl"],
    });
  }

  async listResponsesByCampaignUrlId(
    campaignUrlId: number
  ): Promise<Response[]> {
    return this.db.find({
      where: { campaignUrl: { id: campaignUrlId } },
      relations: ["campaignUrl"],
    });
  }

  async listLatestResponseByCampaignUrlId(
    campaignUrlId: number
  ): Promise<Response | null> {
    return this.db.findOne({
      where: { campaignUrl: { id: campaignUrlId } },
      relations: ["campaignUrl"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async listLatestDayResponsesByCampaignUrlId(
    campaignUrlId: number
  ): Promise<Response[] | null> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    return this.db.find({
      where: {
        campaignUrl: { id: campaignUrlId },
        createdAt: MoreThan(twentyFourHoursAgo),
      },
      relations: ["campaignUrl"],
      order: {
        createdAt: "DESC",
      },
      take: 24,
    });
  }

  async getResponsesByCampaignUrlIdByPage(
    campaignUrlId: number,
    page: number,
    pageSize: number
  ): Promise<Response[]> {
    const offset = (page - 1) * pageSize;

    return this.db.find({
      where: { campaignUrl: { id: campaignUrlId } },
      relations: ["campaignUrl"],
      skip: offset,
      take: pageSize,
    });
  }

  async countResponsesByCampaignUrlId(campaignUrlId: number): Promise<number> {
    return this.db.count({
      where: { campaignUrl: { id: campaignUrlId } },
      relations: ["campaignUrl"],
    });
  }

  async createResponse({
    responseTime,
    statusCode,
    statusText,
    campaignUrlId,
  }: InputCreateResponse) {
    const createdAt = new Date(); // Utilise la date UTC actuelle

    const newResponse = this.db.create({
      responseTime,
      statusCode,
      statusText,
      createdAt,
      campaignUrl: { id: campaignUrlId },
    });

    return await this.db.save(newResponse);
  }

  async getLatestResponseByCampaignUrlId(
    campaignUrlId: number
  ): Promise<Response | null> {
    return this.db.findOne({
      where: { campaignUrl: { id: campaignUrlId } },
      order: { createdAt: "DESC" },
    });
  }
}
