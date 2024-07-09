import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../contacts/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
    // const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    // return (req, res, next) => {
    //   swaggerUI.serve(req, res, () => {
    //     swaggerUI.setup(swaggerDoc)(req, res, next);
    //   });
    // };
  } catch (error) {
    return (req, res, next) =>
      next(createHttpError(500, 'Can`t load swagger docs'));
  }
};
