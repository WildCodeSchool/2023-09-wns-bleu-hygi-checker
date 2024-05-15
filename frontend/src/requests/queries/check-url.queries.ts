import { gql } from "@apollo/client";

export const CHECK_URL = gql`
  query Query($urlPath: String!) {
    checkUrl(urlPath: $urlPath)
  }
`;
