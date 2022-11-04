import { ENDPOINT_CONFIGS, Endpoints } from '@footballtacticshub/shared';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { RequestHandler } from 'express';
import AsyncHandler from 'express-async-handler';

import { db, initDb } from './datastore';
import { AuthHandler } from './handlers/authHandler';
import { CommentHandler } from './handlers/commentHandler';
import { LikeHandler } from './handlers/likeHandler';
import { PostHandler } from './handlers/postHandler';
import { parseJwtMiddleware, requireJwtMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';
import { loggerMiddleWare } from './middleware/loggerMiddleware';

(async () => {
  await initDb();

  dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(loggerMiddleWare);

  const authHandler = new AuthHandler(db);
  const commentHandler = new CommentHandler(db);
  const likeHandler = new LikeHandler(db);
  const postHandler = new PostHandler(db);

  const HANDLERS: { [key in Endpoints]: RequestHandler<any, any> } = {
    [Endpoints.healthz]: (_, res) => res.send({ status: 'OK' }),

    [Endpoints.signin]: authHandler.signIn,
    [Endpoints.signup]: authHandler.signUp,
    [Endpoints.getSignedInUser]: authHandler.signedIn,
    [Endpoints.getUser]: authHandler.getUser,
    [Endpoints.getUserProfile]: authHandler.getProfile,

    [Endpoints.listPosts]: postHandler.list,
    [Endpoints.getPost]: postHandler.get,
    [Endpoints.createPost]: postHandler.create,
    [Endpoints.deletePost]: postHandler.delete,

    [Endpoints.countLikes]: likeHandler.count,
    [Endpoints.createLike]: likeHandler.create,
    [Endpoints.deleteLike]: likeHandler.delete,
    [Endpoints.checkLikeExist]: likeHandler.exists,

    [Endpoints.countComments]: commentHandler.count,
    [Endpoints.listComments]: commentHandler.list,
    [Endpoints.createComment]: commentHandler.create,
    [Endpoints.deleteComment]: commentHandler.delete,
  };

  Object.keys(Endpoints).forEach(entry => {
    const config = ENDPOINT_CONFIGS[entry as Endpoints];
    const handler = HANDLERS[entry as Endpoints];

    if (config.auth) {
      app[config.method](
        config.url,
        parseJwtMiddleware,
        requireJwtMiddleware,
        AsyncHandler(handler)
      );
    } else {
      app[config.method](config.url, parseJwtMiddleware, AsyncHandler(handler));
    }
  });

  app.use(errorMiddleware);

  app.listen(process.env.PORT || 3000);
})();
