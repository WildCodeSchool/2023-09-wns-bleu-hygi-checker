import { gql } from "@apollo/client";

export const GET_AVATAR = gql`
  query GetAvatar {
    getAvatar {
      avatar
    }
  }
`;
