import Test from "../entities/test.entity";
import User from "../entities/user.entity";
import Campaign from "../entities/campaign.entity";
import Url from "../entities/url.entity";
import Response from "../entities/response.entity";
import argon2 from "argon2";
import db from "./datasource";

async function seedDB() {
  await db.initialize();
  console.info("start seeding database...");

  // creation de resetTest dans la table Test
  const resetTest = Test.create({
    text: "First test after resetDb. ran seedDb.ts",
  });

  // sauvegarde
  await resetTest.save();

  // Création des utilisateurs
  const user1 = User.create({
    id: "c83135a6-3bd7-46b1-b6d8-6b4117cfabf7",
    email: "jane.doe@example.com",
    password: await argon2.hash("toto"),
    role: "USER",
  });

  const user2 = User.create({
    id: "5e4841aa-024e-4743-a1c6-a138b81bc1ab",
    email: "john.doe@example.com",
    password: await argon2.hash("toto"),
    role: "USER",
  });

  const user3 = User.create({
    id: "b3a1c9a6-f1c7-4d7b-8b85-123456789012",
    email: "admin@example.com",
    password: await argon2.hash("admin"),
    role: "ADMIN",
  });

  await User.save([user1, user2, user3]);

  // Création des campagnes
  const campaign1 = Campaign.create({
    name: "Campaign1_User1",
    image:
      "https://images.unsplash.com/photo-1564406836777-5964b5c6c3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE3MTU4NzgwNDQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user1.id,
  });
  const campaign2 = Campaign.create({
    name: "Campaign1_User2",
    image:
      "https://images.unsplash.com/photo-1676495906154-96415c612630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVycyxsYW5kc2NhcGV8fHx8fHwxNzE1ODgwMTIw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user2.id,
  });

  const campaign3 = Campaign.create({
    name: "Campaign2_User1",
    image:
      "https://images.unsplash.com/photo-1502088513349-3ff6482aa816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVycyxsYW5kc2NhcGV8fHx8fHwxNzE1ODgwMTQ2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    intervalTest: 120,
    isMailAlert: true,
    isWorking: true,
    userId: user1.id,
  });

  const campaign4 = Campaign.create({
    name: "Campaign2_User2",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVycyxsYW5kc2NhcGV8fHx8fHwxNzE1ODgwMTc3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    intervalTest: 120,
    isMailAlert: true,
    isWorking: true,
    userId: user2.id,
  });

  const campaign5 = Campaign.create({
    name: "Campaign1_User3",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVycyxsYW5kc2NhcGV8fHx8fHwxNzE1ODgwMTk1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user3.id,
  });

  await Campaign.save([campaign1, campaign2, campaign3, campaign4, campaign5]);

  //Création des URLs partagées entre campagnes
  const url1 = Url.create({
    urlPath: "https://nextjs.org/",
    type: "PAGE",
  });

  const url2 = Url.create({
    urlPath: "https://ui.shadcn.com/",
    type: "PAGE",
  });

  const url3 = Url.create({
    urlPath: "https://tailwindcss.com/",
    type: "PAGE",
  });

  const url4 = Url.create({
    urlPath: "https://github.com/",
    type: "PAGE",
  });

  const url5 = Url.create({
    urlPath: "https://www.youtube.com/",
    type: "PAGE",
  });

  const url6 = Url.create({
    urlPath: "https://www.npmjs.com/",
    type: "PAGE",
  });

  const url7 = Url.create({
    urlPath: "https://jestjs.io/",
    type: "PAGE",
  });

  url1.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url2.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url3.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url4.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url5.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url6.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];
  url7.campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5];

  await Url.save([url1, url2, url3, url4, url5, url6, url7]);

  // Création des réponses pour chaque URL
  const responses1_200 = Response.create({
    responseTime: 300,
    statusCode: "200 OK",
    creationDate: new Date("2023-05-15T00:00:00Z"),
  });

  const responses2_200 = Response.create({
    responseTime: 100,
    statusCode: "200 OK",
    creationDate: new Date("2023-05-15T00:00:00Z"),
  });

  const responses3_200 = Response.create({
    responseTime: 150,
    statusCode: "200 OK",
    creationDate: new Date("2023-05-15T00:00:00Z"),
  });

  const responses4_404 = Response.create({
    responseTime: 300,
    statusCode: "404 Not Found",
    creationDate: new Date("2023-05-15T00:00:00Z"),
  });

  const responses5_500 = Response.create({
    responseTime: 250,
    statusCode: "500 Internal Server Error",
    creationDate: new Date("2023-05-15T00:00:00Z"),
  });

  responses1_200.urlId = url1.id;
  responses2_200.urlId = url1.id;
  responses3_200.urlId = url1.id;
  responses4_404.urlId = url1.id;
  responses5_500.urlId = url1.id;

  await Response.save([
    responses1_200,
    responses2_200,
    responses3_200,
    responses4_404,
    responses5_500,
  ]);

  //   await db.destroy();
  //   console.info("Database reseeded successfully !");
}

seedDB();
