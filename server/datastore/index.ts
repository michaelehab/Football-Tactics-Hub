import { UserDao } from "./UserDao";
import { LikeDao } from "./LikeDao";
import { CommentDao } from "./CommentDao";
import { PostDao } from "./PostDao";
import { InMemoryDataStore } from "./memorydb";

export interface DataStore extends UserDao, LikeDao, CommentDao, PostDao {}

export const db = new InMemoryDataStore();