import { gql } from "@apollo/client";

export const GET_ALL_RESPONSES_FOR_ONE_URL = gql`
  query AllResponsesOfOneUrl($campaignUrlId: Int!) {
    allResponsesOfOneUrl(campaignUrlId: $campaignUrlId) {
      statusCode
    }
  }
`;
