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

export type Apparatus = {
  __typename?: 'Apparatus';
  codeOfPoints: CodeOfPoints;
  createdBy: User;
  dScoreInformation: Scalars['String'];
  deduction: ApparatusDeduction;
  description: Scalars['String'];
  id: Scalars['String'];
  moves: Array<Move>;
  name: ApparatusName;
  presentationInformation: Scalars['String'];
  updateBy: User;
};

export type ApparatusDeduction = {
  __typename?: 'ApparatusDeduction';
  apparatus: Apparatus;
  error: Scalars['Float'];
  id: Scalars['String'];
  pointDeduction: PointDeduction;
  size: ErrorSize;
};

/** These are all the apparatus in mens gymnastics */
export enum ApparatusName {
  Floor = 'FLOOR',
  HighBar = 'HIGH_BAR',
  ParallelBars = 'PARALLEL_BARS',
  Pommel = 'POMMEL',
  Rings = 'RINGS',
  Vault = 'VAULT'
}

export type CodeOfPoints = {
  __typename?: 'CodeOfPoints';
  apparatus: Array<Apparatus>;
  createdBy: User;
  generalInformation: Scalars['String'];
  id: Scalars['String'];
  name: Fig;
  updateBy: User;
};

/** The COP group that the move is part of */
export enum CopGroup {
  I = 'I',
  Ii = 'II',
  Iii = 'III',
  Iv = 'IV',
  V = 'V'
}

/** These are all the sizes that an error can be */
export enum ErrorSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

/** These are all the code of points versions */
export enum Fig {
  FigMens = 'figMens',
  FigWomens = 'figWomens'
}

export type Move = {
  __typename?: 'Move';
  apparatus: Apparatus;
  copGroup: CopGroup;
  copIndex: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  id: Scalars['String'];
  isDoubleRotation: Scalars['Boolean'];
  namedAfter?: Maybe<Scalars['String']>;
  otherNames: Array<Scalars['String']>;
  routineMoves: Array<SavedRoutine>;
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

/** The letter value of a move */
export enum MoveValue {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMove: Move;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
};


export type MutationCreateMoveArgs = {
  newMoveInput: NewMoveInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type NewMoveInput = {
  apparatus: ApparatusName;
  copGroup: CopGroup;
  description: Scalars['String'];
  isDoubleRotation: Scalars['Boolean'];
  letterValue: MoveValue;
};

/** These are all the point deductions for different errors */
export enum PointDeduction {
  Fall = 'FALL',
  Five = 'FIVE',
  One = 'ONE',
  Three = 'THREE'
}

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getMove: Move;
};


export type QueryGetMoveArgs = {
  id: Scalars['String'];
};

export type SavedRoutine = {
  __typename?: 'SavedRoutine';
  id: Scalars['String'];
  moves: Array<Move>;
  user: User;
};

export type User = {
  __typename?: 'User';
  apparatusCreated: Array<CodeOfPoints>;
  apparatusUpdated: Array<CodeOfPoints>;
  codeOfPointsCreated: Array<CodeOfPoints>;
  codeOfPointsUpdated: Array<CodeOfPoints>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favouriteMove: Move;
  googleRefreshToken?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  loginCount: Scalars['Float'];
  movesCreated: Array<Move>;
  passwordHash?: Maybe<Scalars['String']>;
  perishibleToken?: Maybe<Scalars['String']>;
  savedRoutines: Array<SavedRoutine>;
  superAdmin: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, email: string } | null };

export type CurrentUserFragment = { __typename?: 'User', id: string, email: string };

export type DefaultMoveValuesFragment = { __typename?: 'Move', id: string, description: string };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, email: string } | null };

export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  id
  email
}
    `;
export const DefaultMoveValuesFragmentDoc = gql`
    fragment DefaultMoveValues on Move {
  id
  description
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;