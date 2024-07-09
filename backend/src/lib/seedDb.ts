import Test from "../entities/test.entity";
import User from "../entities/user.entity";
import Campaign from "../entities/campaign.entity";
import Url from "../entities/url.entity";
import Response from "../entities/response.entity";
import CampaignUrl from "../entities/campaignUrl.entity";
import argon2 from "argon2";
import db from "./datasource";
import { GENDER } from "../entities/user.entity";
import getDateInUTCPlus2 from "../utils/getTimeUTC2";

async function seedDB() {
  await db.initialize();

  // creation de resetTest dans la table Test
  const resetTest = Test.create({
    text: "First test after resetDb. ran seedDb.ts",
  });

  // sauvegarde
  await resetTest.save();

  // Création des utilisateurs
  const user1 = User.create({
    id: "c83135a6-3bd7-46b1-b6d8-6b4117cfabf7",
    username: "Jane Doe",
    email: "jane.doe@example.com",
    password: await argon2.hash("Hygichecker69!"),
    accepted_terms: true,
    gender: GENDER.female,
    birth_date: "1998-07-25",
    country: "FR",
    avatar: "avatar04",
    role: "USER",
  });

  const user2 = User.create({
    id: "5e4841aa-024e-4743-a1c6-a138b81bc1ab",
    username: "John Doe",
    email: "john.doe@example.com",
    password: await argon2.hash("Hygichecker69!"),
    accepted_terms: true,
    gender: GENDER.male,
    birth_date: "1998-07-25",
    country: "FR",
    avatar: "avatar01",
    role: "USER",
  });

  const user3 = User.create({
    id: "b3a1c9a6-f1c7-4d7b-8b85-123456789012",
    username: "Marco",
    email: "admin@example.com",
    password: await argon2.hash("Adminchecker69!"),
    accepted_terms: true,
    gender: GENDER.male,
    birth_date: "1998-07-25",
    country: "FR",
    avatar: "avatar01",
    role: "ADMIN",
  });

  await User.save([user1, user2, user3]);

  // Création des campagnes
  const campaign1 = Campaign.create({
    name: "Campaign #1",
    image:
      "https://fastly.picsum.photos/id/826/1920/1080.jpg?hmac=CSZ6ZNnqhNlFOUi55Unatj6afDU9RgJUK2RB6IPwkwg",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user1.id,
  });
  const campaign2 = Campaign.create({
    name: "Campaign #2",
    image:
      "https://fastly.picsum.photos/id/1063/1920/1080.jpg?hmac=bZWbcXgGOnrgZE0_VD2mUoLolkPdd3vBtNUXa-UxtY0",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user1.id,
  });

  const campaign3 = Campaign.create({
    name: "Campaign #3",
    image:
      "https://fastly.picsum.photos/id/1019/1920/1080.jpg?hmac=XGm3xPMZTa3H-YXR0qxs91ClJOdn43Ei0xRbGTpq6wA",
    intervalTest: 120,
    isMailAlert: true,
    isWorking: true,
    userId: user1.id,
  });

  const campaign4 = Campaign.create({
    name: "Campaign #4",
    image:
      "https://fastly.picsum.photos/id/482/1920/1080.jpg?hmac=WOOpg36fuOhzwR8Jl4Dcc_l6krSTlHl70b8BhoaXQqU",
    intervalTest: 120,
    isMailAlert: true,
    isWorking: true,
    userId: user1.id,
  });

  const campaign5 = Campaign.create({
    name: "Campaign #5",
    image:
      "https://fastly.picsum.photos/id/993/1920/1080.jpg?hmac=dPlPg5Ajy9w_la62n3jwZAj0xuIkFA9jvQjg3bbJiVg",
    intervalTest: 60,
    isMailAlert: false,
    isWorking: true,
    userId: user1.id,
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

  await Url.save([url1, url2, url3, url4, url5, url6, url7]);

  // Création des url dans les campagnes
  const campaignUrl1 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url1.id },
  });
  const campaignUrl2 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url2.id },
  });
  const campaignUrl3 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url3.id },
  });
  const campaignUrl4 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url4.id },
  });
  const campaignUrl5 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url5.id },
  });
  const campaignUrl6 = CampaignUrl.create({
    campaign: { id: campaign1.id },
    url: { id: url6.id },
  });
  const campaignUrl7 = CampaignUrl.create({
    campaign: { id: campaign5.id },
    url: { id: url7.id },
  });

  await CampaignUrl.save([
    campaignUrl1,
    campaignUrl2,
    campaignUrl3,
    campaignUrl4,
    campaignUrl5,
    campaignUrl6,
    campaignUrl7,
  ]);

  // Création des réponses pour chaque URL
  const dateInUTCPlus2 = getDateInUTCPlus2();

  const responses1_200 = Response.create({
    responseTime: 300,
    statusCode: 200,
    statusText: "200 OK",
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl7.id },
  });

  const responses2_200 = Response.create({
    responseTime: 100,
    statusCode: 200,
    statusText: "200 OK",
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl7.id },
  });

  const responses3_200 = Response.create({
    responseTime: 150,
    statusText: "200 OK",
    statusCode: 200,
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl7.id },
  });

  const responses4_404 = Response.create({
    responseTime: 300,
    statusCode: 404,
    statusText: "404 Not Found",
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl7.id },
  });

  const responses5_500 = Response.create({
    responseTime: 250,
    statusCode: 500,
    statusText: "500 Internal Server Error",
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl7.id },
  });

  const responses6_200 = Response.create({
    responseTime: 150,
    statusCode: 200,
    statusText: "200 OK",
    createdAt: dateInUTCPlus2.toISOString(),
    campaignUrl: { id: campaignUrl5.id },
  });
  await Response.save([
    responses1_200,
    responses2_200,
    responses3_200,
    responses4_404,
    responses5_500,
    responses6_200,
  ]);

  await db.destroy();
  console.info("Database reseeded successfully !");
}

seedDB();
