import { Repository, MoreThan } from "typeorm";
import Response, { InputCreateResponse } from "../entities/response.entity";
import datasource from "../lib/datasource";
import getDateInUTCPlus2 from "../utils/getTimeUTC2";

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
    const twentyFourHoursAgo = getDateInUTCPlus2();
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
    campaignUrlId,
  }: InputCreateResponse) {
    const dateInUTCPlus2 = getDateInUTCPlus2();

    const newReponse = this.db.create({
      responseTime,
      statusCode,
      createdAt: dateInUTCPlus2.toISOString(),
      campaignUrl: { id: campaignUrlId },
    });
    return await this.db.save(newReponse);
  }
}
