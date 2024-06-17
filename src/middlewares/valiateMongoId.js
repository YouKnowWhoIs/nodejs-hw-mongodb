import createHttpError from 'http-errors';
import { Types } from 'mongoose';

export const validateMongoId = (req, res, next) => {
  const { contactId } = res.params;

  if (!Types.ObjectId.isValid(contactId)) {
    next(createHttpError(400, 'Invalidd ID'));
  }
  next();
};
