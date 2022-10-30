import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostRequest,
  GetPostResponse,
  ListPostRequest,
  ListPostResponse,
} from '../api';
import { db } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams, Post } from '../types';

const crypto = require('crypto');

export const listPostsHandler: ExpressHandler<ListPostRequest, ListPostResponse> = async (
  req,
  res
) => {
  return res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  if (!req.body.title) {
    return res.status(400).send({ error: 'Title field is required but missing' });
  }

  if (!req.body.url) {
    return res.status(400).send({ error: 'Url field is required but missing' });
  }

  if (!req.body.userId) {
    return res.status(400).send({ error: 'UserID field is required but missing' });
  }

  const post: Post = {
    id: crypto.randomBytes(20).toString('hex'),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  await db.createPost(post);
  res.sendStatus(200);
};

export const getPostHandler: ExpressHandlerWithParams<
  { id: string },
  GetPostRequest,
  GetPostResponse
> = async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(400);
  }

  const post = await db.getPost(req.params.id);
  if (!post) {
    return res.sendStatus(404);
  }

  return res.send({ post: post });
};
