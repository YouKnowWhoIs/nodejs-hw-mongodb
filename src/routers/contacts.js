import { Router } from 'express';
import {
  getContctsController,
  getContctsByIdController,
  createContactController,
  deleteContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import validateMongoId from '../middlewares/valiateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.use('/contacts/:contactId', validateMongoId);

router.get('/contacts', ctrlWrapper(getContctsController));

router.get('/contacts/:contactId', ctrlWrapper(getContctsByIdController));

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

export default router;
