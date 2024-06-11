import { gql } from "@apollo/client";

export const UPDATE_NAME = gql`
  mutation UpdateName($updateName: inputUpdateName!) {
    updateName(updateName: $updateName) {
      username
    }
  }
`;
