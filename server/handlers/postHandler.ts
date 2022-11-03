import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetPostRequest,
  GetPostResponse,
  ListPostsRequest,
  ListPostsResponse,
  Post,
} from '@footballtacticshub/shared';

import { DataStore } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';

const crypto = require('crypto');

export class PostHandler {
  private db: DataStore;

  constructor(db: DataStore) {
    this.db = db;
  }

  public list: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (req, res) => {
    return res.send({ posts: await this.db.listPosts() });
  };

  public create: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    if (!req.body.title) {
      return res.status(400).send({ error: 'Title field is required but missing' });
    }

    if (!req.body.url) {
      return res.status(400).send({ error: 'Url field is required but missing' });
    }

    const post: Post = {
      id: crypto.randomBytes(20).toString('hex'),
      title: req.body.title,
      url: req.body.url,
      userId: res.locals.userId,
      postedAt: Date.now(),
    };

    await this.db.createPost(post);
    res.sendStatus(200);
  };

  public get: ExpressHandlerWithParams<{ id: string }, GetPostRequest, GetPostResponse> = async (
    req,
    res
  ) => {
    if (!req.params.id) {
      return res.sendStatus(400);
    }

    const post = await this.db.getPost(req.params.id);
    if (!post) {
      return res.sendStatus(404);
    }

    return res.send({ post: post });
  };

  public delete: ExpressHandlerWithParams<{ id: string }, DeletePostRequest, DeletePostResponse> =
    async (req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: 'Post id is missing' });
      }
      const post = await this.db.getPost(req.params.id);
      if (!post || post.userId != res.locals.userId) {
        return res.sendStatus(401);
      }

      await this.db.deletePost(post.id);
      return res.sendStatus(200);
    };
}
