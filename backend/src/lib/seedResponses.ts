import Response from "../entities/response.entity";
import db from "./datasource";
import getDateInUTCPlus2 from "../utils/getTimeUTC2";

async function seedDB() {
  await db.initialize();

  const dateInUTCPlus2 = getDateInUTCPlus2();

  // Définition des codes de statut HTTP et leurs textes associés avec probabilité
  const statusCodes = [
    { code: 200, text: "200 OK", probability: 0.75 },
    { code: 404, text: "404 Not Found", probability: 0.1 },
    { code: 500, text: "500 Internal Server Error", probability: 0.1 },
    { code: 301, text: "301 Moved Permanently", probability: 0.01 },
    { code: 401, text: "401 Unauthorized", probability: 0.02 },
    { code: 403, text: "403 Forbidden", probability: 0.02 },
  ];

  // Nombre total de réponses à générer
  const numResponses = 100;

  // Fonction pour générer un nombre aléatoire entre min et max inclus
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Boucle pour créer les réponses
  const responses = [];
  for (let i = 0; i < numResponses; i++) {
    const randomStatusCode = chooseStatusCode(statusCodes);
    const response = Response.create({
      responseTime: getRandomInt(100, 600),
      statusCode: randomStatusCode.code,
      statusText: randomStatusCode.text,
      createdAt: dateInUTCPlus2.toISOString(),
      campaignUrl: { id: getRandomInt(1, 7) },
    });
    responses.push(response);
  }

  // Sauvegarde des réponses dans la base de données
  await Response.save(responses);

  await db.destroy();
  console.info(
    `Database seeded successfully ! ${numResponses} responses has been created.`
  );
}

// Fonction pour choisir aléatoirement le code de statut en fonction des probabilités
function chooseStatusCode(
  statusCodes: { code: number; text: string; probability: number }[]
) {
  const rand = Math.random();
  let cumulativeProbability = 0;
  for (const statusCode of statusCodes) {
    cumulativeProbability += statusCode.probability;
    if (rand <= cumulativeProbability) {
      return statusCode;
    }
  }
  // Par défaut, retourner le dernier code de statut (pour éviter une erreur)
  return statusCodes[statusCodes.length - 1];
}

seedDB();
