import { gql } from "graphql-tag";

export default gql`
  query Tests {
    tests {
      text
      id
    }
  }
`;
