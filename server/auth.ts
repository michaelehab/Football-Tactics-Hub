import jwt from 'jsonwebtoken';

import { JwtObject } from './types';
import { getJwtExpiry, getJwtSecret } from './utils';

export const signJwt = (obj: JwtObject): string => {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: getJwtExpiry(),
  });
};

export const verifyJwt = (token: string): JwtObject => {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
};
