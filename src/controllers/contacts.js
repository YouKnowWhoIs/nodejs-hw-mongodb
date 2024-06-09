import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  getAllContacts,
  getOneContacts,
  createContacts,
  deleteContacts,
  updatetContacts,
} from '../services/contacts.js';

export const getContctsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContctsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({
      data: 'ID not found',
    });
  }

  const contact = await getOneContacts(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContacts(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfuly create contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updatetContacts(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfuly update contact!',
    data: result,
  });
};

export const deleteContactsController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContacts(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
