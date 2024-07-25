import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import Cookies from "cookies";
import cors from "cors";
import express from "express";
import http from "http";
import { jwtVerify } from "jose";
import "reflect-metadata";
import User from "./entities/user.entity";
import datasource from "./lib/datasource";
import schemaPromise from "./schema";
import { CampaignManagerService } from "./services/campaignManager.service";
import UserService from "./services/user.service";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
  campaignManagerService: CampaignManagerService;
}

export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  try {
    await datasource.initialize();
    console.info("Database connection initialized successfully");

    const schema = await schemaPromise;

    console.info("Starting campaign manager initialization...");
    const campaignManagerService = new CampaignManagerService();
    await campaignManagerService.initializeAllCampaigns();
    console.info("Campaign manager initialization completed");

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(
      "/",
      cors<cors.CorsRequest>({
        origin: [
          "http://localhost:3000",
          "https://studio.apollographql.com",
          "https://0923-bleu-2.wns.wilders.dev/",
          "https://staging.0923-bleu-2.wns.wilders.dev/",
        ],
        credentials: true,
      }),
      express.json(),
      // expressMiddleware accepts the same arguments:
      // an Apollo Server instance and optional configuration options
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          let user: User | null = null;

          const cookies = new Cookies(req, res);
          const token = cookies.get("token");

          if (token) {
            try {
              const verify = await jwtVerify<Payload>(
                token,
                new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
              );

              user = await new UserService().findUserByEmail(
                verify.payload.email
              );
            } catch (err) {
              console.error("il s'est produit une erreur dans l'index");
              console.error(err);
              const cookies = new Cookies(req, res);
              cookies.set("token");
              //potentiellement gérer l'erreur, est ce que l'erreur est liée au fait que le token soit expiré? est ce qu'on le renouvelle? ou est ce autre chose? etc...
            }
          }
          return { req, res, user, campaignManagerService };
        },
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4001 }, resolve)
    );
    console.info(`🚀 Server launched on http://localhost:4001/`);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

main();
