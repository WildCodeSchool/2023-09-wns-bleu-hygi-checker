import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
  query Campaigns {
    campaigns {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
      urls {
        id
        urlPath
        type
      }
    }
  }
`;
