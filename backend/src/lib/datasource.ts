import { DataSource } from "typeorm";
// import dotenv from "dotenv";

// dotenv.config()

// console.log("Exemple d'un .env :", process.env.DB_PORT);

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "0"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: false,
});

// export default new DataSource({
//   type: "postgres",
//   database: "./demo.sqlite",
//   synchronize: true,
//   entities: ["src/entities/*.ts"],
//   logging: ["query", "error"],
// });
