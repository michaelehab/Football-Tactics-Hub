import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, eq, res, next) => {
  console.log('Uncaught Error: ', err);
  return res.status(500).send('An Unexpected Error occurred, Please try again!');
};
