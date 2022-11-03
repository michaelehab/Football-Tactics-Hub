import { RequestHandler } from 'express';

export interface JwtObject {
  userId: string;
}

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

// Create generic type and append error prop to the Type T
type WithError<T> = T & { error: string };

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
