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
  codeOfPointsGroups: CodeOfPointsGroup;
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

export type CodeOfPointsGroup = {
  __typename?: 'CodeOfPointsGroup';
  apparatus: Apparatus;
  description: Scalars['String'];
  group: Scalars['Float'];
  id: Scalars['String'];
  move: Array<Move>;
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
  copGroup: CodeOfPointsGroup;
  copIndex?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  id: Scalars['String'];
  isDoubleRotation: Scalars['Boolean'];
  letterValue: Scalars['String'];
  namedAfter?: Maybe<Scalars['String']>;
  otherNames: Array<Scalars['String']>;
  pointValue: Scalars['Float'];
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
  createRoutine: SavedRoutine;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  signup?: Maybe<User>;
  updateRoutine: SavedRoutine;
};


export type MutationCreateMoveArgs = {
  newMoveInput: NewMoveInput;
};


export type MutationCreateRoutineArgs = {
  moveId: Scalars['String'];
  routineName?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateRoutineArgs = {
  routineId: Scalars['String'];
  updatedRoutine: UpdateRoutineInput;
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
  getApparatusMoves: Array<Move>;
  getCurrentUser?: Maybe<User>;
  getMove: Move;
  getRoutine: SavedRoutine;
};


export type QueryGetApparatusMovesArgs = {
  name: Scalars['String'];
  searchInput?: InputMaybe<Scalars['String']>;
};


export type QueryGetMoveArgs = {
  id: Scalars['String'];
};


export type QueryGetRoutineArgs = {
  routineId: Scalars['String'];
};

export type SavedRoutine = {
  __typename?: 'SavedRoutine';
  formatted_moves: Array<Array<Scalars['String']>>;
  id: Scalars['String'];
  moves: Array<Move>;
  name: Scalars['String'];
  user: User;
};

export type UpdateRoutineInput = {
  formatted_moves?: InputMaybe<Array<Array<Scalars['String']>>>;
  move?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type CreateMoveMutationVariables = Exact<{
  newMoveInput: NewMoveInput;
}>;


export type CreateMoveMutation = { __typename?: 'Mutation', createMove: { __typename?: 'Move', id: string, description: string } };

export type CreateRoutineMutationVariables = Exact<{
  moveId: Scalars['String'];
  routineName?: InputMaybe<Scalars['String']>;
}>;


export type CreateRoutineMutation = { __typename?: 'Mutation', createRoutine: { __typename?: 'SavedRoutine', id: string } };

export type GetRoutineQueryVariables = Exact<{
  routineId: Scalars['String'];
}>;


export type GetRoutineQuery = { __typename?: 'Query', getRoutine: { __typename?: 'SavedRoutine', id: string, name: string, formatted_moves: Array<Array<string>>, moves: Array<{ __typename?: 'Move', id: string, namedAfter?: string | null, letterValue: string, description: string, pointValue: number }> } };

export type UpdateRoutineMutationVariables = Exact<{
  routineId: Scalars['String'];
  updatedRoutine: UpdateRoutineInput;
}>;


export type UpdateRoutineMutation = { __typename?: 'Mutation', updateRoutine: { __typename?: 'SavedRoutine', id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, email: string } | null };

export type GetApparatusMovesQueryVariables = Exact<{
  name: Scalars['String'];
  searchInput?: InputMaybe<Scalars['String']>;
}>;


export type GetApparatusMovesQuery = { __typename?: 'Query', getApparatusMoves: Array<{ __typename?: 'Move', id: string, description: string, letterValue: string, pointValue: number }> };

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
export const CreateMoveDocument = gql`
    mutation createMove($newMoveInput: NewMoveInput!) {
  createMove(newMoveInput: $newMoveInput) {
    ...DefaultMoveValues
  }
}
    ${DefaultMoveValuesFragmentDoc}`;
export type CreateMoveMutationFn = Apollo.MutationFunction<CreateMoveMutation, CreateMoveMutationVariables>;

/**
 * __useCreateMoveMutation__
 *
 * To run a mutation, you first call `useCreateMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveMutation, { data, loading, error }] = useCreateMoveMutation({
 *   variables: {
 *      newMoveInput: // value for 'newMoveInput'
 *   },
 * });
 */
export function useCreateMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveMutation, CreateMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveMutation, CreateMoveMutationVariables>(CreateMoveDocument, options);
      }
export type CreateMoveMutationHookResult = ReturnType<typeof useCreateMoveMutation>;
export type CreateMoveMutationResult = Apollo.MutationResult<CreateMoveMutation>;
export type CreateMoveMutationOptions = Apollo.BaseMutationOptions<CreateMoveMutation, CreateMoveMutationVariables>;
export const CreateRoutineDocument = gql`
    mutation createRoutine($moveId: String!, $routineName: String) {
  createRoutine(moveId: $moveId, routineName: $routineName) {
    id
  }
}
    `;
export type CreateRoutineMutationFn = Apollo.MutationFunction<CreateRoutineMutation, CreateRoutineMutationVariables>;

/**
 * __useCreateRoutineMutation__
 *
 * To run a mutation, you first call `useCreateRoutineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoutineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoutineMutation, { data, loading, error }] = useCreateRoutineMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      routineName: // value for 'routineName'
 *   },
 * });
 */
export function useCreateRoutineMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoutineMutation, CreateRoutineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoutineMutation, CreateRoutineMutationVariables>(CreateRoutineDocument, options);
      }
export type CreateRoutineMutationHookResult = ReturnType<typeof useCreateRoutineMutation>;
export type CreateRoutineMutationResult = Apollo.MutationResult<CreateRoutineMutation>;
export type CreateRoutineMutationOptions = Apollo.BaseMutationOptions<CreateRoutineMutation, CreateRoutineMutationVariables>;
export const GetRoutineDocument = gql`
    query getRoutine($routineId: String!) {
  getRoutine(routineId: $routineId) {
    id
    name
    moves {
      id
      namedAfter
      letterValue
      description
      pointValue
    }
    formatted_moves
  }
}
    `;

/**
 * __useGetRoutineQuery__
 *
 * To run a query within a React component, call `useGetRoutineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoutineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoutineQuery({
 *   variables: {
 *      routineId: // value for 'routineId'
 *   },
 * });
 */
export function useGetRoutineQuery(baseOptions: Apollo.QueryHookOptions<GetRoutineQuery, GetRoutineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoutineQuery, GetRoutineQueryVariables>(GetRoutineDocument, options);
      }
export function useGetRoutineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoutineQuery, GetRoutineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoutineQuery, GetRoutineQueryVariables>(GetRoutineDocument, options);
        }
export type GetRoutineQueryHookResult = ReturnType<typeof useGetRoutineQuery>;
export type GetRoutineLazyQueryHookResult = ReturnType<typeof useGetRoutineLazyQuery>;
export type GetRoutineQueryResult = Apollo.QueryResult<GetRoutineQuery, GetRoutineQueryVariables>;
export const UpdateRoutineDocument = gql`
    mutation updateRoutine($routineId: String!, $updatedRoutine: UpdateRoutineInput!) {
  updateRoutine(routineId: $routineId, updatedRoutine: $updatedRoutine) {
    id
  }
}
    `;
export type UpdateRoutineMutationFn = Apollo.MutationFunction<UpdateRoutineMutation, UpdateRoutineMutationVariables>;

/**
 * __useUpdateRoutineMutation__
 *
 * To run a mutation, you first call `useUpdateRoutineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoutineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoutineMutation, { data, loading, error }] = useUpdateRoutineMutation({
 *   variables: {
 *      routineId: // value for 'routineId'
 *      updatedRoutine: // value for 'updatedRoutine'
 *   },
 * });
 */
export function useUpdateRoutineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoutineMutation, UpdateRoutineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoutineMutation, UpdateRoutineMutationVariables>(UpdateRoutineDocument, options);
      }
export type UpdateRoutineMutationHookResult = ReturnType<typeof useUpdateRoutineMutation>;
export type UpdateRoutineMutationResult = Apollo.MutationResult<UpdateRoutineMutation>;
export type UpdateRoutineMutationOptions = Apollo.BaseMutationOptions<UpdateRoutineMutation, UpdateRoutineMutationVariables>;
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
export const GetApparatusMovesDocument = gql`
    query getApparatusMoves($name: String!, $searchInput: String) {
  getApparatusMoves(name: $name, searchInput: $searchInput) {
    id
    description
    letterValue
    pointValue
  }
}
    `;

/**
 * __useGetApparatusMovesQuery__
 *
 * To run a query within a React component, call `useGetApparatusMovesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApparatusMovesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApparatusMovesQuery({
 *   variables: {
 *      name: // value for 'name'
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useGetApparatusMovesQuery(baseOptions: Apollo.QueryHookOptions<GetApparatusMovesQuery, GetApparatusMovesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApparatusMovesQuery, GetApparatusMovesQueryVariables>(GetApparatusMovesDocument, options);
      }
export function useGetApparatusMovesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApparatusMovesQuery, GetApparatusMovesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApparatusMovesQuery, GetApparatusMovesQueryVariables>(GetApparatusMovesDocument, options);
        }
export type GetApparatusMovesQueryHookResult = ReturnType<typeof useGetApparatusMovesQuery>;
export type GetApparatusMovesLazyQueryHookResult = ReturnType<typeof useGetApparatusMovesLazyQuery>;
export type GetApparatusMovesQueryResult = Apollo.QueryResult<GetApparatusMovesQuery, GetApparatusMovesQueryVariables>;
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