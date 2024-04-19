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

  async listResponsesByUrlId(urlId: number): Promise<Response[]> {
    return this.db.find({
      where: { urlId },
    });
  }

  async findResponseById(uuid: number) {
    return await this.db.findOneBy({ uuid });
  }

  async createResponse({
    responseTime,
    statusCode,
    creationDate,
    urlId,
  }: InputCreateResponse) {
    const newUrl = this.db.create({
      responseTime,
      statusCode,
      creationDate,
      urlId,
    });
    return await this.db.save(newUrl);
  }
}
