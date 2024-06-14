import { gql } from "@apollo/client";

export const GET_CAMPAIGN_BY_ID = gql`
  query CampaignById($campaignId: Int!) {
    campaignById(campaignId: $campaignId) {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
    }
  }
`;
