import joi from 'joi';

export const updateContactSchema = joi.object({
  name: joi.string().min(3).max(20),
  phoneNumber: joi.string().min(3).max(20),
  email: joi.string().email().min(3).max(20),
  isFavourite: joi.boolean(),
  contactType: joi.valid('work', 'home', 'personal'),
});
