import { InputData } from "@/types/interfaces";

export const calculateAverageResponseTime = (
  responses: InputData[]
): number => {
  const validResponses = responses.filter(
    (response) =>
      response.responseTime !== null && response.responseTime !== undefined
  );

  if (validResponses.length === 0) {
    return 0; // Si aucune réponse valide, retourner 0 pour éviter la division par 0
  }

  const totalResponseTime = validResponses.reduce(
    (total, response) => total + (response.responseTime as number),
    0
  );
  const averageResponseTime = totalResponseTime / validResponses.length;

  return Math.round(averageResponseTime);
};
