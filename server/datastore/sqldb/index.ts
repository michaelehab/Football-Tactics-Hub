import path from 'path';
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';

import { DataStore } from '..';
import { Comment, Like, Post, User } from '../../types';

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

  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE id = ?', id);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE email = ?', email);
  }

  getUserByUsername(userName: string): Promise<User | undefined> {
    return this.db.get<User>('SELECT * FROM users WHERE userName = ?', userName);
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

  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }

  countComments(postId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  listComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }

  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
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

  getPost(id: string): Promise<Post | undefined> {
    return this.db.get<Post>('SELECT * FROM posts WHERE id = ?', id);
  }

  getPostByUrl(url: string): Promise<Post | undefined> {
    return this.db.get<Post>('SELECT * FROM posts WHERE url = ?', url);
  }

  async deletePost(id: string): Promise<void> {
    await this.db.run('DELETE FROM posts WHERE id = ?', id);
  }
}
