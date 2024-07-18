import HealthCheckService from "../services/healthCheck.service";

export class HealthCheckScheduler {
  private healthCheckService: HealthCheckService;
  private interval: number;
  private isRunning: boolean;

  constructor(interval: number = 30000) {
    // 30 seconds by default
    this.healthCheckService = new HealthCheckService();
    this.interval = interval;
    this.isRunning = false;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.scheduleNextRun();
    }
  }

  stop() {
    this.isRunning = false;
  }

  private scheduleNextRun() {
    setTimeout(async () => {
      if (!this.isRunning) return;

      console.warn("Running health checks...");
      try {
        await this.healthCheckService.runHealthChecks();
        console.warn("Health checks completed successfully");
      } catch (error) {
        console.error("Error running health checks:", error);
      }

      this.scheduleNextRun();
    }, this.interval);
  }
}
