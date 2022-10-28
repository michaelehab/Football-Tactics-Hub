import express, { ErrorRequestHandler, RequestHandler } from 'express';

import { createPostHandler, listPostsHandler } from './handlers/postHandler';

const app = express();

app.use(express.json());

const requestLoggerMiddleWare: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, '--Body:', req.body);
  next();
};

app.use(requestLoggerMiddleWare);

app.get('/api/v1/posts', listPostsHandler);

app.post('/api/v1/posts', createPostHandler);

const errHandler: ErrorRequestHandler = (err, eq, res, next) => {
  console.log('Uncaught Error: ', err);
  return res.status(500).send('An Unexpected Error occurred, Please try again!');
};

app.use(errHandler);

app.listen(3000);
