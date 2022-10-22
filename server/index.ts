import express, { RequestHandler } from 'express';

const app = express();

app.use(express.json());

const requestLoggerMiddleWare: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "--Body:", req.body);
    next();
}

app.use(requestLoggerMiddleWare);

app.get('/', (req, res) => {
    return res.send("Hi from Server!");
})

app.listen(3000);