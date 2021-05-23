import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReview: Review;
  updateReview?: Maybe<Review>;
  deleteReview: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  getNearbyRestaurants?: Maybe<Array<Restaurant>>;
  getDetailedRestaurant: RestaurantDetails;
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationUpdateReviewArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGetNearbyRestaurantsArgs = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};


export type MutationGetDetailedRestaurantArgs = {
  restaurantId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  reviews: Array<Review>;
  review?: Maybe<Review>;
  me?: Maybe<User>;
  restaurants: Array<Restaurant>;
  restaurant?: Maybe<Restaurant>;
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryRestaurantArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  rating: Scalars['Float'];
  imageUrl: Scalars['String'];
  priceRange: Scalars['Int'];
  reviews: Array<Review>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RestaurantDetails = {
  __typename?: 'RestaurantDetails';
  id: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  website: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  restaurantId: Scalars['String'];
  restaurant: Restaurant;
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReviewInput = {
  restaurantId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  points: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  reviews: Array<Review>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type CreateReviewMutationVariables = Exact<{
  input: ReviewInput;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'Review' }
    & Pick<Review, 'title' | 'content' | 'createdAt' | 'points'>
  ) }
);

export type GetDetailedRestaurantMutationVariables = Exact<{
  restaurantId: Scalars['String'];
}>;


export type GetDetailedRestaurantMutation = (
  { __typename?: 'Mutation' }
  & { getDetailedRestaurant: (
    { __typename?: 'RestaurantDetails' }
    & Pick<RestaurantDetails, 'address' | 'phoneNumber' | 'id' | 'website'>
  ) }
);

export type GetNearbyRestaurantsMutationVariables = Exact<{
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
}>;


export type GetNearbyRestaurantsMutation = (
  { __typename?: 'Mutation' }
  & { getNearbyRestaurants?: Maybe<Array<(
    { __typename?: 'Restaurant' }
    & Pick<Restaurant, 'id' | 'name' | 'latitude' | 'longitude' | 'rating' | 'imageUrl' | 'priceRange'>
  )>> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetRestaurantReviewsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRestaurantReviewsQuery = (
  { __typename?: 'Query' }
  & { restaurant?: Maybe<(
    { __typename?: 'Restaurant' }
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'title' | 'creatorId' | 'createdAt' | 'content' | 'points'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id'>
      ) }
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const CreateReviewDocument = gql`
    mutation createReview($input: ReviewInput!) {
  createReview(input: $input) {
    title
    content
    createdAt
    points
  }
}
    `;

export function useCreateReviewMutation() {
  return Urql.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument);
};
export const GetDetailedRestaurantDocument = gql`
    mutation getDetailedRestaurant($restaurantId: String!) {
  getDetailedRestaurant(restaurantId: $restaurantId) {
    address
    phoneNumber
    id
    website
  }
}
    `;

export function useGetDetailedRestaurantMutation() {
  return Urql.useMutation<GetDetailedRestaurantMutation, GetDetailedRestaurantMutationVariables>(GetDetailedRestaurantDocument);
};
export const GetNearbyRestaurantsDocument = gql`
    mutation GetNearbyRestaurants($longitude: Float!, $latitude: Float!) {
  getNearbyRestaurants(longitude: $longitude, latitude: $latitude) {
    id
    name
    latitude
    longitude
    name
    rating
    imageUrl
    priceRange
  }
}
    `;

export function useGetNearbyRestaurantsMutation() {
  return Urql.useMutation<GetNearbyRestaurantsMutation, GetNearbyRestaurantsMutationVariables>(GetNearbyRestaurantsDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetRestaurantReviewsDocument = gql`
    query getRestaurantReviews($id: String!) {
  restaurant(id: $id) {
    reviews {
      title
      creatorId
      createdAt
      content
      points
      creator {
        username
        id
      }
    }
  }
}
    `;

export function useGetRestaurantReviewsQuery(options: Omit<Urql.UseQueryArgs<GetRestaurantReviewsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRestaurantReviewsQuery>({ query: GetRestaurantReviewsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};