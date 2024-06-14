import { gql } from "@apollo/client";

export const GET_URL_FROM_CAMPAIGN = gql`
  query GetUrlFromCampaign($campaignId: Float!) {
    getUrlFromCampaign(campaignId: $campaignId) {
      id
      createdAt
      campaign {
        id
      }
      url {
        id
        urlPath
        type
      }
    }
  }
`;
