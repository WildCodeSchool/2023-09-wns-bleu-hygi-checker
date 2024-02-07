import TestResolver from "./resolvers/test.resolver";
import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import axios from "axios";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [TestResolver],
    validate: false,
  });

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
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  app.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const { url } = req.body;
      console.log("URL reçue:", url);
      // console.log("Méthode reçue:", method);
      // const response = await axios({
      //   method: method || "GET", // Utilise GET par défaut si aucune méthode n'est fournie
      //   url,
      // });
      const response = await axios.get(url);
      res.status(response.status).send();
    } catch (error: any) {
      console.error("Erreur de proxy:", error.message);
      res.status(500).json({ error: error.message });
    }
    // app.listen(4000, () => {
    //   console.log(`Le serveur proxy est en écoute sur le port ${4000}`);
    // });
  });
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4001/`);
}

main();
