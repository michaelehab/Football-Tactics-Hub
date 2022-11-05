import {
  AddLikeRequest,
  AddLikeResponse,
  CheckLikeExistsRequest,
  CheckLikeExistsResponse,
  CountPostLikesRequest,
  CountPostLikesResponse,
  DeleteLikeRequest,
  DeleteLikeResponse,
  Errors,
  Like,
} from '@footballtacticshub/shared';

import { DataStore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

export class LikeHandler {
  private db: DataStore;

  constructor(db: DataStore) {
    this.db = db;
  }

  public create: ExpressHandlerWithParams<{ postId: string }, AddLikeRequest, AddLikeResponse> =
    async (req, res) => {
      if (!req.params.postId) {
        return res.status(400).send({ error: Errors.MISSING_POST_ID });
      }

      const like: Like = {
        userId: res.locals.userId,
        postId: req.params.postId,
      };

      const existing = await this.db.exists(like);

      if (existing) {
        return res.status(400).send({ error: Errors.LIKE_ALREADY_EXIST });
      }

      await this.db.createLike(like);
      return res.sendStatus(200);
    };

  public delete: ExpressHandlerWithParams<
    { postId: string },
    DeleteLikeRequest,
    DeleteLikeResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }

    const like: Like = {
      userId: res.locals.userId,
      postId: req.params.postId,
    };

    const existing = await this.db.exists(like);

    if (!existing) {
      return res.status(400).send({ error: Errors.LIKE_NOT_EXIST });
    }

    await this.db.deleteLike(like);
    return res.sendStatus(200);
  };

  public count: ExpressHandlerWithParams<
    { postId: string },
    CountPostLikesRequest,
    CountPostLikesResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }

    const numberOfLikes = await this.db.getLikes(req.params.postId);
    return res.status(200).send({ likes: numberOfLikes });
  };

  public exists: ExpressHandlerWithParams<
    { postId: string },
    CheckLikeExistsRequest,
    CheckLikeExistsResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }
    const like = {
      userId: res.locals.userId,
      postId: req.params.postId,
    };

    return res.status(200).send({ exists: await this.db.exists(like) });
  };
}
