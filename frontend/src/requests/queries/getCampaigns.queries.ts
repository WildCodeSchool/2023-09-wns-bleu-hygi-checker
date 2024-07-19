import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
  query CampaignsByUserId {
    campaignsByUserId {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
      createdAt
    }
  }
`;
