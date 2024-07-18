import { InputData } from "@/types/interfaces";

export const calculateAvailability = (responses: InputData[]): number => {
  const totalResponses = responses.length;
  if (totalResponses === 0) {
    return 0; // Si aucune réponse, retourner 0 pour éviter la division par 0
  }

  const successfulResponses = responses.filter(
    (response) => response.statusCode === 200
  ).length;
  const availabilityPercentage = (successfulResponses / totalResponses) * 100;

  return Math.round(availabilityPercentage);
};
