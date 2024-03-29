import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputRegister = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTest: Test;
  deleteTest: Test;
  register: UserWithoutPassword;
  upgradeRole: Array<User>;
};


export type MutationAddTestArgs = {
  text: Scalars['String']['input'];
};


export type MutationDeleteTestArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  infos: InputRegister;
};


export type MutationUpgradeRoleArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  login: Message;
  logout: Message;
  profile: User;
  tests: Array<Test>;
  users: Array<User>;
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type RegisterMutationVariables = Exact<{
  infos: InputRegister;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserWithoutPassword', id: string, email: string } };

export type AddTestMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type AddTestMutation = { __typename?: 'Mutation', addTest: { __typename?: 'Test', id: string, text: string } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', email: string } };

export type TestsQueryVariables = Exact<{ [key: string]: never; }>;


export type TestsQuery = { __typename?: 'Query', tests: Array<{ __typename?: 'Test', text: string, id: string }> };


export const RegisterDocument = gql`
    mutation Register($infos: InputRegister!) {
  register(infos: $infos) {
    id
    email
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AddTestDocument = gql`
    mutation AddTest($text: String!) {
  addTest(text: $text) {
    id
    text
  }
}
    `;
export type AddTestMutationFn = Apollo.MutationFunction<AddTestMutation, AddTestMutationVariables>;

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
export function useAddTestMutation(baseOptions?: Apollo.MutationHookOptions<AddTestMutation, AddTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(AddTestDocument, options);
      }
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<AddTestMutation, AddTestMutationVariables>;
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
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
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
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    email
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
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
export function useTestsQuery(baseOptions?: Apollo.QueryHookOptions<TestsQuery, TestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestsQuery, TestsQueryVariables>(TestsDocument, options);
      }
export function useTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestsQuery, TestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestsQuery, TestsQueryVariables>(TestsDocument, options);
        }
export function useTestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TestsQuery, TestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TestsQuery, TestsQueryVariables>(TestsDocument, options);
        }
export type TestsQueryHookResult = ReturnType<typeof useTestsQuery>;
export type TestsLazyQueryHookResult = ReturnType<typeof useTestsLazyQuery>;
export type TestsSuspenseQueryHookResult = ReturnType<typeof useTestsSuspenseQuery>;
export type TestsQueryResult = Apollo.QueryResult<TestsQuery, TestsQueryVariables>;