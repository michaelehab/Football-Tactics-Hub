import {
  ENDPOINT_CONFIGS,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@footballtacticshub/shared";

import { callEndpoint } from "./callEndpoint";

export const LOCAL_STORAGE_JWT = "jwtToken";

export const getLocalStorageJWT = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_JWT) || "";
};

export const isLoggedIn = (): boolean => {
  const jwt = getLocalStorageJWT();
  return !!jwt;
};

export const signIn = async (login: string, password: string) => {
  const res = await callEndpoint<SignInRequest, SignInResponse>(
    ENDPOINT_CONFIGS.signin,
    {
      login,
      password,
    }
  );
  localStorage.setItem(LOCAL_STORAGE_JWT, res.jwt);
};

export const signUp = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string
) => {
  const res = await callEndpoint<SignUpRequest, SignUpResponse>(
    ENDPOINT_CONFIGS.signup,
    {
      firstName,
      lastName,
      userName,
      email,
      password,
    }
  );
  localStorage.setItem(LOCAL_STORAGE_JWT, res.jwt);
};

export const signOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT);
};