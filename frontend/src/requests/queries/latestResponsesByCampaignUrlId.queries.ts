import { gql } from "@apollo/client";

export const GET_LAST_RESPONSES_ON_EACH_CAMPAIGNURL = gql`
  query LatestResponsesByCampaignUrlId($campaignId: Int!) {
    latestResponsesByCampaignUrlId(campaignId: $campaignId) {
      createdAt
    }
  }
`;
