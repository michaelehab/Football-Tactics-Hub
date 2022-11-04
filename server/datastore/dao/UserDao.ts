import { Post, User } from '@footballtacticshub/shared';

export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(userName: string): Promise<User | undefined>;
  getUserLikesCount(id: string): Promise<number>;
  getUserCommentsCount(id: string): Promise<number>;
  getUserPostsCount(id: string): Promise<number>;
  getUserRecentNPosts(id: string, numberOfPosts: number): Promise<Post[] | undefined>;
}
