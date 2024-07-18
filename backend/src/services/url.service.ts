import { Repository } from "typeorm";
import Url from "../entities/url.entity";
import datasource from "../lib/datasource";

export default class UrlService {
  db: Repository<Url>;
  constructor() {
    this.db = datasource.getRepository(Url);
  }

  async listUrls(): Promise<Url[]> {
    return this.db.find();
  }

  async findUrlById(id: number): Promise<Url | null> {
    return this.db.findOne({ where: { id }, relations: ["campaigns"] });
  }

  async findIdByUrl(url: string): Promise<Url | null> {
    return this.db.findOne({ where: { urlPath: url } });
  }

  async createUrl(url: string): Promise<Url> {
    const newUrl = this.db.create({ urlPath: url });
    return this.db.save(newUrl);
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
      const responseDate =
        response.headers.get("date") || new Date().toISOString();

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
