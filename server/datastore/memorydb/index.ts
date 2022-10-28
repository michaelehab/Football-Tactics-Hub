import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../types';

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  deleteLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getLikes(postId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  exists(like: Like): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  countComments(postId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  getPostByUrl(url: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }

  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.email === email));
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.userName === username));
  }

  listPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }

  getPost(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find(p => p.id === id));
  }

  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.posts.splice(index, 1);
    return Promise.resolve();
  }

  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }

  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }

  listComments(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter(c => c.postId === postId));
  }

  deleteComment(id: string): Promise<void> {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.posts.splice(index, 1);
    return Promise.resolve();
  }
}
