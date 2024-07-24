import { Repository } from "typeorm";
import Campaign from "../entities/campaign.entity";
import CampaignUrl from "../entities/campaignUrl.entity";
import datasource from "../lib/datasource";
import ResponseService from "./response.service";
import UrlService from "./url.service";

/**
 * CampaignScheduler manages the scheduling and execution of health checks for a specific campaign.
 * It ensures that checks are performed at regular intervals, respects the campaign's active status,
 * and handles periods of inactivity gracefully.
 */
class CampaignScheduler {
  private campaign: Campaign;
  private timer: NodeJS.Timeout | null = null;
  private urlService: UrlService;
  private responseService: ResponseService;
  private campaignUrlDb: Repository<CampaignUrl>;
  private lastCheckTime: number | null = null;

  constructor(campaign: Campaign) {
    this.campaign = campaign;
    this.urlService = new UrlService();
    this.responseService = new ResponseService();
    this.campaignUrlDb = datasource.getRepository(CampaignUrl);
    this.updateSchedule();
  }

  /**
   * Runs health checks for the campaign if conditions are met.
   * This method is called by the scheduler at each interval.
   */
  private async runHealthChecksForCampaign(campaignId: number): Promise<void> {
    // Skip checks for inactive campaigns
    if (!this.campaign.isWorking) {
      return;
    }

    const now = Date.now();

    if (this.shouldPerformCheck(now)) {
      try {
        // Fetch URLs associated with the campaign
        const urlsToCheck = await this.campaignUrlDb
          .createQueryBuilder("campaignUrl")
          .innerJoinAndSelect("campaignUrl.campaign", "campaign")
          .innerJoinAndSelect("campaignUrl.url", "url")
          .where("campaignUrl.campaign.id = :campaignId", { campaignId })
          .getMany();

        // Perform health check for each URL
        for (const campaignUrl of urlsToCheck) {
          const checkResult = await this.urlService.checkURL(
            campaignUrl.url.urlPath
          );
          if (
            checkResult.status !== null &&
            checkResult.responseTime !== null
          ) {
            // Save the check result
            await this.responseService.createResponse({
              responseTime: checkResult.responseTime,
              statusCode: checkResult.status,
              statusText: checkResult.statusText,
              campaignUrlId: campaignUrl.id,
              campaignId: campaignId,
            });
          } else {
            console.error(`Check failed for URL: ${campaignUrl.url.urlPath}`);
          }
        }

        // Update the last check time
        this.lastCheckTime = now;
      } catch (error) {
        console.error(
          `Error running health checks for campaign ${this.campaign.name} (ID: ${this.campaign.id}):`,
          error
        );
      }
    }

    // Schedule the next check
    this.scheduleNextCheck();
  }

  /**
   * Determines if a health check should be performed based on the last check time and interval.
   * @param now The current timestamp.
   * @returns True if a check should be performed, false otherwise.
   */
  private shouldPerformCheck(now: number): boolean {
    if (this.lastCheckTime === null) {
      // First check or after a period of inactivity
      return true;
    }

    const intervalMs = (this.campaign.intervalTest || 60) * 60 * 1000; // Convert minutes to milliseconds
    return now - this.lastCheckTime >= intervalMs;
  }

  /**
   * Schedules the next health check based on the campaign's interval and last check time.
   */
  private scheduleNextCheck() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const intervalMs = (this.campaign.intervalTest || 60) * 60 * 1000;
    const now = Date.now();
    let nextCheckTime: number;

    if (this.lastCheckTime === null) {
      // First check or after a period of inactivity
      nextCheckTime = now + intervalMs;
    } else {
      // Calculate next interval based on last check
      nextCheckTime = this.lastCheckTime + intervalMs;
      if (nextCheckTime <= now) {
        // If next check is already past, schedule for the next interval
        nextCheckTime = now + intervalMs;
      }
    }

    const delay = nextCheckTime - now;
    this.timer = setTimeout(() => this.runCheck(), delay);
  }

  /**
   * Updates the campaign information and reschedules checks if necessary.
   * @param updatedCampaign The updated campaign information.
   */
  updateCampaign(updatedCampaign: Campaign) {
    const needsReschedule =
      this.campaign.intervalTest !== updatedCampaign.intervalTest ||
      this.campaign.isWorking !== updatedCampaign.isWorking;

    this.campaign = updatedCampaign;

    if (needsReschedule) {
      this.scheduleNextCheck();
    }
  }

  private updateSchedule() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.campaign.isWorking) {
      this.scheduleNextCheck();
    }
  }

  private async runCheck() {
    if (this.campaign.isWorking) {
      await this.runHealthChecksForCampaign(this.campaign.id);
      this.scheduleNextCheck();
    }
  }

  /**
   * Stops the scheduler and marks the campaign as inactive.
   */
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.campaign.isWorking = false;
  }
}

/**
 * CampaignManagerService manages multiple CampaignSchedulers.
 * It handles the initialization, updating, and removal of campaigns and their respective schedulers.
 */
export class CampaignManagerService {
  private campaignSchedulers: Map<number, CampaignScheduler> = new Map();
  private campaignRepository: Repository<Campaign>;

  constructor() {
    this.campaignRepository = datasource.getRepository(Campaign);
  }

  async initializeAllCampaigns() {
    const campaigns = await this.campaignRepository.find();
    for (const campaign of campaigns) {
      this.initializeCampaign(campaign);
    }
  }

  initializeCampaign(campaign: Campaign) {
    const scheduler = new CampaignScheduler(campaign);
    this.campaignSchedulers.set(campaign.id, scheduler);
  }

  updateCampaign(updatedCampaign: Campaign) {
    const scheduler = this.campaignSchedulers.get(updatedCampaign.id);
    if (scheduler) {
      scheduler.updateCampaign(updatedCampaign);
    } else {
      console.warn(
        `No existing scheduler found for campaign: ${updatedCampaign.name} (ID: ${updatedCampaign.id}). Initializing new scheduler.`
      );
      this.initializeCampaign(updatedCampaign);
    }
  }

  removeCampaign(campaignId: number) {
    const scheduler = this.campaignSchedulers.get(campaignId);
    if (scheduler) {
      scheduler.stop();
      this.campaignSchedulers.delete(campaignId);
    } else {
      console.warn(`No scheduler found for campaign ID: ${campaignId}`);
    }
  }
}
