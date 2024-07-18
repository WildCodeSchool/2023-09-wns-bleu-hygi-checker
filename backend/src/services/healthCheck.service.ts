import { Repository } from "typeorm";
import CampaignUrl from "../entities/campaignUrl.entity";
import datasource from "../lib/datasource";
import ResponseService from "./response.service";
import UrlService from "./url.service";

export default class HealthCheckService {
  private urlService: UrlService;
  private responseService: ResponseService;
  private campaignUrlDb: Repository<CampaignUrl>;

  constructor() {
    this.urlService = new UrlService();
    this.responseService = new ResponseService();
    this.campaignUrlDb = datasource.getRepository(CampaignUrl);
  }

  async runHealthChecks(): Promise<void> {
    const urlsToCheck = await this.campaignUrlDb
      .createQueryBuilder("campaignUrl")
      .innerJoinAndSelect("campaignUrl.campaign", "campaign")
      .innerJoinAndSelect("campaignUrl.url", "url")
      .where("campaign.isWorking = :isWorking", { isWorking: true })
      .getMany();

    for (const campaignUrl of urlsToCheck) {
      const intervalMinutes = campaignUrl.campaign.intervalTest || 60;
      const intervalSeconds = intervalMinutes * 60; // Convert interval to seconds

      const lastResponse =
        await this.responseService.getLatestResponseByCampaignUrlId(
          campaignUrl.id
        );

      const shouldCheck =
        !lastResponse ||
        this.shouldCheck(lastResponse.createdAt, intervalSeconds);

      if (shouldCheck) {
        const checkResult = await this.urlService.checkURL(
          campaignUrl.url.urlPath
        );

        if (checkResult.status !== null && checkResult.responseTime !== null) {
          await this.responseService.createResponse({
            responseTime: checkResult.responseTime,
            statusCode: checkResult.status,
            statusText: checkResult.statusText,
            createdAt: new Date(),
            campaignUrlId: campaignUrl.id,
            campaignId: campaignUrl.campaign.id,
          });
        }
      }
    }
  }

  private shouldCheck(lastCheckDate: Date, intervalSeconds: number): boolean {
    const now = new Date();
    const timeSinceLastCheck = (now.getTime() - lastCheckDate.getTime()) / 1000; // Convert to seconds
    return timeSinceLastCheck >= intervalSeconds;
  }

  startPeriodicHealthChecks(): void {
    this.runHealthChecks();
    setInterval(() => this.runHealthChecks(), 60 * 1000); // Execute every minute to check each campaign's interval
  }
}
