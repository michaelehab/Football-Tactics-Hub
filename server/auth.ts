import jwt from 'jsonwebtoken';

import { JwtObject } from './types';

export const signJwt = (obj: JwtObject): string => {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: getJwtExpiry(),
  });
};

export const verifyJwt = (token: string): JwtObject => {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
};

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT Secret!');
    process.exit(1);
  }
  return secret;
};

const getJwtExpiry = (): string => {
  const expiry = process.env.JWT_EXPIRES_IN;
  if (!expiry) {
    console.error('Missing JWT Secret!');
    process.exit(1);
  }
  return expiry;
};
