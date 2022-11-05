import {
  GetUserProfileDataRequest,
  GetUserProfileDataResponse,
  GetUserRequest,
  GetUserResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  User,
  userProfilePostsLimit,
  Errors
} from '@footballtacticshub/shared';
import crypto from 'crypto';

import { signJwt } from '../auth';
import { DataStore } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
import { getPasswordHashed, validateEmail, validatePassword, validateUserName } from '../utils';

export class AuthHandler {
  private db: DataStore;

  constructor(db: DataStore) {
    this.db = db;
  }

  public signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, userName, password } = req.body;
    if (!email || !firstName || !lastName || !password || !userName) {
      return res.status(400).send({ error:  Errors.ALL_FIELDS_REQUIRED});
    }

    if (!validateEmail(email)) {
      return res.status(400).send({ error: Errors.INVALID_EMAIL });
    }

    if (!validateUserName(userName)) {
      return res.status(400).send({ error: Errors.INVALID_USERNAME });
    }

    if (!validatePassword(password)) {
      return res.status(400).send({ error: Errors.INVALID_PASSWORD });
    }

    const existingUser =
      (await this.db.getUserByEmail(email)) || (await this.db.getUserByUsername(userName));

    if (existingUser) {
      return res.status(403).send({ error: Errors.USER_ALREADY_EXIST });
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
      return res.status(400).send({ error: Errors.ALL_FIELDS_REQUIRED });
    }

    let existingUser;

    if (validateEmail(login)) existingUser = await this.db.getUserByEmail(login);
    else existingUser = await this.db.getUserByUsername(login);

    if (!existingUser || existingUser.password !== getPasswordHashed(password)) {
      return res.status(403).send({ error: Errors.WRONG_CREDENTIALS });
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

  public getUser: ExpressHandlerWithParams<{ userId: string }, GetUserRequest, GetUserResponse> =
    async (req, res) => {
      if (!req.params.userId) {
        return res.status(400).send({ error: Errors.MISSING_USER_ID });
      }
      const existing = await this.db.getUserById(req.params.userId);
      if (!existing) {
        return res.sendStatus(404);
      }
      return res.status(200).send({
        user: {
          id: existing.id,
          firstName: existing.firstName,
          lastName: existing.lastName,
          userName: existing.userName,
          email: existing.email,
        },
      });
    };

  public getProfile: ExpressHandlerWithParams<
    { userId: string },
    GetUserProfileDataRequest,
    GetUserProfileDataResponse
  > = async (req, res) => {
    if (!req.params.userId) {
      return res.status(400).send({ error: Errors.MISSING_USER_ID });
    }
    const existing = await this.db.getUserById(req.params.userId);
    if (!existing) {
      return res.sendStatus(404);
    }
    return res.status(200).send({
      user: {
        id: existing.id,
        firstName: existing.firstName,
        lastName: existing.lastName,
        userName: existing.userName,
        email: existing.email,
      },
      recentPosts: await this.db.getUserRecentNPosts(existing.id, userProfilePostsLimit),
      stats: {
        numberOfComments: await this.db.getUserCommentsCount(existing.id),
        numberOfLikes: await this.db.getUserLikesCount(existing.id),
        numberOfPosts: await this.db.getUserPostsCount(existing.id),
      },
    });
  };

  public signedIn: ExpressHandler<GetUserRequest, GetUserResponse> = async (req, res) => {
    const existing = await this.db.getUserById(res.locals.userId);
    if (!existing) {
      return res.sendStatus(400);
    }
    return res.status(200).send({
      user: {
        id: existing.id,
        firstName: existing.firstName,
        lastName: existing.lastName,
        userName: existing.userName,
        email: existing.email,
      },
    });
  };
}
