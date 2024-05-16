import { gql } from "@apollo/client";

export const CHECK_URL = gql`
  query CheckUrl($urlPath: String!) {
    checkUrl(urlPath: $urlPath) {
      status
      statusText
      responseTime
      responseDate
    }
  }
`;
