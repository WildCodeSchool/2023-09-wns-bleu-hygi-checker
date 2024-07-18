import { gql } from "@apollo/client";

export const COUNT_URL_FROM_CAMPAIGN = gql`
  query CountUrlFromCampaign($campaignId: Float!) {
    countUrlFromCampaign(campaignId: $campaignId) {
      count
    }
  }
`;
