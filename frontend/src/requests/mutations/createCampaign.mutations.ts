import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($input: InputCreateCampaign!) {
    createCampaign(input: $input) {
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
