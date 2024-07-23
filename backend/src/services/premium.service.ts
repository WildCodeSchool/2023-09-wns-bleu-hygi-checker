import { Repository } from "typeorm";

import Premium, { InputCreateCode } from "../entities/premium.entity";
import datasource from "../lib/datasource";

export default class PremiumService {
  db: Repository<Premium>;
  constructor() {
    this.db = datasource.getRepository(Premium);
  }

  async findExistingCode(sentCode: string) {
    const existingCode = await this.db.findOne({
      where: {
        code: sentCode,
      },
    });
    if (!existingCode) {
      throw new Error("This code is invalid");
    }
    return existingCode;
  }

  async createNewPremiumCode(code: InputCreateCode) {
    const newCode = this.db.create(code);
    return this.db.save(newCode);
  }

  async useCode(code: Premium) {
    const usedCode = this.db.create({ ...code });
    usedCode.isUsed = true;
    return this.db.save(usedCode);
  }
}
