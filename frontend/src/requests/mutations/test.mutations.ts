import { gql } from "@apollo/client";

export const CREATE_TEST = gql`
  mutation AddTest($text: String!) {
    addTest(text: $text) {
      id
      text
    }
  }
`;
