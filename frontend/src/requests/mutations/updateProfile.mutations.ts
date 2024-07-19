import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($updateData: inputUpdateProfile!) {
    updateProfile(updateData: $updateData) {
      gender
      birth_date
      country
    }
  }
`;
