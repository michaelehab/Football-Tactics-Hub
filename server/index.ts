import express, { RequestHandler } from 'express';
import { db } from './datastore';

const app = express();

app.use(express.json());

const requestLoggerMiddleWare: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "--Body:", req.body);
    next();
}

app.use(requestLoggerMiddleWare);

app.get('/posts', (req, res) => {
    return res.send({posts: db.listPosts()});
})

app.post('/posts', (req, res) => {
    const post = req.body;
    db.createPost(post);
    res.sendStatus(200);
})

app.listen(3000);