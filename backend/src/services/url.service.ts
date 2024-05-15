import { In, Repository } from "typeorm";
import Campaign from "../entities/campaign.entity";
import Url, { InputCreateUrl } from "../entities/url.entity";
import datasource from "../lib/datasource";

export default class UrlService {
  db: Repository<Url>;
  constructor() {
    this.db = datasource.getRepository(Url);
  }

  async listUrls(): Promise<Url[]> {
    return this.db.find({ relations: ["campaigns"] });
  }

  async findUrlById(id: number): Promise<Url | null> {
    return this.db.findOne({ where: { id }, relations: ["campaigns"] });
  }

  async createUrl(input: InputCreateUrl): Promise<Url> {
    const campaigns = await Campaign.findBy({ id: In(input.campaignIds) });
    const newUrl = this.db.create({ ...input, campaigns });
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

  async addUrlToCampaign(urlId: number, campaignId: number): Promise<Url> {
    const url = await this.findUrlById(urlId);
    const campaign = await Campaign.findOneBy({ id: campaignId });
    if (!url || !campaign) {
      throw new Error("URL or Campaign not found");
    }
    url.campaigns.push(campaign);
    return this.db.save(url);
  }

  async removeUrlFromCampaign(urlId: number, campaignId: number): Promise<Url> {
    const url = await this.findUrlById(urlId);
    if (!url) {
      throw new Error("URL not found");
    }
    url.campaigns = url.campaigns.filter((c) => c.id !== campaignId);
    return this.db.save(url);
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
      const responseDate = response.headers.get("date") || "Non disponible";

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
