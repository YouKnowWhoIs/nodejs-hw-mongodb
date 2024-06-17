import joi from 'joi';

export const createContactSchema = joi.object({
  name: joi.string().min(3).max(20).required(),
  phoneNumber: joi.string().min(3).max(20).required(),
  email: joi.string().email().min(3).max(20),
  isFavorite: joi.boolean(),
  contactType: joi.valid('work', 'home', 'personal').required(),
});
