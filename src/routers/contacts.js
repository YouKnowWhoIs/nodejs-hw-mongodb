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
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', validateMongoId);

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getContctsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContctsByIdController));

contactsRouter.get('/', ctrlWrapper(getContctsController));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

export default contactsRouter;
