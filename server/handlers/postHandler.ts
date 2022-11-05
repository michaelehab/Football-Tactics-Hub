import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  Errors,
  GetPostRequest,
  GetPostResponse,
  ListPostsRequest,
  ListPostsResponse,
  Post,
  noLinkInPost,
} from '@footballtacticshub/shared';

import { DataStore } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
import { validateUrl } from '../utils';

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
      return res.status(400).send({ error: Errors.MISSING_TITLE });
    }

    if (!req.body.url) {
      return res.status(400).send({ error: Errors.MISSING_URL });
    }

    if (req.body.url !== noLinkInPost && !validateUrl(req.body.url)) {
      return res.status(400).send({ error: Errors.INVALID_URL });
    }

    if (!req.body.content) {
      return res.status(400).send({ error: Errors.MISSING_CONTENT });
    }

    const post: Post = {
      id: crypto.randomBytes(20).toString('hex'),
      title: req.body.title,
      url: req.body.url,
      userId: res.locals.userId,
      postedAt: Date.now(),
      content: req.body.content,
    };

    await this.db.createPost(post);
    res.status(200).send({ post });
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
        return res.status(400).send({ error: Errors.MISSING_POST_ID });
      }
      const post = await this.db.getPost(req.params.id);
      if (!post || post.userId != res.locals.userId) {
        return res.sendStatus(401);
      }

      await this.db.deletePost(post.id);
      return res.sendStatus(200);
    };
}
