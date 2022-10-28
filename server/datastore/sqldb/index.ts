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
  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(userName: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
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
    throw new Error('Method not implemented.');
  }
  getPostByUrl(url: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
