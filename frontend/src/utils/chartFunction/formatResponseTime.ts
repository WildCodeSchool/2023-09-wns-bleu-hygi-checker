import { InputData } from "@/types/interfaces";

export interface OutputData {
  id: string;
  color: string;
  data: { x: number; y: number | null | undefined }[];
}

export const formatResponseTime = (inputData: InputData[]): OutputData[] => {
  const outputData: OutputData = {
    id: "response",
    color: "hsl(253, 74%, 50%)",
    data: [],
  };

  for (let i = 0; i < inputData.length; i++) {
    if (
      inputData[i].createdAt &&
      inputData[i].responseTime &&
      inputData[i].responseTime !== null &&
      inputData[i].responseTime !== undefined
    ) {
      outputData.data.push({ x: i + 1, y: inputData[i].responseTime });
    }
  }

  outputData.data.reverse();
  return [outputData];
};
