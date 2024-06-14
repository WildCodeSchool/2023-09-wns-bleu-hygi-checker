import { gql } from "@apollo/client";

export const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($campaignId: Float!) {
    deleteCampaign(campaignId: $campaignId) {
      message
      success
    }
  }
`;
