// Function to get color based on statusCode
export const getStatusColor = (
  statusCode: number | null | undefined,
  isBackground: boolean
) => {
  if (statusCode === 200) {
    return `${isBackground === true ? "bg-green-500" : "text-green-500"}`;
  }
  if (statusCode === 404) {
    return `${isBackground === true ? "bg-orange-500" : "text-orange-500"}`;
  }
  if (statusCode === 500) {
    return `${isBackground === true ? "bg-red-600" : "text-red-600"}`;
  }
  if (
    statusCode !== null &&
    statusCode !== undefined &&
    statusCode !== 200 &&
    statusCode !== 404 &&
    statusCode !== 500
  ) {
    return `${isBackground === true ? "bg-yellow-400" : "text-yellow-400"}`;
  }
  return `${isBackground === true ? "bg-white" : "text-white"}`;
};

// ----------------------------------------------------------------------------

// Function to get color based on responseTime
export const getResponseColor = (responseTime: number | null | undefined) => {
  if (
    responseTime !== null &&
    responseTime !== undefined &&
    responseTime <= 200
  ) {
    return "text-green-500";
  }
  if (
    responseTime !== null &&
    responseTime !== undefined &&
    responseTime > 200 &&
    responseTime <= 300
  ) {
    return "text-yellow-500";
  }
  if (
    responseTime !== null &&
    responseTime !== undefined &&
    responseTime > 300 &&
    responseTime <= 400
  ) {
    return "text-orange-600";
  }
  if (
    responseTime !== null &&
    responseTime !== undefined &&
    responseTime > 400
  ) {
    return "text-red-600";
  }

  return "text-white";
};

// ----------------------------------------------------------------------------

// Function to get color based on responseTime
export const getAvailabilityColor = (uptime: number | null | undefined) => {
  if (uptime !== null && uptime !== undefined && uptime >= 90) {
    return "text-green-500";
  }
  if (uptime !== null && uptime !== undefined && uptime >= 80 && uptime < 90) {
    return "text-yellow-500";
  }
  if (uptime !== null && uptime !== undefined && uptime >= 70 && uptime < 80) {
    return "text-orange-600";
  }
  if (uptime !== null && uptime !== undefined && uptime < 70) {
    return "text-red-600";
  }

  return "text-white";
};
