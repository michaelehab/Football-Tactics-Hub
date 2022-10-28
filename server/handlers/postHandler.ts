import { createPostRequest, createPostResponse, listPostRequest, listPostResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';

const crypto = require('crypto');

export const listPostsHandler: ExpressHandler<listPostRequest, listPostResponse> = (req, res) => {
  return res.send({ posts: db.listPosts() });
};

const checkPostRequiredField = (fieldName: string, value: string | undefined) => {
  if (!value) {
    throw `${fieldName} is required, but missing`;
  }
};

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (
  req,
  res
) => {
  if (!req.body.title) {
    return res.status(400).send('Title field is required but missing!');
  }

  if (!req.body.url) {
    return res.status(400).send('Url field is required but missing!');
  }

  if (!req.body.userId) {
    return res.status(400).send('UserID field is required but missing!');
  }

  const post: Post = {
    id: crypto.randomBytes(20).toString('hex'),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  db.createPost(post);
  res.sendStatus(200);
};
