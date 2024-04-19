import { Repository } from "typeorm";
import Url, { InputCreateUrl } from "../entities/url.entity";
import datasource from "../lib/datasource";

export default class UrlService {
  db: Repository<Url>;
  constructor() {
    this.db = datasource.getRepository(Url);
  }

  async listUrls() {
    return this.db.find();
  }

  // async listUrlsByCampaignId(userId: number): Promise<Url[]> {
  //   return this.db.find({
  //     where: { CampaingId },
  //   });
  // }

  async findUrlById(id: number) {
    return await this.db.findOneBy({ id });
  }

  async createUrl({ urlPath, type }: InputCreateUrl) {
    const newUrl = this.db.create({ urlPath, type });
    return await this.db.save(newUrl);
  }

  async deleteUrl(id: number) {
    const url = (await this.findUrlById(id)) as Url;
    await this.db.remove(url);
    return { ...url, id };
  }
}
