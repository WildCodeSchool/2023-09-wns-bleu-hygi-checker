import { gql } from "@apollo/client";

export const REMOVE_PREMIUM_TO_USER = gql`
  mutation RemovePremiumToUser {
    RemovePremiumToUser {
      message
      success
    }
  }
`;
