import Response from "../entities/response.entity";
import db from "./datasource";

async function seedResponses() {
  await db.initialize();

  // Définition des codes de statut HTTP et leurs textes associés avec probabilité
  const statusCodes = [
    { code: 200, text: "200 OK", probability: 0.6 },
    { code: 404, text: "404 Not Found", probability: 0.15 },
    { code: 500, text: "500 Internal Server Error", probability: 0.15 },
    { code: 301, text: "301 Moved Permanently", probability: 0.05 },
    { code: 401, text: "401 Unauthorized", probability: 0.025 },
    { code: 403, text: "403 Forbidden", probability: 0.025 },
  ];

  // Nombre total de réponses à générer par URL et nombre d'URLs
  const numResponsesPerHour = 24;
  const numUrls = 7;

  // Fonction pour générer un nombre aléatoire entre min et max inclus
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Obtenir la date du jour formatée
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatedDate = `${year}-${month}-${day}`;

  // Boucle pour créer les réponses pour chaque heure de la journée et pour chaque URL
  const responses = [];
  for (let urlId = 1; urlId <= numUrls; urlId++) {
    for (let hour = 0; hour < numResponsesPerHour; hour++) {
      const randomStatusCode = chooseStatusCode(statusCodes);
      const response = Response.create({
        responseTime: getRandomInt(100, 600),
        statusCode: randomStatusCode.code,
        statusText: randomStatusCode.text,
        createdAt: `${formatedDate}T${hour.toString().padStart(2, "0")}:30:00.855Z`,
        campaignUrl: { id: urlId },
      });
      responses.push(response);
    }
  }

  // Sauvegarde des réponses dans la base de données
  await Response.save(responses);

  await db.destroy();
  console.info(
    `Database seeded successfully ! Every URL has 24 responses on the last day.`
  );
}

seedResponses();
