import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "0"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  // logging: true,
});

// export default new DataSource({
//   type: "postgres",
//   database: "./demo.sqlite",
//   synchronize: true,
//   entities: ["src/entities/*.ts"],
//   logging: ["query", "error"],
// });
