import { gql } from "@apollo/client";

export const COUNT_RESPONSES = gql`
  query CountResponsesByCampaignUrlId($campaignUrlId: Int!) {
    countResponsesByCampaignUrlId(campaignUrlId: $campaignUrlId) {
      count
    }
  }
`;
