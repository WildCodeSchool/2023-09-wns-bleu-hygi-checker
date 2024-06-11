import { gql } from "@apollo/client";

export const GET_CAMPAIGN_BY_ID = gql`
  query CampaignById($campaignByIdId: Int!) {
    campaignById(id: $campaignByIdId) {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
      urls {
        id
        urlPath
        type
      }
    }
  }
`;
