import { gql } from '@apollo/client'

export const READ_TEST = gql`
  query Tests {
    tests {
      text
      id
    }
  }
`
