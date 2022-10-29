import crypto from 'crypto';

import { SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';
import { validateEmail } from '../utils';

export const SignUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { email, firstName, lastName, userName, password } = req.body;
  if (!email || !firstName || !lastName || !password || !userName) {
    return res.status(400).send('All Fields are required!');
  }

  if (!validateEmail(email)) {
    res.status(400).send('The email you sent is invalid!');
  }

  const existingUser = (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));

  if (existingUser) {
    return res.status(403).send('User already exists!');
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
  return res.sendStatus(200);
};
