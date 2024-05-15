import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import Cookies from "cookies";
import cors from "cors";
import express from "express";
import { jwtVerify } from "jose";

import "reflect-metadata";
import User from "./entities/user.entity";
import datasource from "./lib/datasource";
import schemaPromise from "./schema"; // schemaPromise is a alias of the buildSchema that is deported in backend/src/schema.ts
import UserService from "./services/user.service";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}
export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await schemaPromise;

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
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
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new UserService().findUserByEmail(
              verify.payload.email
            );
          } catch (err) {
            console.error(err);
            //potentiellement gérer l'erreur, est ce que l'erreur est liée au fait que le token soit expiré? est ce qu'on le renouvelle? ou est ce autre chose? etc...
          }
        }
        return { req, res, user };
      },
    })
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );
  console.info(`🚀 Server lancé sur http://localhost:4001/`);
}

main();
