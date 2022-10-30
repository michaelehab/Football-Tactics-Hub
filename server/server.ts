import express from 'express';
import AsyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import { SignInHandler, SignUpHandler } from './handlers/authHandler';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { errorMiddleware } from './middleware/errorMiddleware';
import { loggerMiddleWare } from './middleware/loggerMiddleware';

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.use(loggerMiddleWare);

  app.get('/api/v1/posts', AsyncHandler(listPostsHandler));

  app.post('/api/v1/posts', AsyncHandler(createPostHandler));

  app.post('/api/v1/signup', AsyncHandler(SignUpHandler));

  app.post('/api/v1/signin', AsyncHandler(SignInHandler));

  app.use(errorMiddleware);

  app.listen(3000);
})();
