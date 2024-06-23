import { gql } from "@apollo/client";

export const CHANGE_IMAGE_CAMPAIGN = gql`
  mutation ModifyImageOfCampaign($input: InputEditCampaignImage!) {
    modifyImageOfCampaign(input: $input) {
      success
      message
    }
  }
`;
