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
  createdAt: Date;
  id: Scalars["Float"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  intervalTest?: Maybe<Scalars["Float"]["output"]>;
  isMailAlert?: Maybe<Scalars["Boolean"]["output"]>;
  isWorking?: Maybe<Scalars["Boolean"]["output"]>;
  name: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type CampaignUrl = {
  __typename?: "CampaignUrl";
  campaign: Campaign;
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["Float"]["output"];
  url: Url;
};

export type CheckUrl = {
  __typename?: "CheckUrl";
  responseDate: Scalars["String"]["output"];
  responseTime: Scalars["Float"]["output"];
  status: Scalars["Float"]["output"];
  statusText: Scalars["String"]["output"];
};

export type CountResponses = {
  __typename?: "CountResponses";
  count: Scalars["Float"]["output"];
};

export type CountResult = {
  __typename?: "CountResult";
  count: Scalars["Float"]["output"];
};

/** The gender of the user */
export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
  Unspecified = "unspecified",
}

export type InputAddUrlToCampaign = {
  campaignId: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type InputCreateCampaign = {
  intervalTest?: InputMaybe<Scalars["Float"]["input"]>;
  isMailAlert?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorking?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
};

export type InputCreateResponse = {
  campaignId: Scalars["Float"]["input"];
  campaignUrlId: Scalars["Float"]["input"];
  createdAt: Scalars["DateTimeISO"]["input"];
  responseTime: Scalars["Float"]["input"];
  statusCode: Scalars["Float"]["input"];
  statusText: Scalars["String"]["input"];
};

export type InputDeleteUrlToCampaign = {
  id: Scalars["Float"]["input"];
};

export type InputEditCampaign = {
  id: Scalars["Float"]["input"];
  intervalTest?: InputMaybe<Scalars["Float"]["input"]>;
  isMailAlert?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorking?: InputMaybe<Scalars["Boolean"]["input"]>;
  name: Scalars["String"]["input"];
};

export type InputEditCampaignImage = {
  id: Scalars["Float"]["input"];
  image: Scalars["String"]["input"];
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

export type InputSwitchWorkingCampaign = {
  campaignId: Scalars["Float"]["input"];
  isWorking: Scalars["Boolean"]["input"];
};

export type Message = {
  __typename?: "Message";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTest: Test;
  addUrlToCampaign: Message;
  changeAvatar: NewUserAvatar;
  changePassword: Message;
  createCampaign: Campaign;
  createResponse: Response;
  deleteAccount: Message;
  deleteCampaign: Message;
  deleteTest: Test;
  deleteUrlFromCampaign: Message;
  modifyCampaign: Message;
  modifyImageOfCampaign: Message;
  register: UserWithoutPassword;
  switchWorkingCampaign: Message;
  updateName: UserProfile;
  updateProfile: UserProfile;
  upgradeRole: Array<User>;
};

export type MutationAddTestArgs = {
  text: Scalars["String"]["input"];
};

export type MutationAddUrlToCampaignArgs = {
  infos: InputAddUrlToCampaign;
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

export type MutationDeleteCampaignArgs = {
  campaignId: Scalars["Float"]["input"];
};

export type MutationDeleteTestArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteUrlFromCampaignArgs = {
  infos: InputDeleteUrlToCampaign;
};

export type MutationModifyCampaignArgs = {
  input: InputEditCampaign;
};

export type MutationModifyImageOfCampaignArgs = {
  input: InputEditCampaignImage;
};

export type MutationRegisterArgs = {
  infos: InputRegister;
};

export type MutationSwitchWorkingCampaignArgs = {
  input: InputSwitchWorkingCampaign;
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
  campaignById?: Maybe<Campaign>;
  campaigns: Array<Campaign>;
  campaignsByUserId: Array<Campaign>;
  checkUrl: CheckUrl;
  countResponsesByCampaignUrlId: CountResponses;
  countUrlFromCampaign: CountResult;
  getAvatar: User;
  getUrlFromCampaign: Array<CampaignUrl>;
  getUserProfile: UserProfile;
  lastDayResponsesOfOneUrl: Array<Response>;
  latestResponsesByCampaignUrlId: Array<Response>;
  login: Message;
  logout: Message;
  response?: Maybe<Response>;
  responses: Array<Response>;
  responsesByCampaignUrlId: Array<Response>;
  responsesByCampaignUrlIdByPage: Array<Response>;
  tests: Array<Test>;
  url?: Maybe<Url>;
  urls: Array<Url>;
  users: Array<User>;
};

export type QueryCampaignByIdArgs = {
  campaignId: Scalars["Int"]["input"];
};

export type QueryCheckUrlArgs = {
  urlPath: Scalars["String"]["input"];
};

export type QueryCountResponsesByCampaignUrlIdArgs = {
  campaignUrlId: Scalars["Int"]["input"];
};

export type QueryCountUrlFromCampaignArgs = {
  campaignId: Scalars["Float"]["input"];
};

export type QueryGetUrlFromCampaignArgs = {
  campaignId: Scalars["Float"]["input"];
};

export type QueryLastDayResponsesOfOneUrlArgs = {
  campaignUrlId: Scalars["Int"]["input"];
};

export type QueryLatestResponsesByCampaignUrlIdArgs = {
  campaignId: Scalars["Int"]["input"];
};

export type QueryLoginArgs = {
  infos: InputLogin;
};

export type QueryResponseArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryResponsesByCampaignUrlIdArgs = {
  campaignId: Scalars["Int"]["input"];
};

export type QueryResponsesByCampaignUrlIdByPageArgs = {
  campaignUrlId: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
};

export type QueryUrlArgs = {
  id: Scalars["Int"]["input"];
};

export type Response = {
  __typename?: "Response";
  campaignUrl: CampaignUrl;
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["Float"]["output"];
  responseTime?: Maybe<Scalars["Float"]["output"]>;
  statusCode?: Maybe<Scalars["Float"]["output"]>;
  statusText?: Maybe<Scalars["String"]["output"]>;
};

export type Test = {
  __typename?: "Test";
  id: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type Url = {
  __typename?: "Url";
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
  username: Scalars["String"]["output"];
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

export type AddUrlToCampaignMutationVariables = Exact<{
  infos: InputAddUrlToCampaign;
}>;

export type AddUrlToCampaignMutation = {
  __typename?: "Mutation";
  addUrlToCampaign: {
    __typename?: "Message";
    success: boolean;
    message: string;
  };
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

export type ModifyImageOfCampaignMutationVariables = Exact<{
  input: InputEditCampaignImage;
}>;

export type ModifyImageOfCampaignMutation = {
  __typename?: "Mutation";
  modifyImageOfCampaign: {
    __typename?: "Message";
    success: boolean;
    message: string;
  };
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

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteAccountMutation = {
  __typename?: "Mutation";
  deleteAccount: { __typename?: "Message"; message: string; success: boolean };
};

export type DeleteCampaignMutationVariables = Exact<{
  campaignId: Scalars["Float"]["input"];
}>;

export type DeleteCampaignMutation = {
  __typename?: "Mutation";
  deleteCampaign: { __typename?: "Message"; message: string; success: boolean };
};

export type DeleteUrlFromCampaignMutationVariables = Exact<{
  infos: InputDeleteUrlToCampaign;
}>;

export type DeleteUrlFromCampaignMutation = {
  __typename?: "Mutation";
  deleteUrlFromCampaign: {
    __typename?: "Message";
    success: boolean;
    message: string;
  };
};

export type ModifyCampaignMutationVariables = Exact<{
  input: InputEditCampaign;
}>;

export type ModifyCampaignMutation = {
  __typename?: "Mutation";
  modifyCampaign: { __typename?: "Message"; success: boolean; message: string };
};

export type SwitchWorkingCampaignMutationVariables = Exact<{
  input: InputSwitchWorkingCampaign;
}>;

export type SwitchWorkingCampaignMutation = {
  __typename?: "Mutation";
  switchWorkingCampaign: {
    __typename?: "Message";
    message: string;
    success: boolean;
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

export type CountResponsesByCampaignUrlIdQueryVariables = Exact<{
  campaignUrlId: Scalars["Int"]["input"];
}>;

export type CountResponsesByCampaignUrlIdQuery = {
  __typename?: "Query";
  countResponsesByCampaignUrlId: {
    __typename?: "CountResponses";
    count: number;
  };
};

export type CountUrlFromCampaignQueryVariables = Exact<{
  campaignId: Scalars["Float"]["input"];
}>;

export type CountUrlFromCampaignQuery = {
  __typename?: "Query";
  countUrlFromCampaign: { __typename?: "CountResult"; count: number };
};

export type GetAvatarQueryVariables = Exact<{ [key: string]: never }>;

export type GetAvatarQuery = {
  __typename?: "Query";
  getAvatar: { __typename?: "User"; avatar: string };
};

export type CampaignByIdQueryVariables = Exact<{
  campaignId: Scalars["Int"]["input"];
}>;

export type CampaignByIdQuery = {
  __typename?: "Query";
  campaignById?: {
    __typename?: "Campaign";
    id: number;
    name: string;
    image?: string | null;
    intervalTest?: number | null;
    isMailAlert?: boolean | null;
    isWorking?: boolean | null;
    userId: string;
    createdAt: Date;
  } | null;
};

export type CampaignsByUserIdQueryVariables = Exact<{ [key: string]: never }>;

export type CampaignsByUserIdQuery = {
  __typename?: "Query";
  campaignsByUserId: Array<{
    __typename?: "Campaign";
    id: number;
    name: string;
    image?: string | null;
    intervalTest?: number | null;
    isMailAlert?: boolean | null;
    isWorking?: boolean | null;
    userId: string;
    createdAt: Date;
  }>;
};

export type LastDayResponsesOfOneUrlQueryVariables = Exact<{
  campaignUrlId: Scalars["Int"]["input"];
}>;

export type LastDayResponsesOfOneUrlQuery = {
  __typename?: "Query";
  lastDayResponsesOfOneUrl: Array<{
    __typename?: "Response";
    id: number;
    responseTime?: number | null;
    statusCode?: number | null;
    createdAt: Date;
    campaignUrl: { __typename?: "CampaignUrl"; id: number };
  }>;
};

export type ResponsesByCampaignUrlIdByPageQueryVariables = Exact<{
  pageSize: Scalars["Int"]["input"];
  page: Scalars["Int"]["input"];
  campaignUrlId: Scalars["Int"]["input"];
}>;

export type ResponsesByCampaignUrlIdByPageQuery = {
  __typename?: "Query";
  responsesByCampaignUrlIdByPage: Array<{
    __typename?: "Response";
    id: number;
    responseTime?: number | null;
    statusCode?: number | null;
    statusText?: string | null;
    createdAt: Date;
  }>;
};

export type GetUrlFromCampaignQueryVariables = Exact<{
  campaignId: Scalars["Float"]["input"];
}>;

export type GetUrlFromCampaignQuery = {
  __typename?: "Query";
  getUrlFromCampaign: Array<{
    __typename?: "CampaignUrl";
    id: number;
    createdAt: Date;
    campaign: { __typename?: "Campaign"; id: number };
    url: { __typename?: "Url"; id: number; urlPath: string; type: string };
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

export type ResponsesByCampaignUrlIdQueryVariables = Exact<{
  campaignId: Scalars["Int"]["input"];
}>;

export type ResponsesByCampaignUrlIdQuery = {
  __typename?: "Query";
  responsesByCampaignUrlId: Array<{
    __typename?: "Response";
    statusCode?: number | null;
  }>;
};

export type TestsQueryVariables = Exact<{ [key: string]: never }>;

export type TestsQuery = {
  __typename?: "Query";
  tests: Array<{ __typename?: "Test"; text: string; id: string }>;
};

export const AddUrlToCampaignDocument = gql`
  mutation AddUrlToCampaign($infos: InputAddUrlToCampaign!) {
    addUrlToCampaign(infos: $infos) {
      success
      message
    }
  }
`;
export type AddUrlToCampaignMutationFn = Apollo.MutationFunction<
  AddUrlToCampaignMutation,
  AddUrlToCampaignMutationVariables
>;

/**
 * __useAddUrlToCampaignMutation__
 *
 * To run a mutation, you first call `useAddUrlToCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUrlToCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUrlToCampaignMutation, { data, loading, error }] = useAddUrlToCampaignMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useAddUrlToCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUrlToCampaignMutation,
    AddUrlToCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddUrlToCampaignMutation,
    AddUrlToCampaignMutationVariables
  >(AddUrlToCampaignDocument, options);
}
export type AddUrlToCampaignMutationHookResult = ReturnType<
  typeof useAddUrlToCampaignMutation
>;
export type AddUrlToCampaignMutationResult =
  Apollo.MutationResult<AddUrlToCampaignMutation>;
export type AddUrlToCampaignMutationOptions = Apollo.BaseMutationOptions<
  AddUrlToCampaignMutation,
  AddUrlToCampaignMutationVariables
>;
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
export const ModifyImageOfCampaignDocument = gql`
  mutation ModifyImageOfCampaign($input: InputEditCampaignImage!) {
    modifyImageOfCampaign(input: $input) {
      success
      message
    }
  }
`;
export type ModifyImageOfCampaignMutationFn = Apollo.MutationFunction<
  ModifyImageOfCampaignMutation,
  ModifyImageOfCampaignMutationVariables
>;

/**
 * __useModifyImageOfCampaignMutation__
 *
 * To run a mutation, you first call `useModifyImageOfCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyImageOfCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyImageOfCampaignMutation, { data, loading, error }] = useModifyImageOfCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModifyImageOfCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ModifyImageOfCampaignMutation,
    ModifyImageOfCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ModifyImageOfCampaignMutation,
    ModifyImageOfCampaignMutationVariables
  >(ModifyImageOfCampaignDocument, options);
}
export type ModifyImageOfCampaignMutationHookResult = ReturnType<
  typeof useModifyImageOfCampaignMutation
>;
export type ModifyImageOfCampaignMutationResult =
  Apollo.MutationResult<ModifyImageOfCampaignMutation>;
export type ModifyImageOfCampaignMutationOptions = Apollo.BaseMutationOptions<
  ModifyImageOfCampaignMutation,
  ModifyImageOfCampaignMutationVariables
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
export const DeleteAccountDocument = gql`
  mutation DeleteAccount {
    deleteAccount {
      message
      success
    }
  }
`;
export type DeleteAccountMutationFn = Apollo.MutationFunction<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
  >(DeleteAccountDocument, options);
}
export type DeleteAccountMutationHookResult = ReturnType<
  typeof useDeleteAccountMutation
>;
export type DeleteAccountMutationResult =
  Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>;
export const DeleteCampaignDocument = gql`
  mutation DeleteCampaign($campaignId: Float!) {
    deleteCampaign(campaignId: $campaignId) {
      message
      success
    }
  }
`;
export type DeleteCampaignMutationFn = Apollo.MutationFunction<
  DeleteCampaignMutation,
  DeleteCampaignMutationVariables
>;

/**
 * __useDeleteCampaignMutation__
 *
 * To run a mutation, you first call `useDeleteCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCampaignMutation, { data, loading, error }] = useDeleteCampaignMutation({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useDeleteCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCampaignMutation,
    DeleteCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCampaignMutation,
    DeleteCampaignMutationVariables
  >(DeleteCampaignDocument, options);
}
export type DeleteCampaignMutationHookResult = ReturnType<
  typeof useDeleteCampaignMutation
>;
export type DeleteCampaignMutationResult =
  Apollo.MutationResult<DeleteCampaignMutation>;
export type DeleteCampaignMutationOptions = Apollo.BaseMutationOptions<
  DeleteCampaignMutation,
  DeleteCampaignMutationVariables
>;
export const DeleteUrlFromCampaignDocument = gql`
  mutation DeleteUrlFromCampaign($infos: InputDeleteUrlToCampaign!) {
    deleteUrlFromCampaign(infos: $infos) {
      success
      message
    }
  }
`;
export type DeleteUrlFromCampaignMutationFn = Apollo.MutationFunction<
  DeleteUrlFromCampaignMutation,
  DeleteUrlFromCampaignMutationVariables
>;

/**
 * __useDeleteUrlFromCampaignMutation__
 *
 * To run a mutation, you first call `useDeleteUrlFromCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUrlFromCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUrlFromCampaignMutation, { data, loading, error }] = useDeleteUrlFromCampaignMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useDeleteUrlFromCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUrlFromCampaignMutation,
    DeleteUrlFromCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUrlFromCampaignMutation,
    DeleteUrlFromCampaignMutationVariables
  >(DeleteUrlFromCampaignDocument, options);
}
export type DeleteUrlFromCampaignMutationHookResult = ReturnType<
  typeof useDeleteUrlFromCampaignMutation
>;
export type DeleteUrlFromCampaignMutationResult =
  Apollo.MutationResult<DeleteUrlFromCampaignMutation>;
export type DeleteUrlFromCampaignMutationOptions = Apollo.BaseMutationOptions<
  DeleteUrlFromCampaignMutation,
  DeleteUrlFromCampaignMutationVariables
>;
export const ModifyCampaignDocument = gql`
  mutation ModifyCampaign($input: InputEditCampaign!) {
    modifyCampaign(input: $input) {
      success
      message
    }
  }
`;
export type ModifyCampaignMutationFn = Apollo.MutationFunction<
  ModifyCampaignMutation,
  ModifyCampaignMutationVariables
>;

/**
 * __useModifyCampaignMutation__
 *
 * To run a mutation, you first call `useModifyCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyCampaignMutation, { data, loading, error }] = useModifyCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModifyCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ModifyCampaignMutation,
    ModifyCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ModifyCampaignMutation,
    ModifyCampaignMutationVariables
  >(ModifyCampaignDocument, options);
}
export type ModifyCampaignMutationHookResult = ReturnType<
  typeof useModifyCampaignMutation
>;
export type ModifyCampaignMutationResult =
  Apollo.MutationResult<ModifyCampaignMutation>;
export type ModifyCampaignMutationOptions = Apollo.BaseMutationOptions<
  ModifyCampaignMutation,
  ModifyCampaignMutationVariables
>;
export const SwitchWorkingCampaignDocument = gql`
  mutation SwitchWorkingCampaign($input: InputSwitchWorkingCampaign!) {
    switchWorkingCampaign(input: $input) {
      message
      success
    }
  }
`;
export type SwitchWorkingCampaignMutationFn = Apollo.MutationFunction<
  SwitchWorkingCampaignMutation,
  SwitchWorkingCampaignMutationVariables
>;

/**
 * __useSwitchWorkingCampaignMutation__
 *
 * To run a mutation, you first call `useSwitchWorkingCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchWorkingCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchWorkingCampaignMutation, { data, loading, error }] = useSwitchWorkingCampaignMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSwitchWorkingCampaignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SwitchWorkingCampaignMutation,
    SwitchWorkingCampaignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SwitchWorkingCampaignMutation,
    SwitchWorkingCampaignMutationVariables
  >(SwitchWorkingCampaignDocument, options);
}
export type SwitchWorkingCampaignMutationHookResult = ReturnType<
  typeof useSwitchWorkingCampaignMutation
>;
export type SwitchWorkingCampaignMutationResult =
  Apollo.MutationResult<SwitchWorkingCampaignMutation>;
export type SwitchWorkingCampaignMutationOptions = Apollo.BaseMutationOptions<
  SwitchWorkingCampaignMutation,
  SwitchWorkingCampaignMutationVariables
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
export const CountResponsesByCampaignUrlIdDocument = gql`
  query CountResponsesByCampaignUrlId($campaignUrlId: Int!) {
    countResponsesByCampaignUrlId(campaignUrlId: $campaignUrlId) {
      count
    }
  }
`;

/**
 * __useCountResponsesByCampaignUrlIdQuery__
 *
 * To run a query within a React component, call `useCountResponsesByCampaignUrlIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountResponsesByCampaignUrlIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountResponsesByCampaignUrlIdQuery({
 *   variables: {
 *      campaignUrlId: // value for 'campaignUrlId'
 *   },
 * });
 */
export function useCountResponsesByCampaignUrlIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >(CountResponsesByCampaignUrlIdDocument, options);
}
export function useCountResponsesByCampaignUrlIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >(CountResponsesByCampaignUrlIdDocument, options);
}
export function useCountResponsesByCampaignUrlIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CountResponsesByCampaignUrlIdQuery,
    CountResponsesByCampaignUrlIdQueryVariables
  >(CountResponsesByCampaignUrlIdDocument, options);
}
export type CountResponsesByCampaignUrlIdQueryHookResult = ReturnType<
  typeof useCountResponsesByCampaignUrlIdQuery
>;
export type CountResponsesByCampaignUrlIdLazyQueryHookResult = ReturnType<
  typeof useCountResponsesByCampaignUrlIdLazyQuery
>;
export type CountResponsesByCampaignUrlIdSuspenseQueryHookResult = ReturnType<
  typeof useCountResponsesByCampaignUrlIdSuspenseQuery
>;
export type CountResponsesByCampaignUrlIdQueryResult = Apollo.QueryResult<
  CountResponsesByCampaignUrlIdQuery,
  CountResponsesByCampaignUrlIdQueryVariables
>;
export const CountUrlFromCampaignDocument = gql`
  query CountUrlFromCampaign($campaignId: Float!) {
    countUrlFromCampaign(campaignId: $campaignId) {
      count
    }
  }
`;

/**
 * __useCountUrlFromCampaignQuery__
 *
 * To run a query within a React component, call `useCountUrlFromCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountUrlFromCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountUrlFromCampaignQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCountUrlFromCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >(CountUrlFromCampaignDocument, options);
}
export function useCountUrlFromCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >(CountUrlFromCampaignDocument, options);
}
export function useCountUrlFromCampaignSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CountUrlFromCampaignQuery,
    CountUrlFromCampaignQueryVariables
  >(CountUrlFromCampaignDocument, options);
}
export type CountUrlFromCampaignQueryHookResult = ReturnType<
  typeof useCountUrlFromCampaignQuery
>;
export type CountUrlFromCampaignLazyQueryHookResult = ReturnType<
  typeof useCountUrlFromCampaignLazyQuery
>;
export type CountUrlFromCampaignSuspenseQueryHookResult = ReturnType<
  typeof useCountUrlFromCampaignSuspenseQuery
>;
export type CountUrlFromCampaignQueryResult = Apollo.QueryResult<
  CountUrlFromCampaignQuery,
  CountUrlFromCampaignQueryVariables
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
export const CampaignByIdDocument = gql`
  query CampaignById($campaignId: Int!) {
    campaignById(campaignId: $campaignId) {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
      createdAt
    }
  }
`;

/**
 * __useCampaignByIdQuery__
 *
 * To run a query within a React component, call `useCampaignByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignByIdQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCampaignByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    CampaignByIdQuery,
    CampaignByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CampaignByIdQuery, CampaignByIdQueryVariables>(
    CampaignByIdDocument,
    options
  );
}
export function useCampaignByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaignByIdQuery,
    CampaignByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CampaignByIdQuery, CampaignByIdQueryVariables>(
    CampaignByIdDocument,
    options
  );
}
export function useCampaignByIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CampaignByIdQuery,
    CampaignByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CampaignByIdQuery, CampaignByIdQueryVariables>(
    CampaignByIdDocument,
    options
  );
}
export type CampaignByIdQueryHookResult = ReturnType<
  typeof useCampaignByIdQuery
>;
export type CampaignByIdLazyQueryHookResult = ReturnType<
  typeof useCampaignByIdLazyQuery
>;
export type CampaignByIdSuspenseQueryHookResult = ReturnType<
  typeof useCampaignByIdSuspenseQuery
>;
export type CampaignByIdQueryResult = Apollo.QueryResult<
  CampaignByIdQuery,
  CampaignByIdQueryVariables
>;
export const CampaignsByUserIdDocument = gql`
  query CampaignsByUserId {
    campaignsByUserId {
      id
      name
      image
      intervalTest
      isMailAlert
      isWorking
      userId
      createdAt
    }
  }
`;

/**
 * __useCampaignsByUserIdQuery__
 *
 * To run a query within a React component, call `useCampaignsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCampaignsByUserIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >(CampaignsByUserIdDocument, options);
}
export function useCampaignsByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >(CampaignsByUserIdDocument, options);
}
export function useCampaignsByUserIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CampaignsByUserIdQuery,
    CampaignsByUserIdQueryVariables
  >(CampaignsByUserIdDocument, options);
}
export type CampaignsByUserIdQueryHookResult = ReturnType<
  typeof useCampaignsByUserIdQuery
>;
export type CampaignsByUserIdLazyQueryHookResult = ReturnType<
  typeof useCampaignsByUserIdLazyQuery
>;
export type CampaignsByUserIdSuspenseQueryHookResult = ReturnType<
  typeof useCampaignsByUserIdSuspenseQuery
>;
export type CampaignsByUserIdQueryResult = Apollo.QueryResult<
  CampaignsByUserIdQuery,
  CampaignsByUserIdQueryVariables
>;
export const LastDayResponsesOfOneUrlDocument = gql`
  query LastDayResponsesOfOneUrl($campaignUrlId: Int!) {
    lastDayResponsesOfOneUrl(campaignUrlId: $campaignUrlId) {
      id
      responseTime
      statusCode
      createdAt
      campaignUrl {
        id
      }
    }
  }
`;

/**
 * __useLastDayResponsesOfOneUrlQuery__
 *
 * To run a query within a React component, call `useLastDayResponsesOfOneUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastDayResponsesOfOneUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastDayResponsesOfOneUrlQuery({
 *   variables: {
 *      campaignUrlId: // value for 'campaignUrlId'
 *   },
 * });
 */
export function useLastDayResponsesOfOneUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >(LastDayResponsesOfOneUrlDocument, options);
}
export function useLastDayResponsesOfOneUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >(LastDayResponsesOfOneUrlDocument, options);
}
export function useLastDayResponsesOfOneUrlSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    LastDayResponsesOfOneUrlQuery,
    LastDayResponsesOfOneUrlQueryVariables
  >(LastDayResponsesOfOneUrlDocument, options);
}
export type LastDayResponsesOfOneUrlQueryHookResult = ReturnType<
  typeof useLastDayResponsesOfOneUrlQuery
>;
export type LastDayResponsesOfOneUrlLazyQueryHookResult = ReturnType<
  typeof useLastDayResponsesOfOneUrlLazyQuery
>;
export type LastDayResponsesOfOneUrlSuspenseQueryHookResult = ReturnType<
  typeof useLastDayResponsesOfOneUrlSuspenseQuery
>;
export type LastDayResponsesOfOneUrlQueryResult = Apollo.QueryResult<
  LastDayResponsesOfOneUrlQuery,
  LastDayResponsesOfOneUrlQueryVariables
>;
export const ResponsesByCampaignUrlIdByPageDocument = gql`
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

/**
 * __useResponsesByCampaignUrlIdByPageQuery__
 *
 * To run a query within a React component, call `useResponsesByCampaignUrlIdByPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useResponsesByCampaignUrlIdByPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResponsesByCampaignUrlIdByPageQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      campaignUrlId: // value for 'campaignUrlId'
 *   },
 * });
 */
export function useResponsesByCampaignUrlIdByPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >(ResponsesByCampaignUrlIdByPageDocument, options);
}
export function useResponsesByCampaignUrlIdByPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >(ResponsesByCampaignUrlIdByPageDocument, options);
}
export function useResponsesByCampaignUrlIdByPageSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ResponsesByCampaignUrlIdByPageQuery,
    ResponsesByCampaignUrlIdByPageQueryVariables
  >(ResponsesByCampaignUrlIdByPageDocument, options);
}
export type ResponsesByCampaignUrlIdByPageQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdByPageQuery
>;
export type ResponsesByCampaignUrlIdByPageLazyQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdByPageLazyQuery
>;
export type ResponsesByCampaignUrlIdByPageSuspenseQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdByPageSuspenseQuery
>;
export type ResponsesByCampaignUrlIdByPageQueryResult = Apollo.QueryResult<
  ResponsesByCampaignUrlIdByPageQuery,
  ResponsesByCampaignUrlIdByPageQueryVariables
>;
export const GetUrlFromCampaignDocument = gql`
  query GetUrlFromCampaign($campaignId: Float!) {
    getUrlFromCampaign(campaignId: $campaignId) {
      id
      createdAt
      campaign {
        id
      }
      url {
        id
        urlPath
        type
      }
    }
  }
`;

/**
 * __useGetUrlFromCampaignQuery__
 *
 * To run a query within a React component, call `useGetUrlFromCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUrlFromCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUrlFromCampaignQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useGetUrlFromCampaignQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >(GetUrlFromCampaignDocument, options);
}
export function useGetUrlFromCampaignLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >(GetUrlFromCampaignDocument, options);
}
export function useGetUrlFromCampaignSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUrlFromCampaignQuery,
    GetUrlFromCampaignQueryVariables
  >(GetUrlFromCampaignDocument, options);
}
export type GetUrlFromCampaignQueryHookResult = ReturnType<
  typeof useGetUrlFromCampaignQuery
>;
export type GetUrlFromCampaignLazyQueryHookResult = ReturnType<
  typeof useGetUrlFromCampaignLazyQuery
>;
export type GetUrlFromCampaignSuspenseQueryHookResult = ReturnType<
  typeof useGetUrlFromCampaignSuspenseQuery
>;
export type GetUrlFromCampaignQueryResult = Apollo.QueryResult<
  GetUrlFromCampaignQuery,
  GetUrlFromCampaignQueryVariables
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
export const ResponsesByCampaignUrlIdDocument = gql`
  query ResponsesByCampaignUrlId($campaignId: Int!) {
    responsesByCampaignUrlId(campaignId: $campaignId) {
      statusCode
    }
  }
`;

/**
 * __useResponsesByCampaignUrlIdQuery__
 *
 * To run a query within a React component, call `useResponsesByCampaignUrlIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useResponsesByCampaignUrlIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResponsesByCampaignUrlIdQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useResponsesByCampaignUrlIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >(ResponsesByCampaignUrlIdDocument, options);
}
export function useResponsesByCampaignUrlIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >(ResponsesByCampaignUrlIdDocument, options);
}
export function useResponsesByCampaignUrlIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ResponsesByCampaignUrlIdQuery,
    ResponsesByCampaignUrlIdQueryVariables
  >(ResponsesByCampaignUrlIdDocument, options);
}
export type ResponsesByCampaignUrlIdQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdQuery
>;
export type ResponsesByCampaignUrlIdLazyQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdLazyQuery
>;
export type ResponsesByCampaignUrlIdSuspenseQueryHookResult = ReturnType<
  typeof useResponsesByCampaignUrlIdSuspenseQuery
>;
export type ResponsesByCampaignUrlIdQueryResult = Apollo.QueryResult<
  ResponsesByCampaignUrlIdQuery,
  ResponsesByCampaignUrlIdQueryVariables
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
