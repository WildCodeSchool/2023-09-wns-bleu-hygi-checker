const httpStatusCodes = {
  informativeResponses: [
    { code: 100, description: "Continue: Indicates everything is OK so far." },
    {
      code: 101,
      description:
        "Switching Protocols: Server switches protocols as requested by the client.",
    },
    {
      code: 102,
      description:
        "Processing: WebDAV; Indicates that the server has received the request and is in the process of responding.",
    },
    {
      code: 103,
      description:
        "Early Hints: Used to return some response headers before the final HTTP message.",
    },
  ],
  successResponses: [
    { code: 200, description: "OK: The request has succeeded." },
    {
      code: 201,
      description:
        "Created: The request has succeeded and a new resource has been created.",
    },
    {
      code: 202,
      description:
        "Accepted: The request has been accepted for processing, but the processing has not been completed.",
    },
    {
      code: 203,
      description:
        "Non-Authoritative Information: The server is a transforming proxy that received a 200 OK from its origin but is returning a modified version of the origin's response.",
    },
    {
      code: 204,
      description:
        "No Content: The server successfully processed the request and is not returning any content.",
    },
    {
      code: 205,
      description:
        "Reset Content: The server successfully processed the request, but there is no content to send in the response.",
    },
    {
      code: 206,
      description:
        "Partial Content: The server is delivering only part of the resource due to a range header sent by the client.",
    },
    {
      code: 207,
      description:
        "Multi-Status: WebDAV; Status for multiple independent operations.",
    },
    {
      code: 208,
      description:
        "Already Reported: WebDAV; The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.",
    },
    {
      code: 226,
      description:
        "IM Used: The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
    },
  ],
  redirectionResponses: [
    {
      code: 300,
      description:
        "Multiple Choices: The requested resource corresponds to any one of a set of representations, each with its own specific location.",
    },
    {
      code: 301,
      description:
        "Moved Permanently: The requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs.",
    },
    {
      code: 302,
      description:
        "Found: The requested resource resides temporarily under a different URI.",
    },
    {
      code: 303,
      description:
        "See Other: The server sends this response to direct the client to get the requested resource at another URI with a GET request.",
    },
    {
      code: 304,
      description:
        "Not Modified: Indicates that the resource has not been modified since the version specified in the request headers.",
    },
    {
      code: 305,
      description:
        "Use Proxy: The requested resource is available only through a proxy, the address for which is provided in the response.",
    },
    {
      code: 307,
      description:
        "Temporary Redirect: The requested resource is available only through a temporary redirect.",
    },
    {
      code: 308,
      description:
        "Permanent Redirect: Indicates that the requested resource has been permanently moved to another location, and the redirected URL is given in the Location header.",
    },
  ],
  clientErrorResponses: [
    {
      code: 400,
      description:
        "Bad Request: The server cannot or will not process the request due to an apparent client error.",
    },
    {
      code: 401,
      description:
        "Unauthorized: Similar to 403 Forbidden, but specifically for authentication.",
    },
    { code: 402, description: "Payment Required: Reserved for future use." },
    {
      code: 403,
      description:
        "Forbidden: The client does not have access rights to the content.",
    },
    {
      code: 404,
      description: "Not Found: The server can't find the requested resource.",
    },
    {
      code: 405,
      description:
        "Method Not Allowed: The request method is known by the server but has been disabled and cannot be used.",
    },
    {
      code: 406,
      description:
        "Not Acceptable: The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.",
    },
    {
      code: 407,
      description:
        "Proxy Authentication Required: The client must first authenticate itself with the proxy.",
    },
    {
      code: 408,
      description:
        "Request Timeout: The server timed out waiting for the request.",
    },
    {
      code: 409,
      description:
        "Conflict: Indicates that the request could not be processed because of conflict in the request.",
    },
    {
      code: 410,
      description:
        "Gone: Indicates that the requested resource is no longer available and will not be available again.",
    },
    {
      code: 411,
      description:
        "Length Required: The request did not specify the length of its content, which is required by the requested resource.",
    },
    {
      code: 412,
      description:
        "Precondition Failed: The server does not meet one of the preconditions that the requester put on the request.",
    },
    {
      code: 413,
      description:
        "Payload Too Large: The request is larger than the server is willing or able to process.",
    },
    {
      code: 414,
      description:
        "URI Too Long: The URI provided was too long for the server to process.",
    },
    {
      code: 415,
      description:
        "Unsupported Media Type: The request entity has a media type that the server or resource does not support.",
    },
    {
      code: 416,
      description:
        "Range Not Satisfiable: The client has asked for a portion of the file, but the server cannot supply that portion.",
    },
    {
      code: 417,
      description:
        "Expectation Failed: The server cannot meet the requirements of the Expect request-header field.",
    },
    {
      code: 418,
      description:
        "I'm a teapot: This code is defined in RFC 2324 and is not expected to be implemented by actual HTTP servers.",
    },
    {
      code: 421,
      description:
        "Misdirected Request: The request was directed at a server that is not able to produce a response.",
    },
    {
      code: 422,
      description:
        "Unprocessable Entity: The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.",
    },
    {
      code: 423,
      description:
        "Locked: The source or destination resource of a method is locked.",
    },
    {
      code: 424,
      description:
        "Failed Dependency: The method could not be performed on the resource because the requested action depended on another action and that other action failed.",
    },
    {
      code: 426,
      description:
        "Upgrade Required: The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
    },
    {
      code: 428,
      description:
        "Precondition Required: The origin server requires the request to be conditional.",
    },
    {
      code: 429,
      description:
        "Too Many Requests: The user has sent too many requests in a given amount of time.",
    },
    {
      code: 431,
      description:
        "Request Header Fields Too Large: The server is unwilling to process the request because its header fields are too large.",
    },
    {
      code: 451,
      description:
        "Unavailable For Legal Reasons: A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.",
    },
  ],
  serverErrorResponses: [
    {
      code: 500,
      description:
        "Internal Server Error: The server has encountered a situation it doesn't know how to handle.",
    },
    {
      code: 501,
      description:
        "Not Implemented: The request method is not supported by the server and cannot be handled.",
    },
    {
      code: 502,
      description:
        "Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.",
    },
    {
      code: 503,
      description:
        "Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.",
    },
    {
      code: 504,
      description:
        "Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or application.",
    },
    {
      code: 505,
      description:
        "HTTP Version Not Supported: The server does not support the HTTP protocol version that was used in the request.",
    },
    {
      code: 506,
      description:
        "Variant Also Negotiates: Transparent content negotiation for the request results in a circular reference.",
    },
    {
      code: 507,
      description:
        "Insufficient Storage: The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
    },
    {
      code: 508,
      description:
        "Loop Detected: The server detected an infinite loop while processing a request with a Depth header.",
    },
    {
      code: 510,
      description:
        "Not Extended: Further extensions to the request are required for the server to fulfill it.",
    },
    {
      code: 511,
      description:
        "Network Authentication Required: The client needs to authenticate to gain network access.",
    },
  ],
};

export default httpStatusCodes;
