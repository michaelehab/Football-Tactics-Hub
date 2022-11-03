import { Post } from '@footballtacticshub/shared';

export interface PostDao {
  listPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<void>;
  getPost(id: string): Promise<Post | undefined>;
  getPostByUrl(url: string): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
}
