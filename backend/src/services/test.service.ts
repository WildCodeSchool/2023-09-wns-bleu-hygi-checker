import { Repository } from "typeorm";

import Test, { InputTest } from "./../entities/test.entity";
import datasource from "../lib/datasource";

export default class TestService {
  db: Repository<Test>;
  constructor() {
    this.db = datasource.getRepository(Test);
  }

  async testQuery() {
    return this.db.find();
  }

  async findOneTest(id: string) {
    const test = await this.db.findOneBy({ id });
    if (!test) {
      throw new Error("Ce test n'existe pas");
    }
    return test;
  }

  async addOneTest({ text }: InputTest) {
    const newTest = this.db.create({ text });
    return this.db.save(newTest);
  }

  async deleteTest(id: string) {
    const test = (await this.findOneTest(id)) as Test;
    await this.db.remove(test);
    return { ...test, id };
  }
}
