import {
  Comment,
  CountPostCommentsRequest,
  CountPostCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  Errors,
  ListCommentsRequest,
  ListCommentsResponse,
} from '@footballtacticshub/shared';

import { DataStore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

const crypto = require('crypto');

export class CommentHandler {
  private db: DataStore;

  constructor(db: DataStore) {
    this.db = db;
  }

  public list: ExpressHandlerWithParams<
    { postId: string },
    ListCommentsRequest,
    ListCommentsResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }
    return res.send({ comments: await this.db.listComments(req.params.postId) });
  };

  public create: ExpressHandlerWithParams<
    { postId: string },
    CreateCommentRequest,
    CreateCommentResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }

    if (!req.body.comment || req.body.comment == '') {
      return res.status(400).send({ error: Errors.COMMENT_NOT_EMPTY });
    }

    const comment: Comment = {
      id: crypto.randomBytes(20).toString('hex'),
      comment: req.body.comment,
      userId: res.locals.userId,
      postId: req.params.postId,
      postedAt: Date.now(),
    };

    await this.db.createComment(comment);
    res.sendStatus(200);
  };

  public delete: ExpressHandlerWithParams<
    { commentId: string },
    DeleteCommentRequest,
    DeleteCommentResponse
  > = async (req, res) => {
    if (!req.params.commentId) {
      return res.status(400).send({ error: Errors.MISSING_COMMENT_ID });
    }

    const existing = await this.db.getCommentById(req.params.commentId);

    if (!existing) {
      return res.status(400).send({ error: Errors.COMMENT_NOT_EXIST });
    }

    if (existing.userId !== res.locals.userId) {
      return res.sendStatus(401);
    }

    await this.db.deleteComment(req.params.commentId);
    return res.sendStatus(200);
  };

  public count: ExpressHandlerWithParams<
    { postId: string },
    CountPostCommentsRequest,
    CountPostCommentsResponse
  > = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: Errors.MISSING_POST_ID });
    }

    const numberOfComments = await this.db.countComments(req.params.postId);
    return res.status(200).send({ comments: numberOfComments });
  };
}
