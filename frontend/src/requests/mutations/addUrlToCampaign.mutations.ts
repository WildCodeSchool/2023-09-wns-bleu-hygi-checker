import { gql } from "@apollo/client";

export const ADD_URL_TO_CAMPAIGN = gql`
  mutation AddUrlToCampaign($infos: InputAddUrlToCampaign!) {
    addUrlToCampaign(infos: $infos) {
      success
      message
    }
  }
`;
