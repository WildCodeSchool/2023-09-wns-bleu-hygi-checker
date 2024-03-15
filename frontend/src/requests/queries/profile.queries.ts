import { gql } from "@apollo/client";

export const READ_TEST = gql`
  query Profile {
    profile {
      email
    }
  }
`;
