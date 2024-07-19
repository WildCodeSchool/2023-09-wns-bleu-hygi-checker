interface ResponseData {
  __typename?: "Response";
  statusCode?: number | null | undefined;
}

export interface DataItem {
  id: string; // Status code as string
  label: string; // Label to display
  value: number; // Number of responses with this status code
  color: string; // Color for the bar in the chart
}

const getStatusColor = (statusCode: number): string => {
  switch (statusCode) {
    case 200:
      return "hsl(113, 48%, 52%)";
    case 404:
      return "hsl(20, 100%, 48%)";
    case 500:
      return "hsl(0, 100%, 50%)";
    default:
      return "hsl(58, 76%, 55%)";
  }
};

export const countStatusCodes = (responses: ResponseData[]): DataItem[] => {
  const statusCounts: { [key: string]: number } = {
    "200": 0,
    "404": 0,
    "500": 0,
    other: 0,
  };

  responses.forEach((response) => {
    const statusCode = response.statusCode;
    if (statusCode !== undefined && statusCode !== null) {
      const statusCodeString = statusCode.toString();
      if (statusCounts.hasOwnProperty(statusCodeString)) {
        statusCounts[statusCodeString]++;
      } else {
        statusCounts["other"]++;
      }
    } else {
      statusCounts["other"]++;
    }
  });

  const data: DataItem[] = [
    {
      id: "200",
      label: "200",
      value: statusCounts["200"] || 0,
      color: getStatusColor(200),
    },
    {
      id: "404",
      label: "404",
      value: statusCounts["404"] || 0,
      color: getStatusColor(404),
    },
    {
      id: "500",
      label: "500",
      value: statusCounts["500"] || 0,
      color: getStatusColor(500),
    },
    {
      id: "other",
      label: "other",
      value: statusCounts["other"] || 0,
      color: getStatusColor(-1), // Color for "other" status
    },
  ];

  return data;
};
