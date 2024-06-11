import { gql } from "@apollo/client";

export const CHANGE_AVATAR = gql`
  mutation ChangeAvatar($newAvatar: String!) {
    changeAvatar(newAvatar: $newAvatar) {
      avatar
    }
  }
`;
