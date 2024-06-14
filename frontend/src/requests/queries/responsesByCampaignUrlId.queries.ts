import { gql } from "@apollo/client";

export const RESPONSES_BY_CAMPAIGNURLID = gql`
  query responsesByCampaignUrlId($campaignId: Int!) {
    responsesByCampaignUrlId(campaignId: $campaignId) {
      uuid
      responseTime
      statusCode
      createdAt
      campaignUrlId
    }
  }
`;
