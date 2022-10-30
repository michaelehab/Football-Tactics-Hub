import crypto from 'crypto';

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// JWT

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT Secret!');
    process.exit(1);
  }
  return secret;
};

export const getJwtExpiry = (): string => {
  const expiry = process.env.JWT_EXPIRES_IN;
  if (!expiry) {
    console.error('Missing JWT Expiry!');
    process.exit(1);
  }
  return expiry;
};

// Password Hashing

const getPasswordSalt = (): string => {
  const salt = process.env.PASSWORD_SALT;
  if (!salt) {
    console.error('Missing Password Salt!');
    process.exit(1);
  }
  return salt;
};

const getPasswordIterations = (): number => {
  const iterations = process.env.PASSWORD_ITERATIONS;
  if (!iterations) {
    console.error('Missing Password Iterations!');
    process.exit(1);
  }
  return parseInt(iterations);
};

const getPasswordKeyLength = (): number => {
  const keylength = process.env.PASSWORD_KEYLEN;
  if (!keylength) {
    console.error('Missing Password key length!');
    process.exit(1);
  }
  return parseInt(keylength);
};

export const getPasswordHashed = (password: string): string => {
  return crypto
    .pbkdf2Sync(
      password,
      getPasswordSalt(),
      getPasswordIterations(),
      getPasswordKeyLength(),
      'sha256'
    )
    .toString();
};
