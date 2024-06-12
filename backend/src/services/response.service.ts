import { Repository } from "typeorm";
import Response, { InputCreateResponse } from "../entities/response.entity";
import datasource from "../lib/datasource";

export default class ResponseService {
  db: Repository<Response>;
  constructor() {
    this.db = datasource.getRepository(Response);
  }

  async listResponses() {
    return this.db.find();
  }

  async listResponsesByUrlId(campaignUrlId: number): Promise<Response[]> {
    return this.db.find({
      where: { campaignUrlId },
    });
  }

  async findResponseById(uuid: number) {
    return await this.db.findOneBy({ uuid });
  }

  async createResponse({
    responseTime,
    statusCode,
    createdAt,
    campaignUrlId,
  }: InputCreateResponse) {
    const newUrl = this.db.create({
      responseTime,
      statusCode,
      createdAt,
      campaignUrlId,
    });
    return await this.db.save(newUrl);
  }
}
