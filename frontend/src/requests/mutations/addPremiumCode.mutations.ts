import { gql } from "@apollo/client";

export const ADD_PREMIUM_CODE = gql`
  mutation AddCode {
    addCode {
      id
      code
      isUsed
      createdAt
    }
  }
`;
