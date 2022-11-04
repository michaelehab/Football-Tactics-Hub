import { Comment, Like, Post, User } from '@footballtacticshub/shared';
import path from 'path';
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';

export class SQLDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'footballtacticshub.sqlite'),
      driver: sqlite3.Database,
    });

    // To keep the referential integrity
    this.db.run('PRAGMA foreign_keys = ON');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users(id, firstName, lastName, userName, email, password) VALUES (?,?,?,?,?,?)',
      user.id,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password
    );
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.db.get<User>('SELECT * FROM users WHERE id = ?', id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get<User>('SELECT * FROM users WHERE email = ?', email);
  }

  async getUserByUsername(userName: string): Promise<User | undefined> {
    return await this.db.get<User>('SELECT * FROM users WHERE userName = ?', userName);
  }

  async createLike(like: Like): Promise<void> {
    await this.db.run('INSERT INTO likes(userId, postId) VALUES (?, ?)', like.userId, like.postId);
  }

  async deleteLike(like: Like): Promise<void> {
    await this.db.run(
      'DELETE FROM likes WHERE userId = ? and postId = ?',
      like.userId,
      like.postId
    );
  }

  async getLikes(postId: string): Promise<number> {
    const result = await this.db.get<{ likesCount: number }>(
      'SELECT COUNT(*) as likesCount FROM likes WHERE postId = ?',
      postId
    );
    return result == undefined ? 0 : result.likesCount;
  }

  async exists(like: Like): Promise<boolean> {
    const checkLikeExist = await this.db.get<Number>(
      'Select 1 FROM likes WHERE postId = ? and userId = ?',
      like.postId,
      like.userId
    );

    return checkLikeExist !== undefined;
  }

  async createComment(comment: Comment): Promise<void> {
    await this.db.run(
      'INSERT INTO comments(id, userId, postId, comment, postedAt) VALUES (?, ?, ?, ?, ?)',
      comment.id,
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt
    );
  }

  async getCommentById(id: string): Promise<Comment | undefined> {
    return await this.db.get<Comment>('SELECT * FROM comments WHERE id = ?', id);
  }

  async countComments(postId: string): Promise<number> {
    const result = await this.db.get<{ commentsCount: number }>(
      'SELECT COUNT(*) as commentsCount FROM comments WHERE postId = ?',
      postId
    );
    return result == undefined ? 0 : result.commentsCount;
  }

  async listComments(postId: string): Promise<Comment[]> {
    return await this.db.all<Comment[]>('SELECT * FROM comments WHERE postId = ?', postId);
  }

  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id = ?', id);
  }

  async listPosts(): Promise<Post[]> {
    return await this.db.all<Post[]>('SELECT * FROM posts ORDER BY postedAt DESC');
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts(id, title, url, postedAt, userId) VALUES (?, ?, ?, ?, ?)',
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return await this.db.get<Post>('SELECT * FROM posts WHERE id = ?', id);
  }

  async getPostByUrl(url: string): Promise<Post | undefined> {
    return await this.db.get<Post>('SELECT * FROM posts WHERE url = ?', url);
  }

  async deletePost(id: string): Promise<void> {
    await this.db.run('DELETE FROM posts WHERE id = ?', id);
  }

  async getUserLikesCount(id: string): Promise<number> {
    const result = await this.db.get<{ likesCount: number }>(
      'SELECT Count(*) as likesCount FROM likes WHERE userId = ?',
      id
    );
    return result === undefined ? 0 : result.likesCount;
  }
  async getUserCommentsCount(id: string): Promise<number> {
    const result = await this.db.get<{ commentsCount: number }>(
      'SELECT Count(*) as commentsCount FROM comments WHERE userId = ?',
      id
    );
    return result === undefined ? 0 : result.commentsCount;
  }
  async getUserPostsCount(id: string): Promise<number> {
    const result = await this.db.get<{ postsCount: number }>(
      'SELECT Count(*) as postsCount FROM posts WHERE userId = ?',
      id
    );
    return result === undefined ? 0 : result.postsCount;
  }
  async getUserRecentNPosts(id: string, numberOfPosts: number): Promise<Post[] | undefined> {
    return await this.db.all<Post[]>(
      'SELECT * FROM posts WHERE userId = ? ORDER BY postedAt DESC LIMIT ?',
      id,
      numberOfPosts
    );
  }
}
