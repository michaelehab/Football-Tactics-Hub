import { Post } from './types';

// Post APIs
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface createPostResponse {}

export interface listPostRequest {}
export interface listPostResponse {
  posts: Post[];
}

export interface getPostRequest {}
export interface getPostResponse {
  post: Post;
}
