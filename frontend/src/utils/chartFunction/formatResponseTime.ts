export interface InputData {
  __typename?: "Response" | undefined;
  id: number | null | undefined;
  responseTime?: number | null | undefined;
  statusCode?: number | null | undefined;
  createdAt?: Date | null | undefined;
  campaignUrl: {
    __typename?: "CampaignUrl" | undefined;
    id: number;
  };
}

export interface OutputData {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}

export const formatResponseTime = (inputData: InputData[]): OutputData[] => {
  const outputData: OutputData = {
    id: "response",
    color: "hsl(253, 74%, 50%)",
    data: [],
  };

  inputData.forEach((response) => {
    if (
      response.createdAt &&
      response.responseTime &&
      response.responseTime !== null &&
      response.responseTime !== undefined
    ) {
      const date = new Date(response.createdAt);
      const hours = date.getHours().toString().padStart(2, "0");

      const exists = outputData.data.some((entry) => entry.x === hours);

      if (!exists) {
        outputData.data.push({ x: hours, y: response.responseTime });
      }
    }
  });
  outputData.data.reverse();
  return [outputData];
};
