import { gql } from "@apollo/client";

export const GET_PAGINATED_RESPONSES = gql`
  query ResponsesByCampaignUrlIdByPage(
    $pageSize: Int!
    $page: Int!
    $campaignUrlId: Int!
  ) {
    responsesByCampaignUrlIdByPage(
      pageSize: $pageSize
      page: $page
      campaignUrlId: $campaignUrlId
    ) {
      id
      responseTime
      statusCode
      statusText
      createdAt
    }
  }
`;
