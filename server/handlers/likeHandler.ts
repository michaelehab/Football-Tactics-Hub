import { Like } from '@footballtacticshub/shared';

import {
  AddLikeRequest,
  AddLikeResponse,
  CountPostLikesRequest,
  CountPostLikesResponse,
  DeleteLikeRequest,
  DeleteLikeResponse,
} from '../api';
import { db } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

export const addLikeHandler: ExpressHandlerWithParams<
  { postId: string },
  AddLikeRequest,
  AddLikeResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'PostId is required but missing' });
  }

  const like: Like = {
    userId: res.locals.userId,
    postId: req.params.postId,
  };

  const existing = await db.exists(like);

  if (existing) {
    return res.status(400).send({ error: 'Like already exists' });
  }

  await db.createLike(like);
  return res.sendStatus(200);
};

export const deleteLikeHandler: ExpressHandlerWithParams<
  { postId: string },
  DeleteLikeRequest,
  DeleteLikeResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'PostId is required but missing' });
  }

  const like: Like = {
    userId: res.locals.userId,
    postId: req.params.postId,
  };

  const existing = await db.exists(like);

  if (!existing) {
    return res.status(400).send({ error: 'Like does not exist' });
  }

  await db.deleteLike(like);
  return res.sendStatus(200);
};

export const countPostLikesHandler: ExpressHandlerWithParams<
  { postId: string },
  CountPostLikesRequest,
  CountPostLikesResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'PostId is required but missing' });
  }

  const numberOfLikes = await db.getLikes(req.params.postId);
  return res.status(200).send({ likes: numberOfLikes });
};
