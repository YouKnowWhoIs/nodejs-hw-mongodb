import { OAuth2Client } from 'google-auth-library';
// import oauthConfig from '../../google-oauth.json';
import path from 'node:path';
import fs from 'fs';

import { env } from './env.js';
import createHttpError from 'http-errors';
import { ENV_VARS } from '../contacts/index.js';

const googleConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'google-oauth.json')).toString(),
);

const googleOAuthClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
  project_id: googleConfig.web.project_id,
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);

  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';

  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
