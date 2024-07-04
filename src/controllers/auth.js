import { ONE_DAY } from '../contacts/index.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';

export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfuly registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logge in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshUserSession({ sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshe a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailControler = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.boy);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
