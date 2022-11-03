import { Comment, Post, User } from "./types";

// Post APIs
export type CreatePostRequest = Pick<Post, "title" | "url">;
export interface CreatePostResponse {}

export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

export interface DeletePostRequest {
  postId: string;
}
export interface DeletePostResponse {}

// Users APIs
export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "password" | "userName"
>;

export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // Can be both userName or email
  password: string;
}

export type SignInResponse = {
  user: Pick<User, "email" | "firstName" | "lastName" | "id" | "userName">;
  jwt: string;
};

export interface GetUserRequest {}
export type GetUserResponse = {
  user: Pick<User, "email" | "firstName" | "lastName" | "id" | "userName">;
};

// Likes APIs
export interface AddLikeRequest {}
export interface AddLikeResponse {}

export interface CountPostLikesRequest {}
export interface CountPostLikesResponse {
  likes: Number;
}

export interface DeleteLikeRequest {}
export interface DeleteLikeResponse {}

// Comments APIs
export type CreateCommentRequest = Pick<Comment, "comment">;
export interface CreateCommentResponse {
  comment: Comment;
}

export interface ListCommentsRequest {}
export interface ListCommentsResponse {
  comments: Comment[];
}

export interface DeleteCommentRequest {}
export interface DeleteCommentResponse {}

export interface CountPostCommentsRequest {}
export interface CountPostCommentsResponse {
  comments: number;
}
