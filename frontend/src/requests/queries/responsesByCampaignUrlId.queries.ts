import { gql } from "@apollo/client";

export const RESPONSES_BY_CAMPAIGNURLID = gql`
  query ResponsesByCampaignUrlId($campaignId: Int!) {
    responsesByCampaignUrlId(campaignId: $campaignId) {
      statusCode
    }
  }
`;
