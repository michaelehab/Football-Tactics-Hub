import { User } from '@footballtacticshub/shared';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@footballtacticshub/shared';
import crypto from 'crypto';

import { signJwt } from '../auth';
import { DataStore, db } from '../datastore';
import { ExpressHandler } from '../types';
import { getPasswordHashed, validateEmail } from '../utils';

export class AuthHandler {
  private db: DataStore;

  constructor(db: DataStore) {
    this.db = db;
  }

  public signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, userName, password } = req.body;
    if (!email || !firstName || !lastName || !password || !userName) {
      return res.status(400).send({ error: 'All Fields are required' });
    }

    if (!validateEmail(email)) {
      res.status(400).send({ error: 'email is invalid' });
    }

    const existingUser =
      (await this.db.getUserByEmail(email)) || (await this.db.getUserByUsername(userName));

    if (existingUser) {
      return res.status(403).send({ error: 'User already exists' });
    }

    const usr: User = {
      id: crypto.randomBytes(20).toString('hex'),
      firstName,
      lastName,
      userName,
      password: getPasswordHashed(password),
      email,
    };

    await this.db.createUser(usr);
    return res.status(200).send({
      jwt: signJwt({ userId: usr.id }),
    });
  };

  public signIn: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).send({ error: 'All Fields are required' });
    }

    let existingUser;

    if (validateEmail(login)) existingUser = await this.db.getUserByEmail(login);
    else existingUser = await this.db.getUserByUsername(login);

    if (!existingUser || existingUser.password !== getPasswordHashed(password)) {
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
}
