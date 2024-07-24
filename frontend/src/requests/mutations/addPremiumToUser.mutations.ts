import { gql } from "@apollo/client";

export const ADD_PREMIUM_TO_USER = gql`
  mutation AddPremiumToUser($inputCode: String!) {
    addPremiumToUser(inputCode: $inputCode) {
      message
      success
    }
  }
`;
