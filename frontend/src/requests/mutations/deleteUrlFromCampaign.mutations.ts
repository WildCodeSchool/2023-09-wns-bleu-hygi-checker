import { gql } from "@apollo/client";

export const DELETE_URL_FROM_CAMPAIGN = gql`
  mutation DeleteUrlFromCampaign($infos: InputDeleteUrlToCampaign!) {
    deleteUrlFromCampaign(infos: $infos) {
      success
      message
    }
  }
`;
