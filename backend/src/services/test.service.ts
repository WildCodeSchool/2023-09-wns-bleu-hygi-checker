import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Test from "../entities/test.entity";

export default class TestService {
  db: Repository<Test>;
  constructor() {
    this.db = datasource.getRepository(Test);
  }

  async testQuery() {
    return this.db.find();
  }

}
