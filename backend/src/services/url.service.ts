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

  async deleteUrl(id: number): Promise<Url> {
    const url = await this.findUrlById(id);
    if (!url) {
      throw new Error(`URL with id ${id} not found`);
    }
    await this.db.remove(url);
    return url;
  }

  validateURL(url: string): boolean {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;
    return urlPattern.test(url);
  }

  async checkURL(urlPath: string) {
    if (!this.validateURL(urlPath)) {
      return {
        status: null,
        statusText: null,
        responseTime: null,
        responseDate: null,
        error: "URL non valide.",
      };
    }

    const startTime = Date.now();

    try {
      const response = await fetch(urlPath);
      const endTime = Date.now();

      const responseTime = endTime - startTime;
      const responseDate = response.headers.get("date") || "Not available";

      return {
        status: response.status,
        statusText: response.statusText,
        responseTime: responseTime,
        responseDate: responseDate,
        error: null,
      };
    } catch (error) {
      return {
        status: null,
        statusText: null,
        responseTime: null,
        responseDate: null,
        error: (error as Error).message,
      };
    }
  }
}
