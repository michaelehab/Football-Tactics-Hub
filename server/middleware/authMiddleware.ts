import { RequestHandler } from 'express';

import { verifyJwt } from '../auth';
import { db } from '../datastore';

export const parseJwtMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next();
  }
  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);
    if (!user) {
      throw 'User not found';
    }
    res.locals.userId = user.id;
    return next();
  } catch {
    return res.status(401).send({ error: 'Bad Token' });
  }
};

export const requireJwtMiddleware: RequestHandler = async (req, res, next) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  return next();
};
