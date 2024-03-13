import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import User from "../entities/user.entity";
import Test from "../entities/test.entity";

dotenv.config();

const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db" || "testDB",
  port: parseInt(process.env.DB_PORT || "0") || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: [User, Test],
  synchronize: true,
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
