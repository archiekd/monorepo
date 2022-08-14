import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Move = {
  __typename?: 'Move';
  apparatus: Scalars['String'];
  copGroup: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isDoubleRotation: Scalars['Boolean'];
  letterValue: Scalars['String'];
  name: Scalars['String'];
  pointValue: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMove: Move;
};


export type MutationCreateMoveArgs = {
  newMoveInput: NewMoveInput;
};

export type NewMoveInput = {
  apparatus: Scalars['String'];
  copGroup: Scalars['String'];
  isDoubleRotation: Scalars['Boolean'];
  letterValue: Scalars['String'];
  name: Scalars['String'];
  pointValue: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getMove: Move;
};


export type QueryGetMoveArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favourtieMove: Move;
  googleRefreshToken?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  loginCount: Scalars['Float'];
  passwordHash?: Maybe<Scalars['String']>;
  perishibleToken?: Maybe<Scalars['String']>;
  superAdmin: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type GetMoveQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMoveQuery = { __typename?: 'Query', getMove: { __typename?: 'Move', id: string, name: string } };


export const GetMoveDocument = gql`
    query getMove($id: String!) {
  getMove(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetMoveQuery__
 *
 * To run a query within a React component, call `useGetMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoveQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMoveQuery(baseOptions: Apollo.QueryHookOptions<GetMoveQuery, GetMoveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMoveQuery, GetMoveQueryVariables>(GetMoveDocument, options);
      }
export function useGetMoveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoveQuery, GetMoveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMoveQuery, GetMoveQueryVariables>(GetMoveDocument, options);
        }
export type GetMoveQueryHookResult = ReturnType<typeof useGetMoveQuery>;
export type GetMoveLazyQueryHookResult = ReturnType<typeof useGetMoveLazyQuery>;
export type GetMoveQueryResult = Apollo.QueryResult<GetMoveQuery, GetMoveQueryVariables>;