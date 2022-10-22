import express, { RequestHandler } from 'express';
import { db } from './datastore';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';

const app = express();

app.use(express.json());

const requestLoggerMiddleWare: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "--Body:", req.body);
    next();
}

app.use(requestLoggerMiddleWare);

app.get('/posts', listPostsHandler);

app.post('/posts', createPostHandler);

app.listen(3000);