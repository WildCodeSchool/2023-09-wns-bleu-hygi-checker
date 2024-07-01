import { gql } from "@apollo/client";

export const GET_LAST_DAY_URL_RESPONSES = gql`
  query LastDayResponsesOfOneUrl($campaignUrlId: Int!) {
    lastDayResponsesOfOneUrl(campaignUrlId: $campaignUrlId) {
      id
      responseTime
      statusCode
      createdAt
      campaignUrl {
        id
      }
    }
  }
`;
