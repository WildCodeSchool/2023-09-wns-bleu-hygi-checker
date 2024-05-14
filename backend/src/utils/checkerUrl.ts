/**
 * Envoie une requête GET à l'URL fournie et affiche diverses informations sur la réponse, y compris le temps de réponse et la date de réponse.
 * @param {string} url L'URL à vérifier.
 */
async function checkerURL(url: string) {
  const startTime = Date.now(); // Enregistre le moment du début de la requête

  try {
    const response = await fetch(url);
    const endTime = Date.now(); // Enregistre le moment de la fin de la requête

    const responseTime = endTime - startTime; // Calcul du temps de réponse
    const responseDate = response.headers.get("date") || "Non disponible"; // Extraction de la date de réponse à partir des headers

    console.info(`URL : ${url}`);
    console.info(
      `Statut de la réponse : ${response.status} ${response.statusText}`
    );
    console.info(`Temps de réponse : ${responseTime} ms`);
    console.info(`Date de la réponse : ${responseDate}`);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'URL:", error);
  }
}

if (process.argv.length > 2) {
  const url = process.argv[2];
  checkerURL(url);
} else {
  console.error("Veuillez spécifier une URL comme argument.");
}

export default checkerURL;

// Exemple d'utilisation: npm run check-url https://www.wildcodeschool.com/
