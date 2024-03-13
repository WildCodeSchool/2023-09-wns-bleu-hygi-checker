import { gql } from 'graphql-tag'

export default gql`
  mutation Mutation($text: String!) {
    addTest(text: $text) {
      id
      text
    }
  }
`
