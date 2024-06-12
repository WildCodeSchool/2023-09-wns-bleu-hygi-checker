import db from "./datasource";

async function clearDB() {
  const runner = db.createQueryRunner();

  // delete all tables
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );

  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();
  await db.destroy();
  console.info("Database reseted successfully !");
}

main();
