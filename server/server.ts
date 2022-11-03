import dotenv from 'dotenv';
import express from 'express';
import AsyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import { SignInHandler, SignUpHandler } from './handlers/authHandler';
import {
  countPostCommentsHandler,
  createCommentHandler,
  deleteCommentHandler,
  listCommentsHandler,
} from './handlers/commentHandler';
import { addLikeHandler, countPostLikesHandler, deleteLikeHandler } from './handlers/likeHandler';
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  listPostsHandler,
} from './handlers/postHandler';
import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';
import { loggerMiddleWare } from './middleware/loggerMiddleware';

(async () => {
  await initDb();

  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(loggerMiddleWare);

  app.get('/healthz', (req, res) => res.send({ status: 'OK' }));

  app.post('/api/v1/signup', AsyncHandler(SignUpHandler));

  app.post('/api/v1/signin', AsyncHandler(SignInHandler));

  app.use(authMiddleware);

  app.get('/api/v1/posts/list', AsyncHandler(listPostsHandler));

  app.post('/api/v1/posts/new', AsyncHandler(createPostHandler));

  app.get('/api/v1/posts/:id', AsyncHandler(getPostHandler));

  app.delete('/api/v1/posts/:id', AsyncHandler(deletePostHandler));

  app.get('/api/v1/likes/:postId', AsyncHandler(countPostLikesHandler));

  app.post('/api/v1/likes/:postId', AsyncHandler(addLikeHandler));

  app.delete('/api/v1/likes/:postId', AsyncHandler(deleteLikeHandler));

  app.get('/api/v1/comments/:postId', AsyncHandler(listCommentsHandler));

  app.get('/api/v1/comments/:postId/count', AsyncHandler(countPostCommentsHandler));

  app.post('/api/v1/comments/:postId', AsyncHandler(createCommentHandler));

  app.delete('/api/v1/comments/:commentId', AsyncHandler(deleteCommentHandler));

  app.use(errorMiddleware);

  app.listen(process.env.PORT || 3000);
})();
