import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { SQLDataStore } from './sqldb';

export interface DataStore extends UserDao, LikeDao, CommentDao, PostDao {}

export let db: DataStore;

export async function initDb() {
  // db = new InMemoryDataStore();
  db = await new SQLDataStore().openDb();
}
