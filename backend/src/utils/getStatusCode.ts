import httpStatusCodes from "./httpStatusCodes";

function getStatusCodeDescription(code) {
  const statusCode =
    httpStatusCodes.informativeResponses.find(
      (status) => status.code === code
    ) ||
    httpStatusCodes.successResponses.find((status) => status.code === code) ||
    httpStatusCodes.redirectionResponses.find(
      (status) => status.code === code
    ) ||
    httpStatusCodes.clientErrorResponses.find(
      (status) => status.code === code
    ) ||
    httpStatusCodes.serverErrorResponses.find((status) => status.code === code);
  return statusCode ? statusCode.description : "Unknown status code";
}

export default getStatusCodeDescription;
