import { gql } from "@apollo/client";

export const CHANGE_AVATAR = gql`
  mutation ChangePassword($passwordData: inputUpdatePassword!) {
    changePassword(passwordData: $passwordData) {
      success
      message
    }
  }
`;
