import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  id: Scalars['ID'];
  isDoubleRotation: Scalars['Boolean'];
  letterValue: Scalars['String'];
  namedAfter?: Maybe<Scalars['String']>;
  otherNames?: Maybe<Array<Scalars['String']>>;
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
  signup?: Maybe<User>;
};


export type MutationCreateMoveArgs = {
  newMoveInput: NewMoveInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
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

export type CreateMoveMutationVariables = Exact<{
  newMoveInput: NewMoveInput;
}>;


export type CreateMoveMutation = { __typename?: 'Mutation', createMove: { __typename?: 'Move', id: string, description: string } };

export const CurrentUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CurrentUserFragment, unknown>;
export const DefaultMoveValuesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DefaultMoveValues"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Move"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<DefaultMoveValuesFragment, unknown>;
export const LoginDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUser"}}]}}]}},...CurrentUserFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentUser"}}]}}]}},...CurrentUserFragmentDoc.definitions]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateMoveDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newMoveInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewMoveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newMoveInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newMoveInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DefaultMoveValues"}}]}}]}},...DefaultMoveValuesFragmentDoc.definitions]} as unknown as DocumentNode<CreateMoveMutation, CreateMoveMutationVariables>;