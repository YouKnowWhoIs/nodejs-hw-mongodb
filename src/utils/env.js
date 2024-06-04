import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, defaultName) => {
  const value = process.env[envName];

  if (value) return value;
  if (defaultName) return defaultName;

  throw new Error(`Missing: process.env['${envName}']`);
};
