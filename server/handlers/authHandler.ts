import crypto from 'crypto';

import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { signJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';
import { validateEmail } from '../utils';

export const SignUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { email, firstName, lastName, userName, password } = req.body;
  if (!email || !firstName || !lastName || !password || !userName) {
    return res.status(400).send({ error: 'All Fields are required' });
  }

  if (!validateEmail(email)) {
    res.status(400).send({ error: 'email is invalid' });
  }

  const existingUser = (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));

  if (existingUser) {
    return res.status(403).send({ error: 'User already exists' });
  }

  const usr: User = {
    id: crypto.randomBytes(20).toString('hex'),
    firstName,
    lastName,
    userName,
    password,
    email,
  };

  await db.createUser(usr);
  return res.status(200).send({
    jwt: signJwt({ userId: usr.id }),
  });
};

export const SignInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({ error: 'All Fields are required' });
  }

  const existingUser = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!existingUser || existingUser.password !== password) {
    return res.status(403).send({ error: 'Wrong Credentials' });
  }

  return res.status(200).send({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      userName: existingUser.userName,
    },
    jwt: signJwt({ userId: existingUser.id }),
  });
};
