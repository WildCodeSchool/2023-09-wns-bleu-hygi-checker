import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: Date; output: string };
};

export type Campaign = {
  __typename?: "Campaign";
  id: Scalars["Float"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  intervalTest?: Maybe<Scalars["Float"]["output"]>;
  isMailAlert?: Maybe<Scalars["Boolean"]["output"]>;
  isWorking?: Maybe<Scalars["Boolean"]["output"]>;
  name: Scalars["String"]["output"];
  urls: Array<Url>;
  userId: Scalars["String"]["output"];
};

export type CheckUrl = {
  __typename?: "CheckUrl";
  responseDate: Scalars["String"]["output"];
  responseTime: Scalars["Float"]["output"];
  status: Scalars["Float"]["output"];
  statusText: Scalars["String"]["output"];
};

/** The gender of the user */
export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
  Unspecified = "unspecified",
}

export type InputCreateCampaign = {
  intervalTest?: InputMaybe<Scalars["Float"]["input"]>;
  isMailAlert?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorking?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
};

export type InputCreateResponse = {
  creationDate: Scalars["DateTimeISO"]["input"];
  responseTime: Scalars["Float"]["input"];
  statusCode: Scalars["String"]["input"];
  urlId: Scalars["Float"]["input"];
};

export type InputCreateUrl = {
  campaignIds: Array<Scalars["Float"]["input"]>;
  type: Scalars["String"]["input"];
  urlPath: Scalars["String"]["input"];
};

export type InputLogin = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type InputRegister = {
  accepted_terms: Scalars["Boolean"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Message = {
  __typename?: "Message";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTest: Test;
  addUrlToCampaign: Url;
  changeAvatar: NewUserAvatar;
  changePassword: Message;
  createCampaign: Campaign;
  createResponse: Response;
  createUrl: Url;
  deleteAccount: Message;
  deleteCampaign: Campaign;
  deleteTest: Test;
  deleteUrl: Url;
  register: UserWithoutPassword;
  removeUrlFromCampaign: Url;
  updateName: UserProfile;
  updateProfile: UserProfile;
  upgradeRole: Array<User>;
};

export type MutationAddTestArgs = {
  text: Scalars["String"]["input"];
};

export type MutationAddUrlToCampaignArgs = {
  campaignId: Scalars["Int"]["input"];
  urlId: Scalars["Int"]["input"];
};

export type MutationChangeAvatarArgs = {
  newAvatar: Scalars["String"]["input"];
};

export type MutationChangePasswordArgs = {
  passwordData: InputUpdatePassword;
};

export type MutationCreateCampaignArgs = {
  input: InputCreateCampaign;
};

export type MutationCreateResponseArgs = {
  input: InputCreateResponse;
};

export type MutationCreateUrlArgs = {
  input: InputCreateUrl;
};

export type MutationDeleteCampaignArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteTestArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteUrlArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRegisterArgs = {
  infos: InputRegister;
};

export type MutationRemoveUrlFromCampaignArgs = {
  campaignId: Scalars["Int"]["input"];
  urlId: Scalars["Int"]["input"];
};

export type MutationUpdateNameArgs = {
  updateName: InputUpdateName;
};

export type MutationUpdateProfileArgs = {
  updateData: InputUpdateProfile;
};

export type MutationUpgradeRoleArgs = {
  id: Scalars["String"]["input"];
};

export type NewUserAvatar = {
  __typename?: "NewUserAvatar";
  avatar: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  activeCampaigns: Array<Campaign>;
  campaign?: Maybe<Campaign>;
  campaigns: Array<Campaign>;
  campaignsByUserId: Array<Campaign>;
  checkUrl: CheckUrl;
  getAvatar: User;
  getUserProfile: UserProfile;
  login: Message;
  logout: Message;
  response?: Maybe<Response>;
  responses: Array<Response>;
  responsesByUrlId: Array<Response>;
  tests: Array<Test>;
  url?: Maybe<Url>;
  urls: Array<Url>;
  users: Array<User>;
};

export type QueryCampaignArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryCampaignsByUserIdArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryCheckUrlArgs = {
  urlPath: Scalars["String"]["input"];
};

export type QueryLoginArgs = {
  infos: InputLogin;
};

export type QueryResponseArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryResponsesByUrlIdArgs = {
  urlId: Scalars["Int"]["input"];
};

export type QueryUrlArgs = {
  id: Scalars["Int"]["input"];
};

export type Response = {
  __typename?: "Response";
  creationDate: Scalars["DateTimeISO"]["output"];
  responseTime: Scalars["Float"]["output"];
  statusCode: Scalars["String"]["output"];
  urlId: Scalars["Float"]["output"];
  uuid: Scalars["Float"]["output"];
};

export type Test = {
  __typename?: "Test";
  id: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type Url = {
  __typename?: "Url";
  campaigns?: Maybe<Array<Campaign>>;
  id: Scalars["Float"]["output"];
  type: Scalars["String"]["output"];
  urlPath: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  accepted_terms: Scalars["Boolean"]["output"];
  avatar: Scalars["String"]["output"];
  birth_date?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  gender: Gender;
  id: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type UserProfile = {
  __typename?: "UserProfile";
  avatar: Scalars["String"]["output"];
  birth_date?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  gender?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

export type UserWithoutPassword = {
  __typename?: "UserWithoutPassword";
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
};

export type InputUpdateName = {
  username: Scalars["String"]["input"];
};

export type InputUpdatePassword = {
  confirmPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
  previousPassword: Scalars["String"]["input"];
};

export type InputUpdateProfile = {
  birth_date: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
};

export type RegisterMutationVariables = Exact<{
  infos: InputRegister;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "UserWithoutPassword"; id: string; email: string };
};

export type ChangeAvatarMutationVariables = Exact<{
  newAvatar: Scalars["String"]["input"];
}>;

export type ChangeAvatarMutation = {
  __typename?: "Mutation";
  changeAvatar: { __typename?: "NewUserAvatar"; avatar: string };
};

export type ChangePasswordMutationVariables = Exact<{
  passwordData: InputUpdatePassword;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: { __typename?: "Message"; success: boolean; message: string };
};

export type CreateCampaignMutationVariables = Exact<{
  input: InputCreateCampaign;
}>;

export type CreateCampaignMutation = {
  __typename?: "Mutation";
  createCampaign: {
    __typename?: "Campaign";
    id: number;
    name: string;
    image?: string | null;
    intervalTest?: number | null;
    isMailAlert?: boolean | null;
    isWorking?: boolean | null;
  };
};

export type AddTestMutationVariables = Exact<{
  text: Scalars["String"]["input"];
}>;

export type AddTestMutation = {
  __typename?: "Mutation";
  addTest: { __typename?: "Test"; id: string; text: string };
};

export type UpdateNameMutationVariables = Exact<{
  updateName: InputUpdateName;
}>;

export type UpdateNameMutation = {
  __typename?: "Mutation";
  updateName: { __typename?: "UserProfile"; username: string };
};

export type UpdateProfileMutationVariables = Exact<{
  updateData: InputUpdateProfile;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "UserProfile";
    gender?: string | null;
    birth_date?: string | null;
    country?: string | null;
  };
};

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;

export type LoginQuery = {
  __typename?: "Query";
  login: { __typename?: "Message"; success: boolean; message: string };
};

export type LogoutQueryVariables = Exact<{ [key: string]: never }>;

export type LogoutQuery = {
  __typename?: "Query";
  logout: { __typename?: "Message"; success: boolean; message: string };
};

export type CheckUrlQueryVariables = Exact<{
  urlPath: Scalars["String"]["input"];
}>;

export type CheckUrlQuery = {
  __typename?: "Query";
  checkUrl: {
    __typename?: "CheckUrl";
    status: number;
    statusText: string;
    responseTime: number;
    responseDate: string;
  };
};

export type GetAvatarQueryVariables = Exact<{ [key: string]: never }>;

export type GetAvatarQuery = {
  __typename?: "Query";
  getAvatar: { __typename?: "User"; avatar: string };
};

export type CampaignsQueryVariables = Exact<{ [key: string]: never }>;

export type CampaignsQuery = {
  __typename?: "Query";
  campaigns: Array<{
    __typename?: "Campaign";
    id: number;
    name: string;
    image?: string | null;
    intervalTest?: number | null;
    isMailAlert?: boolean | null;
    isWorking?: boolean | null;
    userId: string;
    urls: Array<{
      __typename?: "Url";
      id: number;
      urlPath: string;
      type: string;
    }>;
  }>;
};

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserProfileQuery = {
  __typename?: "Query";
  getUserProfile: {
    __typename?: "UserProfile";
    username: string;
    email: string;
    gender?: string | null;
    birth_date?: string | null;
    country?: string | null;
    avatar: string;
  };
};

export type TestsQueryVariables = Exact<{ [key: string]: never }>;

export type TestsQuery = {
  __typename?: "Query";
  tests: Array<{ __typename?: "Test"; text: string; id: string }>;
};

export const RegisterDocument = gql`
  mutation Register($infos: InputRegister!) {
    register(infos: $infos) {
      id
      email
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ChangeAvatarDocument = gql`
  mutation ChangeAvatar($newAvatar: String!) {
    changeAvatar(newAvatar: $newAvatar) {
      avatar
    }
  }
`;
export type ChangeAvatarMutationFn = Apollo.MutationFunction<
  ChangeAvatarMutation,
  ChangeAvatarMutationVariables
>;

/**
 * __useChangeAvatarMutation__
 *
 * To run a mutation, you first call `useChangeAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAvatarMutation, { data, loading, error }] = useChangeAvatarMutation({
 *   variables: {
 *      newAvatar: // value for 'newAvatar'
 *   },
 * });
 */
export function useChangeAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeAvatarMutation,
    ChangeAvatarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeAvatarMutation,
    ChangeAvatarMutationVariables
  >(ChangeAvatarDocument, options);
}
export type ChangeAvatarMutationHookResult = ReturnType<
  typeof useChangeAvatarMutation
>;
export type ChangeAvatarMutationResult =
  Apollo.MutationResult<ChangeAvatarMutation>;
export type ChangeAvatarMutationOptions = Apollo.BaseMutationOptions<
  ChangeAvatarMutation,
  ChangeAvatarMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($passwordData: inputUpdatePassword!) {
    changePassword(passwordData: $passwordData) {
      success
      message
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      passwordData: // value for 'passwordData'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateCampaignDocument = gql`
  mutation CreateCampaign($input: InputCreateCampaign!) {
    createCampaign(input: $input) {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
    }
  }
`;
export type CreateCampaignMutationFn = Apollo.MutationFunction<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;

/**
 * __useCreateCampaignMutation__
 *
 * To run a mutation, you first call `useCreateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaignMutation, { data, loading, error }] = useCreateCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCampaignMutation,
    CreateCampaignMutationVariables
  >(CreateCampaignDocument, options);
}
export type CreateCampaignMutationHookResult = ReturnType<
  typeof useCreateCampaignMutation
>;
export type CreateCampaignMutationResult =
  Apollo.MutationResult<CreateCampaignMutation>;
export type CreateCampaignMutationOptions = Apollo.BaseMutationOptions<
  CreateCampaignMutation,
  CreateCampaignMutationVariables
>;
export const AddTestDocument = gql`
  mutation AddTest($text: String!) {
    addTest(text: $text) {
      id
      text
    }
  }
`;
export type AddTestMutationFn = Apollo.MutationFunction<
  AddTestMutation,
  AddTestMutationVariables
>;

/**
 * __useAddTestMutation__
 *
 * To run a mutation, you first call `useAddTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTestMutation, { data, loading, error }] = useAddTestMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTestMutation,
    AddTestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(
    AddTestDocument,
    options
  );
}
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<
  AddTestMutation,
  AddTestMutationVariables
>;
export const UpdateNameDocument = gql`
  mutation UpdateName($updateName: inputUpdateName!) {
    updateName(updateName: $updateName) {
      username
    }
  }
`;
export type UpdateNameMutationFn = Apollo.MutationFunction<
  UpdateNameMutation,
  UpdateNameMutationVariables
>;

/**
 * __useUpdateNameMutation__
 *
 * To run a mutation, you first call `useUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameMutation, { data, loading, error }] = useUpdateNameMutation({
 *   variables: {
 *      updateName: // value for 'updateName'
 *   },
 * });
 */
export function useUpdateNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNameMutation,
    UpdateNameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateNameMutation, UpdateNameMutationVariables>(
    UpdateNameDocument,
    options
  );
}
export type UpdateNameMutationHookResult = ReturnType<
  typeof useUpdateNameMutation
>;
export type UpdateNameMutationResult =
  Apollo.MutationResult<UpdateNameMutation>;
export type UpdateNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateNameMutation,
  UpdateNameMutationVariables
>;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($updateData: inputUpdateProfile!) {
    updateProfile(updateData: $updateData) {
      gender
      birth_date
      country
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateData: // value for 'updateData'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const LoginDocument = gql`
  query Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
    }
  }
`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(
  baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<
  typeof useLoginSuspenseQuery
>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;
export const LogoutDocument = gql`
  query Logout {
    logout {
      success
      message
    }
  }
`;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(
  baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(
    LogoutDocument,
    options
  );
}
export function useLogoutLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(
    LogoutDocument,
    options
  );
}
export function useLogoutSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LogoutQuery,
    LogoutQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<
  typeof useLogoutSuspenseQuery
>;
export type LogoutQueryResult = Apollo.QueryResult<
  LogoutQuery,
  LogoutQueryVariables
>;
export const CheckUrlDocument = gql`
  query CheckUrl($urlPath: String!) {
    checkUrl(urlPath: $urlPath) {
      status
      statusText
      responseTime
      responseDate
    }
  }
`;

/**
 * __useCheckUrlQuery__
 *
 * To run a query within a React component, call `useCheckUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUrlQuery({
 *   variables: {
 *      urlPath: // value for 'urlPath'
 *   },
 * });
 */
export function useCheckUrlQuery(
  baseOptions: Apollo.QueryHookOptions<CheckUrlQuery, CheckUrlQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckUrlQuery, CheckUrlQueryVariables>(
    CheckUrlDocument,
    options
  );
}
export function useCheckUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckUrlQuery,
    CheckUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckUrlQuery, CheckUrlQueryVariables>(
    CheckUrlDocument,
    options
  );
}
export function useCheckUrlSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckUrlQuery,
    CheckUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CheckUrlQuery, CheckUrlQueryVariables>(
    CheckUrlDocument,
    options
  );
}
export type CheckUrlQueryHookResult = ReturnType<typeof useCheckUrlQuery>;
export type CheckUrlLazyQueryHookResult = ReturnType<
  typeof useCheckUrlLazyQuery
>;
export type CheckUrlSuspenseQueryHookResult = ReturnType<
  typeof useCheckUrlSuspenseQuery
>;
export type CheckUrlQueryResult = Apollo.QueryResult<
  CheckUrlQuery,
  CheckUrlQueryVariables
>;
export const GetAvatarDocument = gql`
  query GetAvatar {
    getAvatar {
      avatar
    }
  }
`;

/**
 * __useGetAvatarQuery__
 *
 * To run a query within a React component, call `useGetAvatarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvatarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvatarQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvatarQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAvatarQuery, GetAvatarQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAvatarQuery, GetAvatarQueryVariables>(
    GetAvatarDocument,
    options
  );
}
export function useGetAvatarLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAvatarQuery,
    GetAvatarQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAvatarQuery, GetAvatarQueryVariables>(
    GetAvatarDocument,
    options
  );
}
export function useGetAvatarSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAvatarQuery,
    GetAvatarQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAvatarQuery, GetAvatarQueryVariables>(
    GetAvatarDocument,
    options
  );
}
export type GetAvatarQueryHookResult = ReturnType<typeof useGetAvatarQuery>;
export type GetAvatarLazyQueryHookResult = ReturnType<
  typeof useGetAvatarLazyQuery
>;
export type GetAvatarSuspenseQueryHookResult = ReturnType<
  typeof useGetAvatarSuspenseQuery
>;
export type GetAvatarQueryResult = Apollo.QueryResult<
  GetAvatarQuery,
  GetAvatarQueryVariables
>;
export const CampaignsDocument = gql`
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

/**
 * __useCampaignsQuery__
 *
 * To run a query within a React component, call `useCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCampaignsQuery(
  baseOptions?: Apollo.QueryHookOptions<CampaignsQuery, CampaignsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CampaignsQuery, CampaignsQueryVariables>(
    CampaignsDocument,
    options
  );
}
export function useCampaignsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaignsQuery,
    CampaignsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CampaignsQuery, CampaignsQueryVariables>(
    CampaignsDocument,
    options
  );
}
export function useCampaignsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CampaignsQuery,
    CampaignsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CampaignsQuery, CampaignsQueryVariables>(
    CampaignsDocument,
    options
  );
}
export type CampaignsQueryHookResult = ReturnType<typeof useCampaignsQuery>;
export type CampaignsLazyQueryHookResult = ReturnType<
  typeof useCampaignsLazyQuery
>;
export type CampaignsSuspenseQueryHookResult = ReturnType<
  typeof useCampaignsSuspenseQuery
>;
export type CampaignsQueryResult = Apollo.QueryResult<
  CampaignsQuery,
  CampaignsQueryVariables
>;
export const GetUserProfileDocument = gql`
  query GetUserProfile {
    getUserProfile {
      username
      email
      gender
      birth_date
      country
      avatar
    }
  }
`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
    options
  );
}
export function useGetUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
    options
  );
}
export function useGetUserProfileSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >(GetUserProfileDocument, options);
}
export type GetUserProfileQueryHookResult = ReturnType<
  typeof useGetUserProfileQuery
>;
export type GetUserProfileLazyQueryHookResult = ReturnType<
  typeof useGetUserProfileLazyQuery
>;
export type GetUserProfileSuspenseQueryHookResult = ReturnType<
  typeof useGetUserProfileSuspenseQuery
>;
export type GetUserProfileQueryResult = Apollo.QueryResult<
  GetUserProfileQuery,
  GetUserProfileQueryVariables
>;
export const TestsDocument = gql`
  query Tests {
    tests {
      text
      id
    }
  }
`;

/**
 * __useTestsQuery__
 *
 * To run a query within a React component, call `useTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestsQuery(
  baseOptions?: Apollo.QueryHookOptions<TestsQuery, TestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TestsQuery, TestsQueryVariables>(
    TestsDocument,
    options
  );
}
export function useTestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TestsQuery, TestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TestsQuery, TestsQueryVariables>(
    TestsDocument,
    options
  );
}
export function useTestsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<TestsQuery, TestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TestsQuery, TestsQueryVariables>(
    TestsDocument,
    options
  );
}
export type TestsQueryHookResult = ReturnType<typeof useTestsQuery>;
export type TestsLazyQueryHookResult = ReturnType<typeof useTestsLazyQuery>;
export type TestsSuspenseQueryHookResult = ReturnType<
  typeof useTestsSuspenseQuery
>;
export type TestsQueryResult = Apollo.QueryResult<
  TestsQuery,
  TestsQueryVariables
>;
