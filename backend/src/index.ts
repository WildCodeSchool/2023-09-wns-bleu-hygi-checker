import TestResolver from "./resolvers/test.resolver";
import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import schemaPromise from "./schema"; // schemaPromise is a alias of the buildSchema that is deported in backend/src/schema.ts


const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await schemaPromise
 
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });
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
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4001/`);
}

main();
