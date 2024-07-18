import { gql } from "@apollo/client";

export const EDIT_CAMPAIGN = gql`
  mutation ModifyCampaign($input: InputEditCampaign!) {
    modifyCampaign(input: $input) {
      success
      message
    }
  }
`;
