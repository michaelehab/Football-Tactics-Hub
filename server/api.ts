import { Post, User } from './types';

// Post APIs
export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface CreatePostResponse {}

export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// Users APIs
export type SignUpRequest = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'password' | 'userName'
>;

export interface SignUpResponse {}

export interface SignInRequest {
  login: string; // Can be both userName or email
  password: string;
}

export type SignInResponse = Pick<User, 'email' | 'firstName' | 'lastName' | 'id' | 'userName'>;
