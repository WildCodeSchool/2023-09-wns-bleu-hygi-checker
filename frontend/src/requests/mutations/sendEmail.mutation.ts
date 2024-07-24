import { gql } from "@apollo/client";

export const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($content: String!, $subject: String!, $to: String!) {
    sendEmail(content: $content, subject: $subject, to: $to) {
      success
      message
    }
  }
`;
