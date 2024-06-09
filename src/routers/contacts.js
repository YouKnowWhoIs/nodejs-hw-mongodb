import { Router } from 'express';
import {
  getContctsController,
  getContctsByIdController,
  createContactController,
  deleteContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

export const contactsRouter = () => {
  router.get('/contacts', ctrlWrapper(getContctsController));

  router.get('/contacts/:contactId', ctrlWrapper(getContctsByIdController));

  router.post('/contacts', ctrlWrapper(createContactController));

  router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

  router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

  return router;
};
