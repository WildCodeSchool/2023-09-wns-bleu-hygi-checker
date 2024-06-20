import { Repository } from "typeorm";
import Response, { InputCreateResponse } from "../entities/response.entity";
import datasource from "../lib/datasource";

export default class ResponseService {
  db: Repository<Response>;
  constructor() {
    this.db = datasource.getRepository(Response);
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

  async findResponseById(id: number) {
    return await this.db.findOneBy({ id });
  }

  async createResponse({
    responseTime,
    statusCode,
    createdAt,
    campaignUrlId,
  }: InputCreateResponse) {
    const newReponse = this.db.create({
      responseTime,
      statusCode,
      createdAt,
      campaignUrl: { id: campaignUrlId },
    });
    return await this.db.save(newReponse);
  }
}
