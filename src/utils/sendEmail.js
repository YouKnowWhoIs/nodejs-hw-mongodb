import nodemailer from 'nodemailer';
import { env } from './env.js';
import { EMAIL_VARS } from '../contacts/index.js';

const transport = nodemailer.createTransport({
  host: env(EMAIL_VARS.SMTP_HOST),
  port: env(EMAIL_VARS.SMTP_PORT),
  auth: {
    user: env(EMAIL_VARS.SMTP_USER),
    pass: env(EMAIL_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transport.sendMail(options);
};
