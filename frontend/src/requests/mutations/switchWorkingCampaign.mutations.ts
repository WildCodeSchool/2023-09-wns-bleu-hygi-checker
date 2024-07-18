import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN = gql`
  mutation SwitchWorkingCampaign($input: InputSwitchWorkingCampaign!) {
    switchWorkingCampaign(input: $input) {
      message
      success
    }
  }
`;
